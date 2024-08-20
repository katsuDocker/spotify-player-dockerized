#Build stage
FROM --platform="linux/amd64" node:slim AS build
WORKDIR /app
COPY . ./
RUN npm i
RUN npm i -g typescript
RUN tsc

#Production stage
FROM --platform="linux/amd64" node:slim AS production
WORKDIR /app
COPY . ./
RUN npm i
COPY --from=build /app/dist ./dist
CMD ["node", "dist/app.js"]