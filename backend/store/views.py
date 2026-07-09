from django.shortcuts import render
from .models import Products , Category
from rest_framework.response import Response
from .serializer import ProductSerializer,CategorySerializer
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_products(request):
    product=Products.objects.all()
    serializer=ProductSerializer(product,many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_categories(request):
    category=Category.objects.all()
    serializer=CategorySerializer(category,many=True)

    return Response(serializer.data)