from django.contrib import admin
from .models import Category,Products,Order,OrderItem,UserProfile
# Register your models here.


admin.site.register(Category)
admin.site.register(Products)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(UserProfile)
