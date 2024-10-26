# Stage 1: Build the application
FROM node:23-slim AS builder

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

# Stage 2: Create the final image
FROM node:23-slim

# Set the working directory
WORKDIR /app

# Copy only the build output from the previous stage
COPY --from=builder /app/dist ./dist

# Install pnpm
RUN npm install -g pnpm

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod=true

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["pnpm", "start"]