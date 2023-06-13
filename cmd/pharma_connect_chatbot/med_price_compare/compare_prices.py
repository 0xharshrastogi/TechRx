import json
import time
from selenium import webdriver
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from .medicines_extraction import MedicineDataExtraction
from logging import getLogger


class ComparePrices:
	def WebsiteElements(medicine_name):
		website_n_elements = {'https://www.1mg.com': {'text_input': '//*[@id="srchBarShwInfo"]',
																									'med_data': "//*[contains(@class, 'style__horizontal-card___')]",
																									'price': "//*[contains(@class, 'style__price-tag___')]"},
													'https://www.netmeds.com': {'text_input': '//*[@id="search"]',
																											'med_data': "//*[contains(@class, 'ais-InfiniteHits-item')]",
																											'price': '//*[@id="final_price"]'},
													'https://www.pharmeasy.in': {'text_input': '//*[@id="topBarInput"]',
																											 'med_data': "//*[contains(@class, 'ProductCard_medicineUnitContentWrapper__')]",
																											 'price': '//*[@id="__next"]/main/div/div/div/div[1]/div[1]/div/div/a/div[2]/div/div[4]/div/div[1]/div[1]/div/div/div[2]/div/span[1]'},
													'https://www.practo.com': {'text_input': "//*[contains(@class,'u-p-l--40 text-steel')]",
																										 'med_data': 'search-bar__results',
																										 'price': 'u-text--bold'}
													}
		return website_n_elements
	@staticmethod
	def launchBrowser():
		print('in launchBrowser')
		edge_options = Options()
		# edge_options.add_argument('--headless')
		time.sleep(1)
		driver = webdriver.Edge(service=Service(EdgeChromiumDriverManager().install()))
		driver.get('https://www.1mg.com')
		driver.maximize_window()
		return driver

	def compare_prices_func(medicine_name):
		# logger = getLogger(__name__)
		driver = ComparePrices.launchBrowser()
		compared_prices_list = []
		website_n_elements = ComparePrices.WebsiteElements(medicine_name)
		print('here', website_n_elements)
		for website in website_n_elements.keys():
			print('here1', website)
			if website.split('.')[1] == '1mg':
				medicine_details = MedicineDataExtraction.Scrape1mg(driver, website, medicine_name,website_n_elements[website]['text_input'],
																	 website_n_elements[website]['med_data'], website_n_elements[website]['price'])
				compared_prices_list.append(medicine_details)
			# elif website.split('.')[1] == 'netmeds':
			# 	medicine_details = MedicineDataExtraction.ScrapeNetmeds(driver, website, medicine_name,website_n_elements[website]['text_input'],
			# 														 website_n_elements[website]['med_data'], website_n_elements[website]['price'])
			# 	compared_prices_list.append(medicine_details)
			# elif website.split('.')[1] == 'pharmeasy':
			# 	medicine_details = MedicineDataExtraction.ScrapePharmeasy(driver, website, medicine_name,website_n_elements[website]['text_input'],
			# 														 website_n_elements[website]['med_data'], website_n_elements[website]['price'])
			# 	compared_prices_list.append(medicine_details)
			# elif website.split('.')[1] == 'practo':
			# 	medicine_details = MedicineDataExtraction.ScrapePracto(driver, website, medicine_name, website_n_elements[website]['text_input'],
			# 																	website_n_elements[website]['med_data'], website_n_elements[website]['price'])
			# 	compared_prices_list.append(medicine_details)
		print(f'compared_prices_list: {compared_prices_list}')
		compared_prices = {medicine_name: compared_prices_list}
		print(f"compared_prices: {compared_prices}")
		return compared_prices

