import cv2
import easyocr
import itertools
from typing import Any, Dict, List, Text


class MedicineListExtractor:
	@staticmethod
	def extract_text_from_image(image_file: str) -> List[List[List[str]]]:

		reader = easyocr.Reader(['en'])
		image = cv2.imread(image_file)
		text = []
		text.append(reader.readtext(image))
		return text

	@staticmethod
	def get_text_from_image(text: List[List[List[str]]]) -> List[str]:
		flattened_text = list(itertools.chain.from_iterable(
			itertools.chain.from_iterable(text))
		)
		result = [word for word in flattened_text if isinstance(word,str)
							and
							any(item in word for item in ['Tab', 'Cap', 'Cream', 'Liquid'])]

		return result

	@staticmethod
	def get_medicines_from_image(list_of_medicines):
		print('abc',list_of_medicines)
		tablets, capsules, creams, syrups = [], [], [], []
		for medicine in list_of_medicines:
			if 'Tab' in medicine:
				tablets.append(medicine.strip())
			elif 'Cap' in medicine:
				capsules.append(medicine.strip())
			elif 'Cream' in medicine:
				creams.append(medicine.strip())
			elif 'Liquid' in medicine:
				syrups.append(medicine.strip())
		return tablets, capsules, creams, syrups

	@staticmethod
	def final_text(filename):
		print('pfilename', filename)

		data = MedicineListExtractor.extract_text_from_image( r'../TechRxProject/static/' + str(filename))
		text = MedicineListExtractor.get_text_from_image(data)
		tablets, capsules, creams, syrups = MedicineListExtractor.get_medicines_from_image(text)
		medicines = []
		if tablets:
			for i in tablets:
				medicines.append(i)
		if capsules:
			for i in capsules:
				medicines.append(i)
		if creams:
			for i in creams:
				medicines.append(i)
		if syrups:
			for i in syrups:
				medicines.append(i)
		return medicines

