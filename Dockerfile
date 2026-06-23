# Dockerfile for a Next.js application

# For more information, see the official documentation:
# https://nextjs.org/docs/pages/building-your-application/deploying/docker

# --- Build Stage ---
# This stage builds the Next.js application.
# It uses a Node.js image with all the necessary build tools.
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's layer caching.
# This will only re-run when these files change.
COPY package.json package-lock.json ./

# Install dependencies.
# Using 'npm ci' is recommended for production builds as it's faster and more secure.
RUN npm ci

# Copy the rest of the application's source code.
COPY . .

# It is recommended to use the 'standalone' output mode in your next.config.js file.
# This will create a smaller image with only the necessary files.
# Learn more: https://nextjs.org/docs/pages/api-reference/next-config-js/output
#
# To enable it, add the following to your next.config.js or next.config.mjs:
# /** @type {import('next').NextConfig} */
# const nextConfig = {
#   output: 'standalone',
# };
#
# module.exports = nextConfig;

# Build the Next.js application.
# This will create a production-ready build in the .next directory.
RUN npm run build

# --- Runtime Stage ---
# This stage creates the final, lightweight image that will run the application.
# It uses a minimal Node.js image and copies the built application from the builder stage.

FROM node:20-alpine AS runner

# Set the working directory in the container
WORKDIR /app

# Copy the standalone output from the builder stage.
# This includes the .next/standalone directory and the public and .next/static folders.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static


# Expose the port the application will run on.
# The default port for a Next.js application is 3000.
EXPOSE 3000

# Set the command to start the application.
# This will run the Node.js server that serves the Next.js application.
CMD ["node", "server.js"]