# Base image
FROM node:18-alpine  

# Environment variables
ENV DB_URI= $DB_URI\
    SECRET=$AUTH_SECRET

#Create app directory
WORKDIR /usr/src/app

# Copy packages files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the nest js app
CMD ["npm", "run", "start"]
