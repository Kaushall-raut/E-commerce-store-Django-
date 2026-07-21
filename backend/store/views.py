from django.shortcuts import render
from .models import Products , Category ,Cart,CartItem,Order,OrderItem
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
    
@api_view(['POST'])
def update_quantity(request):
    item_id=request.data.get('item_id')
    quantity=request.data.get('quantity')

    if not item_id or quantity is None:
        return Response({'error':'Item id and quantity are required '},status=400)
    
    try:
        item=CartItem.objects.get(id=item_id)
        if int(quantity<1):
            item.delete()
            return Response({'error':'Quantity must be at least 1'},status=400)
        item.quantity=quantity
        item.save()
        serializer=CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error':'Cart item not found'},status=404)
    
@api_view(['POST'])
def create_order(request):
    try:
        data=request.data 
        name=data.get('name')
        address=data.get('address')
        phone=data.get('phone')
        payment_method=data.get('payment_method','COD')
        cart=Cart.objects.first()

        if not cart or not cart.items.exists():
            return Response({'error':'Cart is empty'},status=400)
        
        total=sum(float(item.product.price) * item.quantity for item in cart.items.all())

        order=Order.objects.create(
            user=None,
            total_amount=total
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

            cart.items.all().delete()

            return Response({
                'message':"Order Placed Successfully",
                'Order_id':order.id
            })
    except Exception as ex:
        return Response({'error':str(ex)},status=500)
