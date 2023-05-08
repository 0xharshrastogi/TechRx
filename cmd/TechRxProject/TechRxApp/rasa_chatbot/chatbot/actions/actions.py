# Built-in imports
from typing import Any, Text, Dict, List

# Third-party imports
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

from scripts.fallbackHandler import HandleFallback


class ActionFallback(Action):
    """
    Method for ActionFallback

    :param Action:
    :return:
    """

    def name(self) -> Text:
        """
        Method for name

        :return: Text
        """
        return "action_fallback"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        """
        Method for run

        :param dispatcher: CollectingDispatcher,
        :param tracker: Tracker,
        :param domain: Dict[Text, Any],

        :return: List[Dict[Text, Any]]
        """
        # get Tracker State
        # extract user_message from latest_message
        state = tracker.current_state()
        user_message = state["latest_message"]["text"]

        response = HandleFallback.get_response(user_message=user_message)
        dispatcher.utter_message(text=response)
        return []
