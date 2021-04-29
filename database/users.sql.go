// Code generated by sqlc. DO NOT EDIT.
// source: users.sql

package database

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const createUser = `-- name: CreateUser :one
insert into users (email, password, token, firstname, lastname)
values($1, $2, $3, $4, $5)
returning id, created_at, updated_at, email, password, token, firstname, lastname, phone
`

type CreateUserParams struct {
	Email     string         `json:"email"`
	Password  string         `json:"password"`
	Token     uuid.UUID      `json:"token"`
	Firstname sql.NullString `json:"firstname"`
	Lastname  sql.NullString `json:"lastname"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.Email,
		arg.Password,
		arg.Token,
		arg.Firstname,
		arg.Lastname,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Email,
		&i.Password,
		&i.Token,
		&i.Firstname,
		&i.Lastname,
		&i.Phone,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
delete from users where id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteUser, id)
	return err
}

const getAllUsers = `-- name: GetAllUsers :many
select id, created_at, updated_at, email, password, token, firstname, lastname, phone from users
`

func (q *Queries) GetAllUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, getAllUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Email,
			&i.Password,
			&i.Token,
			&i.Firstname,
			&i.Lastname,
			&i.Phone,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getLatest10 = `-- name: GetLatest10 :many
select id, created_at, updated_at, email, password, token, firstname, lastname, phone from users
order by created_at desc
limit 10
`

func (q *Queries) GetLatest10(ctx context.Context) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, getLatest10)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Email,
			&i.Password,
			&i.Token,
			&i.Firstname,
			&i.Lastname,
			&i.Phone,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserByEmail = `-- name: GetUserByEmail :one
select id, created_at, updated_at, email, password, token, firstname, lastname, phone from users
where email = $1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Email,
		&i.Password,
		&i.Token,
		&i.Firstname,
		&i.Lastname,
		&i.Phone,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
select id, created_at, updated_at, email, password, token, firstname, lastname, phone from users
where id = $1
`

func (q *Queries) GetUserById(ctx context.Context, id int64) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Email,
		&i.Password,
		&i.Token,
		&i.Firstname,
		&i.Lastname,
		&i.Phone,
	)
	return i, err
}

const updateUser = `-- name: UpdateUser :one
update users set
email = $2, password = $3, token = $4,
firstname = $5, lastname = $6, updated_at = now()
where id = $1
returning id, created_at, updated_at, email, password, token, firstname, lastname, phone
`

type UpdateUserParams struct {
	ID        int64          `json:"id"`
	Email     string         `json:"email"`
	Password  string         `json:"password"`
	Token     uuid.UUID      `json:"token"`
	Firstname sql.NullString `json:"firstname"`
	Lastname  sql.NullString `json:"lastname"`
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUser,
		arg.ID,
		arg.Email,
		arg.Password,
		arg.Token,
		arg.Firstname,
		arg.Lastname,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Email,
		&i.Password,
		&i.Token,
		&i.Firstname,
		&i.Lastname,
		&i.Phone,
	)
	return i, err
}
