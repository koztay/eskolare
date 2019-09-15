# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app/
COPY vue-client/package.json /app/
RUN npm cache verify
RUN npm install
COPY vue-client /app/
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY nginx/prod/prod.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /dist/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
