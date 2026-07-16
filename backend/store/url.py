from django.urls import path
from . import views
urlpatterns = [
    path("products",views.get_product),
    path('category',views.get_categories),
    path("products/<int:pk>",views.get_products),
]