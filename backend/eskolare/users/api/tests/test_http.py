# from io import BytesIO

from django.contrib.auth import get_user_model
# from django.contrib.auth.models import Group
# from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
# from PIL import Image
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APITestCase


PASSWORD = 'pAssw0rd!'


def create_user(username='user@example.com', password=PASSWORD):
    user = get_user_model().objects.create_user(
        username=username, password=password
    )
    user.save()
    return user


# def create_photo_file():
#     data = BytesIO()
#     Image.new('RGB', (100, 100)).save(data, 'PNG')
#     data.seek(0)
#     return SimpleUploadedFile('photo.png', data.getvalue())


class AuthenticationTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_can_sign_up(self):
        response = self.client.post(reverse('rest_register'), data={
            'username': 'test_user',
            'email': 'user@example.com',
            'password1': PASSWORD,
            'password2': PASSWORD,
        })
        user = get_user_model().objects.last()
        print(user)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(response.data['user']['username'], user.username)
        # self.assertEqual(response.data['detail'], "Verification e-mail sent.")
        # email confirmationa gerek olmadığı için yukarıdaki satırı sildik.

    # login logout test etmeye gerek görmedim, çünkü alluth_rest test ediyor
    @override_settings(ACCOUNT_EMAIL_VERIFICATION="none")
    def test_user_can_login(self):
        user = create_user()
        response = self.client.post(reverse('rest_login'), data={
            'username': user.username,
            'email': 'user@example.com',
            'password': PASSWORD
        })
        # print(response.data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(response.data['user']['username'], user.username)

    def test_user_can_log_out(self):
        user = create_user()
        self.client.login(username=user.username, password=PASSWORD)
        response = self.client.post(reverse('rest_logout'))
        print("status_code for logout:", response.status_code)
        # HTTP_200_OK döndürüyor logoutta da...
        self.assertEqual(status.HTTP_200_OK, response.status_code)


# # class HttpTripTest(APITestCase):
# #     def setUp(self):
# #         self.user = create_user()
# #         self.client = APIClient()
# #         self.client.login(username=self.user.username, password=PASSWORD)

# #     def test_user_can_list_trips(self):
# #         trips = [
# #             Trip.objects.create(pick_up_address='A',
# #                                 drop_off_address='B', rider=self.user),
# #             Trip.objects.create(pick_up_address='C',
# #                                 drop_off_address='D', rider=self.user)
# #         ]
# #         response = self.client.get(reverse('trip:trip_list'))
# #         self.assertEqual(status.HTTP_200_OK, response.status_code)
# #         # hint nk is short form of "natural key"
# #         exp_trip_nks = [trip.nk for trip in trips]
# #         act_trip_nks = [trip.get('nk') for trip in response.data]
# #         self.assertCountEqual(exp_trip_nks, act_trip_nks)

# #     def test_user_can_retrieve_trip_by_nk(self):
# #         trip = Trip.objects.create(
# #             pick_up_address='A', drop_off_address='B', rider=self.user)
# #         response = self.client.get(trip.get_absolute_url())
# #         self.assertEqual(status.HTTP_200_OK, response.status_code)
# #         # self.assertEqual(trip.nk, response.data.get('nk'))
# #         # yukarıdaki şekilde get ile almak mümkün değil.
# #         trip_nk = [trip.get('nk') for trip in response.data][0]
# #         self.assertEqual(trip.nk, trip_nk)
