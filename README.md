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

- First setup passwordless root acces to your vps by ssh-copy-id command
- Secure your VPS by disabling with password login
- Give the following command in terminal and wait until docker-machine setup your VPS:

```sh
docker-machine create \
             --driver generic \
             --generic-engine-port=2376 \
             --generic-ip-address=172.104.225.203 \
             --generic-ssh-user=root \
             --generic-ssh-port=22 \
             organikse
```

- When the above process finished, give the following command at project root in terminal `docker-machine env <your-machine-name>`
- Then give the following command `eval $(docker-machine env <your-machine-name>)`
- Now your docker-machine should have been activated, test it with the following command `docker-machine ls`
- At this stage your VPS is ready to deploy your project.
- Change the following setting from production.yml file according to your host :

```yml
- 'traefik.frontend.rule=Host:172.104.225.203'
```

to:

```yml
- 'traefik.frontend.rule=Host:<YOUR-IP-ADDRESS or YOUR-DOMAIN>'
```

- Change the AWS bucket name setting at file `backends/.envs/.production/.django` accordingly:
  `DJANGO_AWS_STORAGE_BUCKET_NAME=organikse`

- Give the following command at project root in terminal:

```sh
docker-compose -f production.yml build && docker-compose -f production.yml up -d
```

- Apply migrations to django backend

```sh
docker-compose -f production.yml run --rm django python manage.py migrate
```

- Now your has been deployed to the cloud visit the http://<YOUR-IP-ADDRESS> or https://<YOUR-DOMAIN>
  if you added domain instead of IP.

- Apply the Local workflow steps for testing the behaviour.
