FROM node:22.12.0 
WORKDIR /app
COPY . .
RUN npm install .
EXPOSE 3000
CMD ["npm", "run","start"]