# ---------- Etapa 1 : build ----------
FROM node:20 AS build
WORKDIR /app

# instala dependencias
COPY package*.json ./
RUN npm ci                         # más rápido y reproducible

# copia el resto del código y compila
COPY . .
RUN npm run build -- --configuration production
#     genera dist/<project-name>

# ---------- Etapa 2 : imagen final ----------
FROM nginx:1.25-alpine

# elimina la conf por defecto y agrega la nuestra
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copia artefacto compilado
COPY --from=build /app/dist/* /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
