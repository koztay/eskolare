from django.http import Http404

from rest_framework import generics, viewsets, mixins, status, permissions
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


from ..models import Seller

from .serializers import SellerSerializer


class SellerViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    """Viewset for Sellers"""
    authentication_classes = ()  # listelemek için login olmaya gerek yok.
    permission_classes = ()  # listelemek için login olmaya gerek yok.

    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class BaseLikeDislikeSellerView(generics.UpdateAPIView):
    """View for the toggle user like/dislike"""
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = SellerSerializer
    queryset = Seller.objects.all()

    def get_object(self, pk):
        try:
            return Seller.objects.get(pk=pk)
        except Seller.DoesNotExist:
            raise Http404


class LikeSellerView(BaseLikeDislikeSellerView):
    def patch(self, request, pk):
        seller = self.get_object(pk)
        serializer = SellerSerializer(seller, partial=True)
        user_id = request.user.id
        seller.like_seller(user_id)

        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # serializer 'ın invalid olma şansı yok, çünkü seller yoksa 404 dönürürüyor
        return Response(serializer.data, status=status.HTTP_200_OK)


class DislikeSellerView(BaseLikeDislikeSellerView):
    def patch(self, request, pk):
        seller = self.get_object(pk)
        serializer = SellerSerializer(seller, partial=True)
        user_id = request.user.id
        seller.dislike_seller(user_id)

        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # serializer 'ın invalid olma şansı yok, çünkü seller yoksa 404 dönürürüyor
        return Response(serializer.data, status=status.HTTP_200_OK)
