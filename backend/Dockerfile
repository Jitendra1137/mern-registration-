# 1️⃣ Node.js 20 ka lightweight Alpine image
FROM node:20-alpine

# 2️⃣ App ka working directory
WORKDIR /app

# 3️⃣ Dependency files copy karo
COPY package*.json ./

# 4️⃣ Sirf production dependencies install karo
RUN npm install --production

# 5️⃣ Pura backend source code copy karo
COPY . .

# 6️⃣ Backend ka port expose karo
EXPOSE 5000

# 7️⃣ Backend start command
CMD ["node", "server.js"]
