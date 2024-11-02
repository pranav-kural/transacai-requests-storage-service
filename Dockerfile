# Use the official Node.js image as the base image
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Set environment as production (disables introspection)
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["pnpm", "start"]