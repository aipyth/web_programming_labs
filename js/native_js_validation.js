var form = document.querySelector("form")
var nameInput = document.querySelector("#name")
var surnameInput = document.querySelector("#surname")
var emailInput = document.querySelector("#email")
var telInput = document.querySelector("#tel")
var passwordInput = document.querySelector("#password")

var nameInputRegex = new RegExp("[A-ZА-ЯІЇЄ][a-zA-Z0-9а-яА-ЯіІїЇєЄ]+")
var surnameInputRegex = new RegExp("[A-ZА-ЯІЇЄ][a-zA-Z0-9а-яА-ЯіІїЇєЄ]+")
var emailInputRegex = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")
var telInputRegex = new RegExp("^(\\+)?(\\d{10}|\\d{12})?$")
var passwordInputRegex = new RegExp("[A-Za-z\\d@$!%*#?&]{8,}")



nameInput.addEventListener("input", () => {
    var valid = nameInputRegex.test(nameInput.value)
    console.log("Name is valid ", valid)
    var errorField = nameInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
    if  (!valid) {
        errorField.innerHTML = "Invalid input. Look up at placeholder."
        errorField.classList.add('error-native-visible')
    } else {
        errorField.classList.remove('error-native-visible')
    }
})

surnameInput.addEventListener("input", () => {
    var valid = surnameInputRegex.test(surnameInput.value)
    console.log("Surname is valid ", valid)
    var errorField = surnameInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
    if  (!valid) {
        errorField.innerHTML = "Invalid input. Look up at placeholder."
        errorField.classList.add('error-native-visible')
    } else {
        errorField.classList.remove('error-native-visible')
    }
})

emailInput.addEventListener("input", () => {
    var valid = emailInputRegex.test(emailInput.value)
    console.log("Email is valid ", valid)
    var errorField = emailInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
    if  (!valid) {
        errorField.innerHTML = "Invalid input. Look up at placeholder."
        errorField.classList.add('error-native-visible')
    } else {
        errorField.classList.remove('error-native-visible')
    }
})

telInput.addEventListener("input", () => {
    var valid = telInputRegex.test(telInput.value)
    console.log("Tel is valid ", valid)
    var errorField = telInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
    if  (!valid) {
        errorField.innerHTML = "Invalid input. Look up at placeholder."
        errorField.classList.add('error-native-visible')
    } else {
        errorField.classList.remove('error-native-visible')
    }
})

passwordInput.addEventListener("input", () => {
    var valid = passwordInputRegex.test(passwordInput.value)
    console.log("Password is valid ", valid)
    var errorField = passwordInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
    if  (!valid) {
        errorField.innerHTML = "Invalid password."
        errorField.classList.add('error-native-visible')
    } else {
        errorField.classList.remove('error-native-visible')
    }
})

form.addEventListener('submit', (e) => {
    allFieldsValid = nameInputRegex.test(nameInput.value) && surnameInputRegex.test(surnameInput.value) &&
        emailInputRegex.test(emailInput.value) && telInputRegex.test(telInput.value) &&
        passwordInputRegex.test(passwordInput.value)

    if (!allFieldsValid) {
        e.preventDefault()
        return false
    }
})