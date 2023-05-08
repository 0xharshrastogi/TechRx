from logging import getLogger

from scripts.utils import Singleton

logger = getLogger(__name__)


class HandleFallback(metaclass=Singleton):
    @classmethod
    def get_response(self, user_message: str) -> str:
        """
        Method to get_response for HandleFallback

        :param user_message: str
        :return: str
        """

        resp = ""
        try:
            logger.info("Method to get_response for HandleFallback")
            logger.info(f"user_message = {user_message}")

            resp = user_message
        except Exception as error:
            logger.exception(error)
        finally:
            return resp
