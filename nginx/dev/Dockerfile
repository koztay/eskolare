FROM nginx:1.13.12-alpine
COPY nginx/dev/dev.conf /etc/nginx/nginx.conf
COPY backend/staticfiles /usr/src/app/static/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]