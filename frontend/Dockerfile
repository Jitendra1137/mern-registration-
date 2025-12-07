# 1️⃣ Build stage – Node image for building React/Vite app
FROM node:20-alpine AS build

WORKDIR /app

# 2️⃣ Dependency files copy karo
COPY package*.json ./

# 3️⃣ Dependencies install karo
RUN npm install

# 4️⃣ Source code copy karo
COPY . .

# 5️⃣ ✅ Build-time API URL pass karna
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# 6️⃣ ✅ Optimized production build generate karo
RUN npm run build


# ============================
# 7️⃣ Final production stage – Nginx
# ============================
FROM nginx:alpine

# 8️⃣ Default html folder clean
RUN rm -rf /usr/share/nginx/html/*

# 9️⃣ Build files ko Nginx ke html folder me copy
COPY --from=build /app/dist /usr/share/nginx/html

# 🔟 Public frontend port
EXPOSE 80

# 1️⃣1️⃣ Nginx start
CMD ["nginx", "-g", "daemon off;"]
