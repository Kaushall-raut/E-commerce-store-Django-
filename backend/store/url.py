from django.urls import path
from .views import get_categories,get_products
urlpatterns = [
    path("products",get_products),
    path('category',get_categories)
]