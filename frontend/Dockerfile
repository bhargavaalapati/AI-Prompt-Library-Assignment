# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@17

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the Angular dev server port
EXPOSE 4200

# Start the dev server and bind to all network interfaces so it's accessible outside the container
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]