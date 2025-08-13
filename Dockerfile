FROM node:20-alpine

WORKDIR /app

# Install native dependencies for Sharp
RUN apk add --no-cache \
    vips-dev \
    glib-dev \
    expat-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libtiff-dev \
    g++ \
    make \
    python3

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@8.15.7
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "start"]