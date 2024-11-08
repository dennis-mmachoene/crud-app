# Use an official Node.js runtime as a parent image
FROM node:alpine

# Install netcat
RUN apk add --no-cache netcat-openbsd

# Set the working directory for the app
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
