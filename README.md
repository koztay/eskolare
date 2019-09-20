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
             --generic-ip-address=<your-machine-ip-address> \
             --generic-ssh-user=root \
             --generic-ssh-port=22 \
             <your-machine-name>
```

- Give the final commands at project root in terminal from the above process:
- At this stage your docker-machine has been activated to deploy your project
- Change the following setting from production.yml file according to your host :

```yml
- 'traefik.frontend.rule=Host:organik.se'
```

to:

```yml
- 'traefik.frontend.rule=Host:eskolare.com' # or your IP address
```

- Give the following command at project root in terminal:

```sh
docker-compose -f production.yml build && docker-compose -f production.yml up -d
```

- Now your has been deployed to the cloud visit the http://<YOUR-IP-ADDRESS> or https://<YOUR-DOMAIN>
  if you added domain instead of IP.

- Apply the Local workflow steps for testing the behaviour.
