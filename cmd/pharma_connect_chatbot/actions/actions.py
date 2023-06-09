# Built-in imports
import ast
from typing import Any, Dict, List, Text

# Third-party imports
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormAction

# Rule-based imports
from scripts.logics import Logics


class ValidateMedicalForm(FormAction):
    def name(self) -> Text:
        """
        Method for name

        :return: Text
        """
        return "validate_medical_form"

    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """
        Method for required_slots

        :param tracker: Tracker
        :return: List[Text]
        """
        return ["symptom", "age", "gender", "location"]

    def slot_mappings(self) -> Dict[Text, Any]:
        """
        Method for slot_mappings

        :return: Dict[Text, Any]
        """
        return {
            "symptom": self.from_text(),
            "age": self.from_text(),
            "gender": self.from_text(),
            "location": self.from_text(),
        }

    def validate_symptom(
            self,
            value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """
        Method for validate_symptom

        :param value: Any
        :param dispatcher: CollectingDispatcher
        :param tracker: Tracker
        :param domain: Dict[Text, Any]
        :return: Dict[Text, Any]
        """
        # Perform your slot validation logic here
        # Return a dictionary with a 'isValid' key and a boolean value

        words = Logics.get_words(value)
        symptoms = Logics.get_symptoms(words=words)
        if symptoms:
            return {"symptom": str(symptoms)}
        else:
            dispatcher.utter_template(template="utter_ask_symptom", tracker=tracker)
            return {"symptom": None}

    def validate_age(
            self,
            value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """
        Method for validate_age

        :param  value: Any
        :param  dispatcher: CollectingDispatcher
        :param  tracker: Tracker
        :param  domain: Dict[Text, Any]
        :return: Dict[Text, Any]
        """
        # Perform your slot validation logic here
        # Return a dictionary with a 'isValid' key and a boolean value

        min_age = 0
        max_age = 100

        if isinstance(value, str) and value.isdigit():
            age = int(value)
            if min_age <= age <= max_age:
                return {"age": value}
        dispatcher.utter_template(template="utter_ask_age", tracker=tracker)
        return {"age": None}

    def validate_gender(
            self,
            value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """
        Method for validate_gender

        :param value: Any
        :param dispatcher: CollectingDispatcher
        :param tracker: Tracker
        :param domain: Dict[Text, Any]
        :return:
        """
        # Perform your slot validation logic here
        # Return a dictionary with a 'isValid' key and a boolean value

        valid_genders = ["male", "female", "other"]

        if isinstance(value, str) and value.lower() in valid_genders:
            return {"gender": value}
        else:
            dispatcher.utter_template(template="utter_ask_gender", tracker=tracker)
            return {"gender": None}

    def validate_location(
            self,
            value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """
        Method for validate_location

        :param value: Any,
        :param dispatcher: CollectingDispatcher,
        :param tracker: Tracker,
        :param domain: Dict[Text, Any],
        :return:
        """
        # Perform your slot validation logic here
        # Return a dictionary with a 'isValid' key and a boolean value

        valid_locations = ["new york", "london", "paris"]

        if isinstance(value, str) and value.lower() in valid_locations:
            return {"location": value}
        else:
            dispatcher.utter_template(template="utter_ask_location", tracker=tracker)
            return {"location": None}

    def submit(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict]:
        """
        Method for submit

        :param dispatcher: CollectingDispatcher,
        :param tracker: Tracker,
        :param domain: Dict[Text, Any],
        :return:
        """
        symptom = ast.literal_eval(tracker.get_slot("symptom")) or []
        age = tracker.get_slot("age")
        gender = tracker.get_slot("gender")
        location = tracker.get_slot("location")

        message = f"""
            symptom: {symptom}
            age: {age}
            gender: {gender}
            location: {location}
        """
        diseases = Logics.get_disease_by_symptoms(symptoms=symptom)
        if diseases:
            message += f"\nI found the following health issue that match your symptoms:"
            for i, d in enumerate(diseases):
                message += f"\n {i}: {d}"
        else:
            message += (
                "\nI'm sorry, I couldn't find any health issue that match your symptoms."
            )
        dispatcher.utter_message(message)

        # Set all slots to None
        slots = []
        for slot_name in tracker.slots.keys():
            slots.append(SlotSet(slot_name, None))

        return slots


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

        response = Logics.get_fallback_response(user_message=user_message)
        dispatcher.utter_message(text=response)
        return []


class ValidateDoctorForm(Action):
	"""
		Method for ActionFindDoctor

		:param Action:
		:return:
	"""
	def name(self) -> Text:
		"""
			Method for name

			:return: Text
		"""
		return "validate_doctor_form"

	def run(
		self,
		dispatcher: CollectingDispatcher,
		tracker: Tracker,
		domain: Dict[Text, Any]
		) -> List[Dict[Text, Any]]:
		"""
			Method for run

			:param dispatcher: CollectingDispatcher,
			:param tracker: Tracker,
			:param domain: Dict[Text, Any],

			:return: List[Dict[Text, Any]]
			"""
		state = tracker.current_state()
		user_message = state["latest_message"]["text"]
		doctors = Logics.get_doctors(user_message=user_message)
