# Built-in imports
from typing import Any, Dict, List, Text

# Third-party imports
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormAction

# Rule-based imports
from scripts.fallbackHandler import HandleFallback


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

        valid_symptoms = ["headache", "fever", "cough", "sore throat", "fatigue"]
        if value.lower() in valid_symptoms:
            return {"symptom": value}
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

        min_age = 18
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
        symptom = tracker.get_slot("symptom")
        age = tracker.get_slot("age")
        gender = tracker.get_slot("gender")
        location = tracker.get_slot("location")

        result = "\nsymptom={s}\nage={a}\ngender={g}\nlocation={l}".format(
            s=symptom,
            a=age,
            g=gender,
            l=location,
        )

        if result:
            message = f"I found the following healthcare providers that match your search criteria: {result}"
        else:
            message = "I'm sorry, I couldn't find any healthcare providers that match your search criteria."
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

        response = HandleFallback.get_response(user_message=user_message)
        dispatcher.utter_message(text=response)
        return []
