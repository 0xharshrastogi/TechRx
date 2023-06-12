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
			query = f"SELECT SUBSTRING(symptoms, CHARINDEX('{words[0]}', symptoms), LEN({len(words[0])} + 50000)) FROM diseases_data WHERE symptoms LIKE '%{words[0]}%';"
			symptoms = cur.execute(query)

			df_symptoms = pd.DataFrame(symptoms, columns=["symptom"])
			logger.info(f"df_symptoms: {df_symptoms}")
			response = list(set([symptom[0] for symptom in df_symptoms["symptom"].fillna("").tolist()]))

		except Exception as error:
			logger.exception(error)

		finally:
			return response

	@classmethod
	def get_disease_by_symptoms(cls, symptoms: list) -> list:
		"""
		Method to get_disease_by_symptoms

		:param symptoms: list
		:return: list
		"""

		response = []
		try:
			logger.info(f"symptoms[0]: {type(symptoms[0]), symptoms[0]}")
			query = "SELECT disease_name FROM diseases_data WHERE symptoms "
			query += " OR ".join([f"speciality LIKE '%{symptom}%'" for symptom in symptoms])
			diseases = cur.execute(query)

			df_diseases = pd.DataFrame(diseases, columns=["disease_name"])
			logger.info(f"df_diseases: {df_diseases}")
			response = list(set(df_diseases["disease_name"].fillna("").tolist()))

		except Exception as error:
			logger.exception(error)

		finally:
			return response

	@classmethod
	def get_doctors(cls, diseases: list) -> list:
		"""
		Method to get_doctors
		:param words: list
		:return: list
		"""
		response = []
		try:
			if type(diseases) is not list:
				diseases = diseases.split()

			logger.info("Method to get_doctors")
			logger.info(f"diseases: {diseases}")

			# query = f"SELECT name FROM doctors WHERE speciality ILIKE ANY(ARRAY{diseases})"
			query = f"Select name, speciality FROM doctors WHERE "
			if diseases and len(diseases) == 1:
				query += f"speciality LIKE '%{diseases[0]}%'"
			elif diseases and len(diseases) > 1:
				query += "speciality LIKE "
				for disease in diseases:
					query += f"'%{disease}%' OR speciality LIKE "

				query = query[:-20]

			logger.info(f"query: {query}")
			cur.execute(query)
			doctors = cur.fetchall()

			response = [{"name": row.name, "speciality": row.speciality} for row in doctors]
			logger.info(f"response: {response}")

		except Exception as error:
			logger.exception(error)
		finally:
			return response
