FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*

COPY dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# FROM traefik:v2.10

# COPY dist /var/www/html

# # COPY traefik.yml /etc/traefik/traefik.yml

# RUN chmod -R 755 /var/www/html

# EXPOSE 80

# CMD ["traefik", "--configFile=/etc/traefik/traefik.yml"]