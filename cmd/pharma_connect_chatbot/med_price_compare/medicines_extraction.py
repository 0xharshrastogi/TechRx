import json
import time
from selenium import webdriver
from logging import getLogger
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

logger = getLogger(__name__)

class MedicineDataExtraction:


	@staticmethod
	def Scrape1mg(driver, url, medicine, element_search, element_result, element_price):
		print('in Scrape1mg')

		# driver.get(url)
		WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
		text_box = driver.find_element(By.XPATH, element_search)

		text_box.send_keys(medicine, Keys.ENTER)
		elements = driver.find_elements(By.XPATH, element_result)
		elements_text = [i.text for i in elements]
		logger.info(f"elements text: {elements_text}")
		medicine_details = {}

		for element, text in zip(elements, elements_text):
			flag = False
			for med in medicine.split():
				if (med in text or text in med) and (medicine.split())[0] == ((text.split('\n'))[0]).split()[0]:
					flag = True
			if flag == True:
				logger.info("Medicine Found")
				price = element.find_element(By.XPATH, element_price)
				medicine_details[url.split('.')[1]]['Name'] = price.text.strip()
				medicine_details[url.split('.')[1]]['Price'] = price.text.strip()
				logger.info(f"Medicine_details: {medicine_details}")

		return medicine_details

	@staticmethod
	def ScrapeNetmeds(driver, url, medicine, element_search, element_result, element_price):
		print('in ScrapeNetmeds')

		driver.get(url)
		WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
		text_box = driver.find_element(By.XPATH, element_search)

		time.sleep(1)
		try:
			text_box.click()
		except:
			pass

		text_box.send_keys(medicine, Keys.ENTER)
		elements = driver.find_elements(By.XPATH, element_result)
		elements_text = [i.text for i in elements]
		medicine_details = {}
		flag = False
		for element, text in zip(elements, elements_text):
			for med in medicine.split():
				if (med in text or text in med):
					flag = True
			if flag == True:
				logger.info("Medicine found")
				price = element.find_element(By.XPATH, element_price)
				medicine_details[url.split('.')[1]]['Name'] = price.text.strip()
				medicine_details[url.split('.')[1]]['Price'] = price.text.strip()

		return medicine_details

	@staticmethod
	def ScrapePharmeasy(driver, url, medicine, element_search, element_result, element_price):
		print('in ScrapePharmeasy')

		driver.get(url)

		WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
		driver.find_element(By.XPATH, '/html/body/div[1]/main/div[3]/div[1]/div/div[1]/div/div[2]/div/div[1]/span').click()
		text_box = driver.find_element(By.XPATH, element_search)

		time.sleep(1)
		try:
			text_box.click()
		except:
			pass

		text_box.send_keys(medicine, Keys.ENTER)
		elements = driver.find_elements(By.XPATH, element_result)
		elements_text = [i.text for i in elements]
		medicine_details = {}
		flag = False
		for element, text in zip(elements, elements_text):
			for med in medicine.split():
				if (med in text or text in med):
					flag = True
			if flag == True:
				logger.info("Medicine Found")
				price = element.find_element(By.XPATH, element_price)
				medicine_details[url.split('.')[1]]['Name'] = price.text.strip()
				medicine_details[url.split('.')[1]]['Price'] = price.text.strip()

		return medicine_details

	@staticmethod
	def ScrapePracto(driver, url, medicine, element_search, element_result, element_price):
		print('in ScrapePracto')

		driver.get(url)
		WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
		driver.find_element(By.LINK_TEXT, 'Medicines').click()
		text_box = driver.find_element(By.XPATH, element_search)

		time.sleep(1)
		try:
			text_box.click()
		except:
			pass

		text_box.send_keys(medicine, Keys.ENTER)
		elements = driver.find_elements(By.CLASS_NAME, element_result)
		elements_text = [i.text for i in elements]

		medicine_details = {}
		flag = False
		for element, text in zip(elements, elements_text):
			text_1 = ''
			for word in text:
				if word in ['.' ',', '-']:
					text_1 += ' '
				else:
					text_1 += word
			for med in medicine.split():
				if (med in text_1 or text_1 in med):
					flag = True
			if flag == True:
				logger.info("Medicine Found")
				price = element.find_element(By.CLASS_NAME, element_price)
				medicine_details[url.split('.')[1]]['Name'] = price.text.strip()
				medicine_details[url.split('.')[1]]['Price'] = price.text.strip()

		return medicine_details

