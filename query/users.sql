-- name: GetUserById :one
select * from users
where id = $1;

-- name: GetLatest10 :many
select * from users
order by created_at desc
limit 10;

-- name: GetAllUsers :many
select * from users;

-- name: GetUserByEmail :one
select * from users
where email = $1;

-- name: CreateUser :one
insert into users (email, password, token, firstname, lastname, phone, updated_at)
values($1, $2, $3, $4, $5, $6, now())
returning *;

-- name: UpdateUser :one
update users set
email = $2, password = $3, token = $4,
firstname = $5, lastname = $6, updated_at = now()
where id = $1
returning *;

-- name: DeleteUser :exec
delete from users where id = $1;

-- name: CountUsers :one
select count(*) from users;