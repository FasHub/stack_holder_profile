FROM node

WORKDIR /app/stack_holder_profile

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]