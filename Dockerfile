# Install dependencies only when needed
FROM node:alpine
ENV NODE_ENV production
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]