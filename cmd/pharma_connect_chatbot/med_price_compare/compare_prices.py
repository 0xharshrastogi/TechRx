import json
import time, re
from logging import getLogger
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.edge.options import Options
from selenium.webdriver.edge.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.microsoft import EdgeChromiumDriverManager

from .medicines_extraction import MedicineDataExtraction


class ComparePrices:
	def WebsiteElements(medicine_name):
		website_n_elements = {
			'https://www.1mg.com': {
				'text_input': '//*[@id="srchBarShwInfo"]',
				'med_data': "//*[contains(@class, 'style__horizontal-card___')]",
				'wrapper': "//*[contains(@class, 'DrugPage__wrapper___')]",
				'drug_name': "//*[contains(@class, 'DrugHeader__title-content___')]",
				'drug_manufacturer': "//*[contains(@class, 'DrugHeader__meta-value___')]",
				'price': "//*[contains(@class, 'DrugPriceBox__best-price___')]"
			},
			'https://www.netmeds.com': {
				'text_input': '//*[@id="search"]',
				'med_data': "//*[contains(@class, 'ais-InfiniteHits-item')]",
				'wrapper': "//*[contains(@class, 'product-top')]",
				'drug_name': "//*[contains(@class, 'black-txt')]",
				'drug_manufacturer': "//*[contains(@class, 'drug-manu')]",
				'price': '//*[contains(@class,"final-price")]'
			},
			'https://www.pharmeasy.in': {
				'text_input': '//*[@id="topBarInput"]',
				'med_data': "//*[contains(@class, 'ProductCard_medicineUnitContentWrapper__')]",
				'wrapper': "//*[contains(@class, 'LHS_container__')]",
				'drug_name': "//*[contains(@class, 'MedicineOverviewSection_medicineName__')]",
				'drug_manufacturer': "//*[contains(@class, 'MedicineOverviewSection_brandName__')]",
				'price': "//*[contains(@class, 'PriceInfo_gcdDiscountContainer__')]"
			},
			'https://www.practo.com': {
				'text_input': "//*[contains(@class,'u-p-l--40 text-steel')]",
				'med_data': "//*[contains(@class, 'wrapper-div u-text--left text-charcoal-grey u-p-t--10 u-p-b--10 u-p-l--15 u-row search-bar__results-result')]",
				'wrapper': "//*[contains(@class, 'u-content-wrapper')]",
				'drug_name': "//*[contains(@class, 'heading-alpha')]",
				'drug_manufacturer': "//*[contains(@class, 'u-m-r--10 u-text--no-decoration')]",
				'price': "//*[contains(@class, 'heading-beta-bold text-charcoal-grey')]"
			}
		}
		return website_n_elements


	@staticmethod


	def launchBrowser():
		print('in launchBrowser')
		driver = webdriver.Edge(EdgeChromiumDriverManager().install())
		driver.get('https://www.1mg.com')
		driver.maximize_window()
		return driver

	@staticmethod
	def get_medicine_data(medicine_name):
		logger = getLogger(__name__)
		driver = ComparePrices.launchBrowser()
		medicine_data_list = []
		website_n_elements = ComparePrices.WebsiteElements(medicine_name)
		print('here', website_n_elements)
		for website in website_n_elements.keys():
			print('here1', website)
			if website.split('.')[1] == '1mg':
				try:
					medicine_details = MedicineDataExtraction.Scrape1mg(driver, website, medicine_name,
																															website_n_elements[website]['text_input'],
																															website_n_elements[website]['med_data'],
																															website_n_elements[website]['wrapper'],
																															website_n_elements[website]['drug_name'],
																															website_n_elements[website]['drug_manufacturer'],
																															website_n_elements[website]['price'])
					medicine_data_list.append(medicine_details)
				except:
					pass
			elif website.split('.')[1] == 'netmeds':
				try:
					medicine_details = MedicineDataExtraction.ScrapeNetmeds(driver, website, medicine_name,
																															website_n_elements[website]['text_input'],
																															website_n_elements[website]['med_data'],
																															website_n_elements[website]['wrapper'],
																															website_n_elements[website]['drug_name'],
																															website_n_elements[website]['drug_manufacturer'],
																															website_n_elements[website]['price'])
					medicine_data_list.append(medicine_details)
				except:
					pass
			elif website.split('.')[1] == 'pharmeasy':
				try:
					medicine_details = MedicineDataExtraction.ScrapePharmeasy(driver, website, medicine_name,
																															website_n_elements[website]['text_input'],
																															website_n_elements[website]['med_data'],
																															website_n_elements[website]['wrapper'],
																															website_n_elements[website]['drug_name'],
																															website_n_elements[website]['drug_manufacturer'],
																															website_n_elements[website]['price'])
					medicine_data_list.append(medicine_details)
				except:
					pass
			elif website.split('.')[1] == 'practo':
				try:
					medicine_details = MedicineDataExtraction.ScrapePracto(driver, website, medicine_name,
																															 website_n_elements[website]['text_input'],
																															 website_n_elements[website]['med_data'],
																															 website_n_elements[website]['wrapper'],
																															 website_n_elements[website]['drug_name'],
																															 website_n_elements[website]['drug_manufacturer'],
																															 website_n_elements[website]['price'])
					medicine_data_list.append(medicine_details)
				except:
					pass
		print(medicine_data_list)
		medicine_data = {medicine_name: {}}
		for item in medicine_data_list:
			medicine_data.setdefault(medicine_name, {}).update(item)
		return medicine_data

	def compare_prices(medicine_name):
		medicine_data = ComparePrices.get_medicine_data(medicine_name)
		print(medicine_data)
		medicine_prices = {medicine_name: {}}
		for website, details in medicine_data[medicine_name].items():
				price = re.sub(r'\d+% off|₹|Best Price\*?|\n', '', details['Price'], flags=re.I)
				medicine_prices[medicine_name][website] = float(price)
				medicine_data[medicine_name][website]['Price'] = price
		try:
			top_results = sorted(medicine_prices[medicine_name].items(), key=lambda x: x[1])[:3]
		except:
			top_results = sorted(medicine_prices[medicine_name].items(), key=lambda x: x[1])
		result = {}
		for website, price in top_results:
			if website in medicine_data[medicine_name]:
				result[website] = medicine_data[medicine_name][website]

		print(result)

		return result
