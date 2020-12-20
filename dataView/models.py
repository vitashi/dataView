import datetime

from django.db import models
from django.utils import timezone
from django.db.models import Sum


class NotFound(Exception):
    pass


# Cache in app
# These arent so any, so we can get away by having this.
# To avoid a unnecessary lookups.
# in future use memcache or redis based memoization
EXISTING_COUNTRIES = {}
EXISTING_DEPARTMENTS = {}
EXISTING_PRODUCTS = {}
EXISTING_DISCOUNT_BANDS = {}


class CustomBaseModel(models.Model):
    CACHE_DICT = None

    def json(self):
        return dict(
                id=self.id,
                name=self.name.title()
            )

    def __str__(self):
        return "<{0} id no {1}>".format(self.name, self.id)

    @classmethod
    def maybe_add(cls, name, save=True):
        # can add an entity if it does not already exist
        try:
            entity = cls.CACHE_DICT.get(name)
            if not entity:
                entity = cls.get_by_name(name)
        except NotFound:
            # entity does not exist. Proceed to create it.
            entity = cls(name=name)
            if save:
                entity.save()

        return entity

    def save(self):
        super(CustomBaseModel, self).save()
        self.add_to_cache()

    def add_to_cache(self):
        self.CACHE_DICT.update({self.name: self})

    @classmethod
    def get_by_name(cls, name):
        entity = cls.objects.filter(name=name)
        
        if not entity:
            raise NotFound("{0} of name {1} not found".format(cls.__name__, name))

        return entity

    @classmethod
    def get_all_entities(cls, save_to_cache=True):
        print("Loading {0} entities into cache".format(cls.__name__))
        entities = cls.objects.all()
        if save_to_cache:
            for entity in entities:
                entity.add_to_cache()
        return entities

    @classmethod
    def get_all_as_json(cls):
        entities = cls.get_all_entities(save_to_cache=False)
        return [entity.json() for entity in entities]


class Country(CustomBaseModel):
    CACHE_DICT = EXISTING_COUNTRIES
    name = models.CharField(max_length=100, primary_key=True)


class Department(CustomBaseModel):
    CACHE_DICT = EXISTING_DEPARTMENTS
    name = models.CharField(max_length=100, primary_key=True)


class Product(CustomBaseModel):
    CACHE_DICT = EXISTING_PRODUCTS
    name = models.CharField(max_length=100, primary_key=True)
    manufacturing_cost = models.DecimalField(max_digits=20, decimal_places=2)

    def json(self):
        json = super(Product, self).json()
        json.update(manufacturing_cost=self.manufacturing_cost)
        return json


class DiscountBand(CustomBaseModel):
    CACHE_DICT = EXISTING_DISCOUNT_BANDS
    name = models.CharField(max_length=10, primary_key=True)


class Sale(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    discount_band = models.ForeignKey(DiscountBand, on_delete=models.CASCADE)
    discount = models.DecimalField(max_digits=20, decimal_places=2, blank=True)
    quantity = models.DecimalField(max_digits=20, decimal_places=2)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    sale = models.DecimalField(max_digits=20, decimal_places=2)
    profit = models.DecimalField(max_digits=20, decimal_places=2)
    cogs = models.DecimalField(max_digits=20, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return "<Sale Object> {0}:{1}:{2}:{3}".format(self.product, self.department, self.country, self.price)

    def json(self):
        return dict(
                id=self.id,
                department=self.department.name.title(),
                country=self.country.name.title(),
                product=self.product.name.title(),
                discount_band=self.discount_band.name.title(),
                discount=self.discount,
                quantity=self.quantity,
                price=self.price,
                sale=self.sale,
                profit=self.profit,
                cogs=self.cogs,
                date=self.date
            )

    @staticmethod
    def add_sale(department, country, product, manufacturing_cost, discount_band, discount, quantity, price, sale, profit, cogs, date):
        department = Department.maybe_add(department.lower())
        country = Country.maybe_add(country.lower())
        if discount_band:
            discount_band = DiscountBand.maybe_add(discount_band.lower())

        product = Product.maybe_add(product, save=False)
        product.manufacturing_cost = manufacturing_cost
        product.save()

        sales_record = Sale(
            department=department, country=country, product=product,
            discount=discount, discount_band=discount_band, price=price,
            sale=sale, profit=profit, cogs=cogs, date=date, quantity=quantity)

        sales_record.save()

        return sales_record

    @staticmethod
    def get_all(department=None, country=None, product=None, before=None, after=None, limit=None):
        sale_query = Sale.objects
        if department:
            sale_query = sale_query.filter(department=department)

        if country:
            sale_query = sale_query.filter(country=country)

        if product:
            sale_query = sale_query.filter(product=product)

        if all([before, after]):
            sale_query = sale_query.filter(date__range=[before, after])

        elif after:
            sale_query = sale_query.filter(date__lte=after)

        elif before:
            sale_query = sale_query.filter(date__gte=before)

        sale_query = sale_query.order_by('-date')

        if limit:
            sale_query = sale_query[int(limit):]

        return sale_query

    @staticmethod
    def get_chart_data(department=None, country=None, product=None, before=None, after=None):
        sale_query = Sale.objects

        if department:
            sale_query = sale_query.filter(department=department)

        if country:
            sale_query = sale_query.filter(country=country)

        if product:
            sale_query = sale_query.filter(product=product)

        if all([before, after]):
            sale_query = sale_query.filter(date__range=[before, after])

        elif after:
            sale_query = sale_query.filter(date__lte=after)

        elif before:
            sale_query = sale_query.filter(date__gte=before)

        sale_query = sale_query.values('product').order_by('product')

        chart_data = sale_query.annotate(cogs=Sum('cogs'), sales=Sum('sale'), profit=Sum('profit'))

        return chart_data

