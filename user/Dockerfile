# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy files
COPY . .

# Install app dependencies
RUN npm install

# Set the command to start the app
CMD [ "npm", "start" ]