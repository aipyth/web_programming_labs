package main

import (
	"context"
	"database/sql"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"weblabipt/database"
	"weblabipt/services/user"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	_ "github.com/heroku/x/hmetrics/onload"
	_ "github.com/lib/pq"
)

type UserCreationInfo struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Phone     int64  `json:"phone"`
}

type UserUpdateInfo struct {
	Email     string `json:"email"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Phone     int64  `json:"phone"`
}

func initDatabase() *database.Queries {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	// log.Println("DB", db)
	if err != nil {
		log.Fatal(err)
	}

	initContents, err := ioutil.ReadFile("./schema/schema.sql")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec(string(initContents))
	if err != nil {
		log.Fatal(err)
	}

	return database.New(db)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	qs := initDatabase()

	router := gin.New()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("templates/*.html")
	router.Static("/static", "static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/signin", func(c *gin.Context) {
		c.HTML(http.StatusOK, "signin.html", nil)
	})

	router.GET("/user/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}
		user := user.NewUser(qs, nil)
		user.FindByID(int64(id))
		user.Password = ""
		user.Token = uuid.Nil
		c.JSON(http.StatusOK, user.User)
	})

	router.GET("/user/latest10", func(c *gin.Context) {
		users, err := qs.GetLatest10(context.Background())
		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}
		for i := range users {
			users[i].Password = ""
			users[i].Token = uuid.Nil
		}
		c.JSON(http.StatusOK, users)
	})

	router.GET("/user/all", func(c *gin.Context) {
		users, err := qs.GetAllUsers(context.Background())
		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}
		for i := range users {
			users[i].Password = ""
			users[i].Token = uuid.Nil
		}
		c.JSON(http.StatusOK, users)
	})

	router.POST("/user", func(c *gin.Context) {
		var u UserCreationInfo
		err := c.ShouldBindJSON(&u)
		if err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}
		user := user.NewUser(qs, nil)
		user.Email = u.Email
		user.Password = u.Password
		user.Firstname = sql.NullString{
			String: u.Firstname,
			Valid:  true,
		}
		user.Lastname = sql.NullString{
			String: u.Lastname,
			Valid:  true,
		}
		user.Phone = sql.NullInt64{
			Int64: u.Phone,
			Valid: true,
		}
		if err = user.Save(); err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}
		user.Password = ""
		c.JSON(http.StatusCreated, user.User)
	})

	router.PUT("/user/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		user := user.NewUser(qs, nil)
		if err := user.FindByID(int64(id)); err != nil {
			c.AbortWithError(http.StatusNotFound, err)
			return
		}

		var u UserUpdateInfo
		err = c.ShouldBindJSON(&u)
		if err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}

		user.Email = u.Email
		user.Firstname = sql.NullString{
			String: u.Firstname,
			Valid:  true,
		}
		user.Lastname = sql.NullString{
			String: u.Lastname,
			Valid:  true,
		}
		user.Phone = sql.NullInt64{
			Int64: u.Phone,
			Valid: true,
		}
		if err = user.Save(); err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}
		user.Password = ""
		user.Token = uuid.Nil
		c.JSON(http.StatusOK, user.User)
	})

	router.DELETE("/user/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		user := user.NewUser(qs, nil)
		if err := user.FindByID(int64(id)); err != nil {
			c.AbortWithError(http.StatusNotFound, err)
			return
		}
		if err = user.Delete(); err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}
		user.Password = ""
		user.Token = uuid.Nil
		c.JSON(http.StatusOK, user.User)
	})

	router.Run(":" + port)
}
