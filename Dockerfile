# Build stage
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Generate Prisma client
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:lts-alpine
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static/

# Create necessary directories
RUN mkdir -p ./public ./prisma

# Copy prisma files and generated client
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Ensure dev.db exists
RUN touch ./prisma/dev.db

# Copy package files
COPY --from=builder /app/package*.json ./

# Install production dependencies including Prisma
RUN npm install 
# --production
RUN npm install @prisma/client

EXPOSE 3000
CMD ["node", "server.js"]
