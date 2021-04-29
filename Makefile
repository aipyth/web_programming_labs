sqlc-generate:
	docker run --rm -v `pwd`:/src:Z -w /src kjconroy/sqlc generate