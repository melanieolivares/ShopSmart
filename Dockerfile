FROM node:18-alpine

ENV NODE_ENV production

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apk add --no-cache \
udev \
ttf-freefont \
chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY . .

EXPOSE 4000

CMD npm start