# import pytest
# from channels.db import database_sync_to_async
# from channels.layers import get_channel_layer
# from channels.testing import WebsocketCommunicator
# from django.contrib.auth import get_user_model
# from django.contrib.auth.models import Group
# from django.test import Client, override_settings
# from nose.tools import (assert_equal, assert_is_none, assert_is_not_none,
#                         assert_true)

# from django_webos.routing import application

# TEST_CHANNEL_LAYERS = {
#     'default': {
#         'BACKEND': 'channels.layers.InMemoryChannelLayer',
#     },
# }


# @database_sync_to_async
# # Accessing the Django database is a synchronous operation as opposed
# # to an asynchronous one, which means you need to handle it in a
# # special way to ensure that the connections are closed properly.
# # All functions that access the Django ORM should be decorated with
# # @database_sync_to_async.
# def create_user(
#     *,
#     username='rider@example.com',
#     password='pAssw0rd!',
#     group='rider'
# ):
#     # Create user.
#     user = get_user_model().objects.create_user(
#         username=username,
#         password=password
#     )

#     # Create user group.
#     user_group, _ = Group.objects.get_or_create(name=group)
#     user.groups.add(user_group)
#     user.save()
#     return user


# async def auth_connect(user):
#     client = Client()
#     client.force_login(user=user)
#     communicator = WebsocketCommunicator(
#         application=application,
#         path='taxi/',
#         headers=[(
#             b'cookie',
#             f'sessionid={client.cookies["sessionid"].value}'.encode('ascii')
#         )]

#     )
#     connected, _ = await communicator.connect()
#     assert_true(connected)
#     return communicator


# @pytest.mark.asyncio
# @pytest.mark.django_db(transaction=True)
# # transation=True ensures that the database will be flushed between tests.
# class TestWebsockets:
#     @override_settings(CHANNEL_LAYERS=TEST_CHANNEL_LAYERS)
#     async def test_authorized_user_can_connect(self):

#         user = await create_user(
#             username='rider@example.com',
#             group='rider'
#         )

#         communicator = await auth_connect(user)
#         await communicator.disconnect()
