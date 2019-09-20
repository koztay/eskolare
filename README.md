## Local workflow steps:

### !!! Assumed all necessary docker components has been installed local system !!!

- First build and up docker as below :

```sh
$ docker-compose -f local.yml build
$ docker-compose -f local.yml up
```

- Open another terminal and run the following command in project root:

```sh
$ docker-compose -f local.yml run django python manage.py createsuperuser
```

- Register a couple of users from the vuejs frontend by clicking signup button on this url:
  http://localhost

- Login as super user from the django backed and make some users as staff user on this url:
  http://localhost/admin/

- Login as staff user for testing crud functionality from the frontend
- Login as standard user to test other features (review etc.)

## Deployment workflow steps for VPS (Ubuntu 18.04 with root access on DigitalOcean or Linode etc.):
