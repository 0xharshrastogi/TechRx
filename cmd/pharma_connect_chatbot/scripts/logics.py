# Built-in imports
from logging import getLogger

# Third-party imports
import pandas as pd
from nltk import word_tokenize, WordNetLemmatizer
from nltk.corpus import stopwords

# Rule-based imports
from scripts.odbc_connect import ConnectDB
from scripts.utils import Singleton

logger = getLogger(__name__)
conn = ConnectDB()
cur = conn.connection()


class Logics(metaclass=Singleton):
    @classmethod
    def get_words(cls, paragraph: str) -> list:
        """
        Method for get_lemmatized_words

        :param paragraph: str
        :return: list
        """
        words_list = []
        try:
            # tokenize paragraph
            tokens = word_tokenize(paragraph)

            # remove stopwords from tokenize paragraph
            stop_words = set(stopwords.words("english"))
            filtered_tokens = [
                token for token in tokens if token.lower() not in stop_words
            ]

            # Lamatize paragraph
            lemmatizer = WordNetLemmatizer()
            words_list = [lemmatizer.lemmatize(token) for token in filtered_tokens]

        except Exception as error:
            logger.exception(error)
        finally:
            return words_list

    @classmethod
    def get_fallback_response(cls, user_message: str) -> str:
        """
        Method to get_fallback_response for Logics

        :param user_message: str
        :return: str
        """

        resp = ""
        try:
            logger.info("Method to get_fallback_response for Logics")
            logger.info(f"user_message = {user_message}")

            resp = user_message
        except Exception as error:
            logger.exception(error)
        finally:
            return resp

    @classmethod
    def get_symptoms(cls, words: list) -> list:
        """
        Method to get_symptoms for Logics

        :param words: list
        :return: list
        """

        response = []
        try:
            logger.info("Method to get_symptoms for Logics")
            query = f"SELECT symptom FROM diseases_data WHERE symptom IN ({', '.join(['%s'] * len(words))})"
            symptoms = cur.execute(query, words)

            df_symptoms = pd.Dataframe(symptoms)
            logger.info(f"df_symptoms: {df_symptoms}")
            response = df_symptoms["symptom"].fillna("").tolist()

        except Exception as error:
            logger.exception(error)

        finally:
            return response

    @classmethod
    def get_disease_by_symptoms(cls, symptoms: list) -> list:
        """
        Method to get_symptoms for Logics

        :param symptoms: list
        :return: list
        """

        response = []
        try:
            logger.info("Method to get_symptoms for Logics")
            query = f"SELECT disease_name FROM diseases_data WHERE symptom IN ({', '.join(['%s'] * len(symptoms))})"
            diseases = cur.execute(query, symptoms)

            df_diseases = pd.Dataframe(diseases)
            logger.info(f"df_diseases: {df_diseases}")
            response = df_diseases["disease_name"].fillna("").tolist()

        except Exception as error:
            logger.exception(error)

        finally:
            return response
