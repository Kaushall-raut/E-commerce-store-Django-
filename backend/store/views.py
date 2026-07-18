from django.shortcuts import render
from .models import Products , Category ,Cart,CartItem
from rest_framework.response import Response
from .serializer import ProductSerializer,CategorySerializer,CartSerializer,CartItemSerializer
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_product(request):
    product=Products.objects.all()
    serializer=ProductSerializer(product,many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_categories(request):
    category=Category.objects.all()
    serializer=CategorySerializer(category,many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_products(request,pk):
    try:
        product=Products.objects.get(id=pk)
        serializer=ProductSerializer(product,context={'request':request})
        return Response(serializer.data)
    except Products.DoesNotExist:
        return Response({'error':'Product not found'},status=404)
    
@api_view(['GET'])
def get_cart(request):
    cart,created=Cart.objects.get_or_create(user=None)
    serializer=CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    product_id=request.data.get('product_id')
    product=Products.objects.get(id=product_id)
    cart,created=Cart.objects.get_or_create(user=None)
    item,created=CartItem.objects.get_or_create(cart=cart,product=product)

    if not created:
        item.quantity+=1
        item.save()

    return Response({'message':'product added to cart','cart':CartSerializer(cart).data})

@api_view(['POST'])
def remove_item_from_cart(request):
    item_id=request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()

    return Response({'message':'Item remove from cart'})
    