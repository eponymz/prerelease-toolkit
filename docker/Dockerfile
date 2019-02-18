FROM node:8
WORKDIR /prerelease-toolkit
COPY . package*.json
RUN npm i
COPY . client/package*.json
RUN npm i --prefix client
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]
