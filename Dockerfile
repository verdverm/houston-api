#
# Houston API
# Source of truth for the Astronomer Platform

FROM alpine:3.8
MAINTAINER Astronomer <humans@astronomer.io>

ARG BUILD_NUMBER=-1
LABEL io.astronomer.docker.build.number=$BUILD_NUMBER
LABEL io.astronomer.docker.module="astronomer"
LABEL io.astronomer.docker.component="houston"
LABEL io.astronomer.docker.environment="development"

# Set and switch to installation directory.
ENV HOUSTON_DIR=/opt/houston-api
WORKDIR ${HOUSTON_DIR}

# Add packages.json first so we can prevent rebuilds for code changes.
COPY package.json package.json

# Install packages / dependencies.
RUN apk update \
	&& apk add --no-cache --virtual .build-deps \
		build-base \
		python \
		git \
	&& apk add --no-cache \
		bash \
		netcat-openbsd \
		nodejs \
		nodejs-npm \
		openssl \
	&& npm install \
	&& apk del .build-deps

# Copy in source code.
COPY . .

# Expose port and run default start command.
EXPOSE 8871
CMD ["npm", "run", "start"]
