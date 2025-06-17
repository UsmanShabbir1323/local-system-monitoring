FROM node:18-alpine

# Define working directory for node app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install node packages
RUN npm install

#Copy source code
COPY . .

# Expose Server Port
EXPOSE 3001

# Run Server
CMD [ "node", "metric.js" ]