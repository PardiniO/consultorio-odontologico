FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# NUEVO, PARA COMPILAR Y CREAR LA CARPETA DIST
CMD ["node", "dist/server.js"]
