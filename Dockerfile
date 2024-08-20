FROM --platform="linux/amd64" node:slim

WORKDIR /app
COPY . ./
RUN npm i
EXPOSE 3000
CMD npm start