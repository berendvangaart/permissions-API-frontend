FROM ruby:latest
# Install dependencies
RUN apk add --no-cache \
    bash \
    curl \
    nodejs \
    npm \

