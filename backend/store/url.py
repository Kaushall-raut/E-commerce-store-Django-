from django.urls import path
from . import views
urlpatterns = [
    path("products",views.get_product),
    path('category',views.get_categories),
    path("products/<int:pk>",views.get_products),
    path("cart/",views.get_cart),
    path("products/add",views.add_to_cart),
    path("products/remove",views.remove_item_from_cart),
]