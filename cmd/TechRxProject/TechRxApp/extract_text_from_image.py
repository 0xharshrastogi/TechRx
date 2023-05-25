import cv2
import numpy as np
import easyocr

def extract_text(image_file):
	image = cv2.imread(image_file)
	grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	thresholded_image = cv2.threshold(grayscale_image, 127, 255, cv2.THRESH_BINARY)[1]
	contours = cv2.findContours(thresholded_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	text = []
	for contour in contours:
		reader = easyocr.Reader(['en'])
		text.append(reader.readtext(image))
	result = ''
	for i in text:
		for j in i:
			for k in j:
				if type(k) is str and k[:3] == 'Fer':
					print(k)
					result += k
			result += ' '
			result += ' $ '
	print(result)
	return result


if __name__ == '__main__':
	text = extract_text('prescription.jpg')
	print(text)
