package user

import (
	"context"
	"crypto/sha256"
	"encoding/base64"
	"log"
	"strings"
	"weblabipt/database"

	"github.com/google/uuid"
)

var defaultContext = context.Background()

var passwordPrefix = "JD93kSk-HASH-29dJs9d2j:"

type User struct {
	database.User
	db *database.Queries
}

func NewUser(db *database.Queries, u *database.User) *User {
	if u == nil {
		u = &database.User{}
	}
	return &User{User: *u, db: db}
}

func (u *User) create() error {
	arg := database.CreateUserParams{
		Email:     u.Email,
		Password:  passwordPrefix + hashPassword(u.Password),
		Token:     uuid.New(),
		Firstname: u.Firstname,
		Lastname:  u.Lastname,
	}
	log.Println(arg)
	return u.db.CreateUser(defaultContext, arg)
}

func (u *User) update() error {
	arg := database.UpdateUserParams{
		ID:        u.ID,
		Email:     u.Email,
		Token:     u.Token,
		Firstname: u.Firstname,
		Lastname:  u.Lastname,
	}
	if strings.HasPrefix(u.Password, passwordPrefix) {
		arg.Password = u.Password
	} else {
		arg.Password = passwordPrefix + hashPassword(u.Password)
	}
	return u.db.UpdateUser(defaultContext, arg)
}

func (u *User) Save() error {
	if u.ID == 0 {
		return u.create()
	} else {
		return u.update()
	}
}

func (u *User) Delete() error {
	id := u.ID
	err := u.db.DeleteUser(defaultContext, id)
	if err == nil {
		u.ID = 0
	}
	return err
}

func (u *User) FindByID(id int64) error {
	var err error
	u.User, err = u.db.GetUserById(defaultContext, id)
	return err
}

func (u *User) FindByEmail(email string) error {
	var err error
	u.User, err = u.db.GetUserByEmail(defaultContext, email)
	return err
}

func hashPassword(s string) string {
	hash := sha256.New()
	hash.Write([]byte(s))
	hashBytes := hash.Sum(nil)
	encoded := base64.StdEncoding.EncodeToString(hashBytes)
	return encoded
}
