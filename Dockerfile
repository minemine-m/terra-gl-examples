# Production stage only
FROM nginx:stable-alpine
# Copy the already built dist folder to nginx html directory
COPY dist /usr/share/nginx/html
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
