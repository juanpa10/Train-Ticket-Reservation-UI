# ───── Etapa 1 : build Angular ─────
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# ───── Etapa 2 : Nginx ─────
FROM nginx:1.25-alpine

# Elimina cualquier conf por defecto
RUN rm -f /etc/nginx/conf.d/*

# Nueva conf con fallback a index.html
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    include /etc/nginx/mime.types;\n\
    location / {\n\
      try_files $uri $uri/ /index.html;\n\
    }\n\
  }\n' > /etc/nginx/conf.d/angular.conf

# Copia **el contenido de /browser**: ahí está el index correcto y todos los assets
COPY --from=build /app/dist/trainbook-ui/browser/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
