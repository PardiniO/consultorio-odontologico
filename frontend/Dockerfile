# Paso 1: compilar Angular (como hacer "ng build")
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Paso 2: servir los archivos compilados con Nginx
FROM nginx:1.30-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/consultorio-odontologico/browser /usr/share/nginx/html
