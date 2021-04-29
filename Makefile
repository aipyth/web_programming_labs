BUILD_ENV_VARS=CGO_ENABLED=0 GOOS=linux GOARCH=amd64

all: sqlc-generate compile-up

sqlc-generate:
	docker run --rm -v `pwd`:/src:Z -w /src kjconroy/sqlc generate

compile:
	$(BUILD_ENV_VARS) go build

compile-restart: compile
	docker-compose restart server

compile-up: compile
	docker-compose up -d