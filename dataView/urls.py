from django.urls import path

from . import views

app_name = 'dataView'
urlpatterns = [
    path('api/getSalesData/', views.SaleView.as_view(), name='all_sales'),
    path('api/getSalesData/<str:department>/<str:country>/<str:product>/<str:from_date>/<str:to_date>/', views.SaleView.as_view(), name='all_sales_filtered'),
    path('api/getCountries/', views.CountryView.as_view(), name='all_countries'),
    path('api/getProducts/', views.ProductView.as_view(), name='all_products'),
    path('api/getDepartments/', views.DepartmentView.as_view(), name='all_departments'),
    path('api/getChartData/<str:department>/<str:country>/<str:product>/<str:from_date>/<str:to_date>/', views.ChartView.as_view(), name='chart_data'),
    path('api/uploadfile/', views.FileUploadView.as_view(), name="upload_spreadsheet")
    # path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    # path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    # path('<int:question_id>/vote/', views.vote, name='vote'),
]
