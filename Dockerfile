# Use an official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Expose the Next.js development port
EXPOSE 3000

# Run the Next.js application
CMD ["npm", "run", "dev"]