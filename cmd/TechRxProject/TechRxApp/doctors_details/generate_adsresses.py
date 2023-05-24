import json

class addresses:
	def read_file(self, file):
		with open(file, 'r') as f:
			self.details = f.read()

	def create_dummy_addresses(self):
		self.addresses_dict = {}
		for i in self.details.split('$'):
			try:
				self.addresses_dict[i.strip().index] = {}
				for j in i.split('\n\n'):
					self.addresses_dict[i.index][j.split(": ")[0]] = ""
					self.addresses_dict[i.index][(j.split(": ")[0]).strip()] = (j.split(": ")[1]).strip()
			except IndexError:
				pass
		json.dump(str(self.addresses_dict), open('dummy_addresses.json', 'w'))

	# def add_doctor_keys(self):

address_obj = addresses()
address_obj.read_file('raw_addresses.txt')
address_obj.create_dummy_addresses()
