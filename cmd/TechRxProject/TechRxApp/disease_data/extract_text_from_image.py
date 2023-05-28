import cv2
import numpy as np
import easyocr
reader = easyocr.Reader(['en'])


def extract_text(image_file):
	image = cv2.imread(image_file)
	grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	text = []
	text.append(reader.readtext(image))

	print(len(text))
	return text


def get_text(text):
	result = ['',]
	for i in text:
		for j in i:
			for k in j:
				print()
				if type(k) is str and k[:3] in ['Tab', 'Cap', 'Cream', 'Liquid']:
					# (k[:3] == 'Tab' or k[:3] == 'Tab')\
					# 										 or ('Cap' in result[-1] or 'Tab' in result[-1])\
					# 										 or ('Cream' in result[-1] or 'Tab' in result[-1])):
					print(result)

					if k in result:
						pass
					else:
						result.append(' ' + k)
	return result


def get_medicines(list_of_medicines):
	print('abc',list_of_medicines)
	tablets, capcules, creams, liquids = [], [], [], []
	for i in list_of_medicines:
		if 'Tab' in i:
			tablets.append(i.strip())
		elif 'Cap' in i:
			capcules.append(i.strip())
		elif 'Cream' in i:
			creams.append(i.strip())
		elif 'Liquid' in i:
			liquids.append(i.strip())
	return tablets, capcules, creams, liquids


if __name__ == '__main__':
	data = extract_text('prescription.png')
	text = get_text(data)
	tablets, capcules, creams, liquids = get_medicines(text)
	print(tablets, capcules, creams, liquids)

