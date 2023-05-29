# Built-in imports
import asyncio
import glob
import inspect
import json
import os
from asyncio import Queue
from logging import getLogger
from typing import Text, Callable, Awaitable, Any, Optional, Dict, Union

# Third-party imports
from rasa.core.agent import Agent
from rasa.core.channels import InputChannel, UserMessage
from rasa.core.channels.rest import QueueOutputChannel
from rasa.utils.endpoints import EndpointConfig
from sanic import Blueprint, response
from sanic.request import Request
from sanic.response import HTTPResponse

# Setup Logger
logger = getLogger(__name__)
agent_models = None
current_model = None
action_endpoint = EndpointConfig(url="http://localhost:5055/webhook")


class RestInputBot(InputChannel):
    """A bot http input channel.

    This implementation is the basis for empty bot implementation of empty chat
    frontend. You can botize this to send messages to Rasa Core and
    retrieve responses from the agent."""

    @classmethod
    def name(cls) -> Text:
        """
        Method to add prefix or name for bot api

        :return: Text
        """
        return "bot"

    @staticmethod
    async def on_message_wrapper(
            on_new_message: Callable[[UserMessage], Awaitable[Any]],
            text: Text,
            queue: Queue,
            sender_id: Text,
            input_channel: Text,
            metadata: Optional[Dict[Text, Any]],
    ) -> None:
        """
        Method for on_message_wrapper

        :param on_new_message: Callable[[UserMessage], Awaitable[Any]],
        :param text: Text,
        :param queue: Queue,
        :param sender_id: Text,
        :param input_channel: Text,
        :param metadata: Optional[Dict[Text, Any]],
        :return: None
        """

        # Initiate QueueOutputChannel
        collector = QueueOutputChannel(queue)
        message = UserMessage(
            text,
            collector,
            sender_id,
            input_channel=input_channel,
            metadata=metadata,
        )

        await on_new_message(message)
        await queue.put("DONE")  # pytype: disable=bad-return-type

    async def _extract_sender(self, req: Request) -> Optional[Text]:
        """
        Method for _extract_sender

        :param req: Request
        :return: Optional[Text]
        """
        return req.json.get("sender", None)

    # noinspection PyMethodMayBeStatic
    def _extract_message(self, req: Request) -> Optional[Text]:
        """
        Method for _extract_message

        :param req: Request
        :return: Optional[Text]
        """
        return req.json.get("message", None)

    def _extract_input_channel(self, req: Request) -> Text:
        """
        Method for _extract_input_channel

        :param req: Request
        :return: Text
        """
        return req.json.get("input_channel") or self.name()

    def stream_response(
            self,
            on_new_message: Callable[[UserMessage], Awaitable[None]],
            text: Text,
            sender_id: Text,
            input_channel: Text,
            metadata: Optional[Dict[Text, Any]],
    ) -> Callable[[Any], Awaitable[None]]:
        """
        Method for stream_response

        :param on_new_message: Callable[[UserMessage], Awaitable[None]],
        :param text: Text,
        :param sender_id: Text,
        :param input_channel: Text,
        :param metadata: Optional[Dict[Text, Any]],
        :return: Callable[[Any], Awaitable[None]]
        """

        async def stream(resp: Any) -> None:
            """
            Method for stream

            :param resp: Any
            :return: None
            """
            q = Queue()
            task = asyncio.ensure_future(
                self.on_message_wrapper(
                    on_new_message,
                    text,
                    q,
                    sender_id,
                    input_channel,
                    metadata,
                )
            )

            while True:
                result = await q.get()
                if result == "DONE":
                    break
                else:
                    await resp.write(json.dumps(result) + "\n")
            await task

        return stream  # pytype: disable=bad-return-type

    def get_latest_model(self) -> Union[str, None]:
        # Get a list of all files in the folder
        file_list = glob.glob(os.path.join("models", "*"))

        # Sort the file list by modification time in descending order
        file_list.sort(key=os.path.getmtime, reverse=True)

        # Return the first file in the sorted list (latest file)
        if file_list:
            return file_list[0]
        else:
            return None

    def blueprint(
            self,
            on_new_message: Callable[
                [UserMessage],
                Awaitable[None],
            ],
    ) -> "Blueprint":
        """
        Method for blueprint

        :param on_new_message: Callable[
            [UserMessage],
            Awaitable[None],
        ]
        :return: "Blueprint"
        """

        bot_webhook = Blueprint(
            "bot_webhook_{}".format(type(self).__name__),
            inspect.getmodule(self).__name__,
        )

        # noinspection PyUnusedLocal
        @bot_webhook.route("/", methods=["GET", "OPTIONS"])
        async def health(request: Request) -> HTTPResponse:
            """
            API for health [BOT API]

            methods: ["GET", "OPTIONS"]

            :param request: Request
            :return: HTTPResponse
            """
            return response.json({"status": "ok"})

        @bot_webhook.route("/response", methods=["POST", "OPTIONS"])
        async def bot_response(request: Request) -> HTTPResponse:
            """
            API for response [BOT API]

            methods: ["POST", "OPTIONS"]

            :param request: Request
            :return: HTTPResponse
            """
            global agent_models
            global current_model

            status_code = 200
            try:
                if request.method == "POST":
                    if not agent_models:
                        model = self.get_latest_model()

                        if model != current_model:
                            current_model = model

                            agent_models = Agent.load(
                                model_path=current_model,
                                action_endpoint=action_endpoint,
                            )

                    data = request.json

                    user_message = data["user_message"]
                    user_session_id = data["user_session_id"]

                    resp_data = await agent_models.handle_text(
                        text_message=user_message,
                        sender_id=user_session_id,
                    )
                else:
                    raise Exception

            except Exception as error:
                logger.exception(error)
                resp_data = "something went wrong"
                status_code = 500

            result = dict(result=resp_data)
            if type(result["result"]) == list:
                result["result"] = result["result"][0]
            resp = response.json(result, content_type="application/json")
            resp.status = status_code

            return resp

        return bot_webhook
