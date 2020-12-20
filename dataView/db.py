"""
Module that holds the Db credentials
"""

class DatabaseConfiguration:
	def __init__(self):
		self.ENGINE = None
		self.HOST = None
		self.USER = None
		self.PASSWORD = None
		self.NAME = None

	def __iter__(self):
	    for key in self.__dict__:
	        yield key, getattr(self, key)


class Production(DatabaseConfiguration):
	def __init__(self):
		super(Production, self).__init__()
		self.ENGINE = "django.db.backends.mysql"
		self.HOST = "/cloudsql/dataview-298106:us-central1:fractiondataview"
		self.USER = "fraction"
		self.PASSWORD = "JjcAeIME9gBHs8Lr"
		self.NAME = "dataView"


class Development(DatabaseConfiguration):
	def __init__(self):
		super(Development, self).__init__()
		self.ENGINE = "django.db.backends.mysql"
		self.HOST = "127.0.0.1"
		self.PORT = "3306"
		self.USER = "fraction"
		self.PASSWORD = "JjcAeIME9gBHs8Lr"
		self.NAME = "dataView"
