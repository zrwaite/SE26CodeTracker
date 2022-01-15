FROM node:14
WORKDIR /app
COPY ["./backend/package.json", "./backend/package-lock.json", "./"]
RUN npm install
COPY . .
ENV PORT=8002
EXPOSE 8002
CMD ["npm", "start"]