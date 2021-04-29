FROM golang:alpine3.13
WORKDIR /app
COPY . /app
CMD "weblabipt"