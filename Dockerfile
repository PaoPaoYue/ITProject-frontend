FROM daocloud.io/library/node:14.3-alpine
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM daocloud.io/library/nginx:1.19.0-alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl /etc/nginx/ssl