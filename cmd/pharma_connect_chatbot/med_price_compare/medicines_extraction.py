import json
import time, re
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
	def Scrape1mg(driver, url, medicine, element_search, element_result, element_wrapper, element_name,
								element_manufacturer, element_price):
		print('in Scrape1mg')

		# driver.get(url)
		WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
		text_box = driver.find_element(By.XPATH, element_search)

		text_box.send_keys(medicine, Keys.ENTER)
		elements = driver.find_elements(By.XPATH, element_result)
		elements_text = [element.text for element in elements]
		# logger.info(f"elements text: {elements_text}")
		medicine_details = {}

		for element, text in zip(elements, elements_text):
			flag = False
			print(element)
			drug_name, drug_manufacturer, price = '', '', ''

			for med in medicine.split():
				print(text, med)
				if med in text or text in med:
					flag = True

				if flag:
					print(f"{element.text}")

					element.find_element(By.TAG_NAME, 'a').click()
					WebDriverWait(driver, 30).until(EC.number_of_windows_to_be(2))
					driver.switch_to.window(driver.window_handles[-1])
					time.sleep(1)
					wrapper = driver.find_element(By.XPATH, element_wrapper)
					drug_name = wrapper.find_element(By.XPATH, element_name)
					print(drug_name.text)
					drug_manufacturer = (wrapper.find_elements(By.XPATH, element_manufacturer))[0]
					print(drug_manufacturer.text)
					price = wrapper.find_element(By.XPATH, element_price)

					medicine_details[url.split('.')[1]] = {}
					medicine_details[url.split('.')[1]]['Name'] = drug_name.text.strip()
					medicine_details[url.split('.')[1]]['Manufacturer'] = drug_manufacturer.text.strip()
					medicine_details[url.split('.')[1]]['Price'] = price.text.strip()
					medicine_details[url.split('.')[1]]['link'] = driver.current_url
					print(f"Medicine_details: {medicine_details}")

					return medicine_details

	@staticmethod
	def ScrapeNetmeds(driver, url, medicine, element_search, element_result, element_wrapper, element_name,
										element_manufacturer, element_price):
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
			drug_name, drug_manufacturer, price = '', '', ''
			for med in medicine.split():
				if (med in text or text in med):
					flag = True
			if flag == True:
				element.find_element(By.TAG_NAME, 'a').click()
				wrapper = driver.find_element(By.XPATH, element_wrapper)
				drug_name = wrapper.find_element(By.XPATH, element_name)
				print(drug_name.text)
				drug_manufacturer = wrapper.find_elements(By.XPATH, element_manufacturer)
				final_drug_manufacturer = ''
				for manufacturer in drug_manufacturer:
					print(manufacturer.text)
					if 'Mkt:' in manufacturer.text:
						final_drug_manufacturer = manufacturer.text.strip()
				price = wrapper.find_element(By.XPATH, element_price)

				medicine_details[url.split('.')[1]] = {}
				medicine_details[url.split('.')[1]]['Name'] = drug_name.text.strip()
				medicine_details[url.split('.')[1]]['Manufacturer'] = final_drug_manufacturer
				medicine_details[url.split('.')[1]]['Price'] = price.text.strip()
				medicine_details[url.split('.')[1]]['link'] = driver.current_url
				print(f"Medicine_details: {medicine_details}")

				return medicine_details

	@staticmethod
	def ScrapePharmeasy(driver, url, medicine, element_search, element_result, element_wrapper, element_name,
											element_manufacturer, element_price):
		print('in ScrapePharmeasy')

		driver.get(url)

		WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
		driver.find_element(By.XPATH,
												'/html/body/div[1]/main/div[3]/div[1]/div/div[1]/div/div[2]/div/div[1]/span').click()
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
				element.click()
				wrapper = driver.find_element(By.XPATH, element_wrapper)
				drug_name = wrapper.find_element(By.XPATH, element_name)
				print(drug_name.text)
				drug_manufacturer = wrapper.find_element(By.XPATH, element_manufacturer)

				price = wrapper.find_element(By.XPATH, element_price)

				medicine_details[url.split('.')[1]] = {}
				medicine_details[url.split('.')[1]]['Name'] = drug_name.text.strip()
				medicine_details[url.split('.')[1]]['Manufacturer'] = drug_manufacturer.text.strip()
				medicine_details[url.split('.')[1]]['Price'] = price.text.strip()
				medicine_details[url.split('.')[1]]['link'] = driver.current_url
				print(f"Medicine_details: {medicine_details}")

				return medicine_details

	@staticmethod
	def ScrapePracto(driver, url, medicine, element_search, element_result, element_wrapper, element_name,
									 element_manufacturer, element_price):
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
		WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.XPATH, element_result)))
		elements = driver.find_elements(By.XPATH, element_result)
		elements_text = [i.text for i in elements]
		print(elements, elements_text)
		medicine_details = {}
		for element, text in zip(elements, elements_text):
			print('in for')
			text = (re.sub(r'[.,-]', ' ', str(text))).lower()
			for med in medicine.split():
				if (med in text) or (text in med):
					if not 'unavailable' in text:
						print('check', text, med)
						try:
							wrapper = driver.find_element(By.XPATH, element_wrapper)
							wrapper.find_element(By.CLASS_NAME, "u-m-t--5")
							print('found', element, element.text)
							element.click()
							time.sleep(1)
							wrapper = driver.find_element(By.XPATH, element_wrapper)

							drug_name = wrapper.find_element(By.XPATH, element_name)
							print(drug_name.text)
							drug_manufacturer = (wrapper.find_elements(By.XPATH, element_manufacturer))[0]

							price = wrapper.find_element(By.XPATH, element_price)

							medicine_details[url.split('.')[1]] = {}
							medicine_details[url.split('.')[1]]['Name'] = drug_name.text.strip()
							medicine_details[url.split('.')[1]]['Manufacturer'] = drug_manufacturer.text.strip()
							medicine_details[url.split('.')[1]]['Price'] = price.text.strip()
							medicine_details[url.split('.')[1]]['link'] = driver.current_url
							print(f"Medicine_details: {medicine_details}")

							return medicine_details
						except Exception as e:
							print(e)
							pass
