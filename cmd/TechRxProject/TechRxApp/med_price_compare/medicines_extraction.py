import json
import time
from selenium import webdriver
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# from create_txt_with_encoding import createFile

def launchBrowser():
    print('in launchBrowser')
    driver = webdriver.Edge(service=Service(EdgeChromiumDriverManager().install()))
    driver.get('https://www.1mg.com')
    driver.maximize_window()
    return driver

def ScrapeMed(driver, url, medicine, element_search, element_result, element_price):
    print('in ScrapeMed')
    driver.get(url)
    WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
    if url.split('.')[1] == 'pharmeasy':
        driver.find_element(By.XPATH, '/html/body/div[1]/main/div[3]/div[1]/div/div[1]/div/div[2]/div/div[1]/span').click()
    elif url.split('.')[1] == 'practo':
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[1]/div[2]/div/div[2]/div[3]/a/div[1]').click()
    else:
        pass
    text_box = driver.find_element(By.XPATH, element_search)
    time.sleep(1)
    try: text_box.click()
    except: pass

    text_box.send_keys(medicine, Keys.ENTER)

    elements = driver.find_elements(By.XPATH, element_result)
    elements_text=[i.text for i in elements]
    medicine_details = {}
    flag = False
    for i, j in zip(elements, elements_text):
        print(j)
        for k in medicine.split():
            if k in j or j in k:
                print('yes')
                flag = True
        if flag == True:
            print('med found')
            price = i.find_element(By.XPATH, element_price)

            print(price.text.strip())
            medicine_details[url.split('.')[1]] = price.text.strip()
    return medicine_details
    # for i in results:
    #     # zip of web element and text
    #     if medicine in i.text.split('\n')[0] or i.text.split('\n')[0] in medicine:
    #         print(i)
    #         found_result = i.text.split('\n')
    #         print(found_result)
    #         medicine_details = {}
    #         for j in found_result:
    #             print(j.tag_name == 'strike')
    #             if ('₹' in j or 'Rs' in j) and j.tag_name != 'strike':
    #                 print('entered')
    #                 medicine_details[url.split('.')[1]] = j
    #         return medicine_details

driver = launchBrowser()

medicine_name = 'Dolo 650 Tablet'
websites = ['https://www.1mg.com', 'https://www.netmeds.com', 'https://www.pharmeasy.in',
            'https://www.practo.com', 'https://www.apollopharmacy.in',
            'https://www.medplusmart.com', 'https://www.saveonmedicals.com', 'https://www.healthkart.com',
            'https://www.guardian.in']

website_n_elements = {'https://www.1mg.com':  {'text_input': '//*[@id="srchBarShwInfo"]',
                                               'med_data': "//*[contains(@class, 'style__horizontal-card___')]",
                                               'price': "//*[contains(@class, 'style__price-tag___')]"},
                      'https://www.netmeds.com': {'text_input':'//*[@id="search"]',
                                                  'med_data': "//*[contains(@class, 'ais-InfiniteHits-item')]",
                                                  'price':'//*[@id="final_price"]'},
                        'https://www.pharmeasy.in': {'text_input': '//*[@id="topBarInput"]',
                                                     'med_data': "//*[contains(@class, 'ProductCard_medicineUnitContentWrapper__')]",
                                                     'price': '//*[@id="__next"]/main/div/div/div/div[1]/div[1]/div/div/a/div[2]/div/div[4]/div/div[1]/div[1]/div/div/div[2]/div/span[1]'},
                        'https://www.practo.com': {'text_input': '//*[@id="root"]/div[1]/div[2]/div/div[1]/div/div/input',
                                                   'med_data': '//*[@id="root"]/div[1]/div[2]/div/div[1]/div/div[2]/a[2]/div[2]',
                                                   'price': '//*[@id="root"]/div[1]/div[2]/div/div[1]/div/div[2]/a[2]/div[2]/div[3]/span'}
                                                     }

compared_prices_list = []
for website in websites[3:4]:
    print(driver, website, medicine_name,)
    medicine_details = ScrapeMed(driver, website, medicine_name,website_n_elements[website]['text_input'],
                                 website_n_elements[website]['med_data'], website_n_elements[website]['price'])
    compared_prices_list.append(medicine_details)
compared_prices = {medicine_name: compared_prices_list}
print(compared_prices)
