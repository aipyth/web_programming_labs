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


nameFieldValidator = function() {
    var valid = nameInputRegex.test(nameInput.value)
    return {
        data: function() {
            return nameInput.value
        },
        valid: function() {
            return valid
        },
        revalidate: function() {
            valid = nameInputRegex.test(nameInput.value)
            console.log("Name is valid ", valid)
            var errorField = nameInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
            if  (!valid) {
                errorField.innerHTML = "Invalid input. Look up at placeholder."
                errorField.classList.add('error-native-visible')
            } else {
                errorField.classList.remove('error-native-visible')
            }
        }
    }
}()
nameInput.addEventListener("input", nameFieldValidator.revalidate)


surnameFieldValidator = function() {
    let valid = surnameInputRegex.test(surnameInput.value)
    return {
        data: function() {
            return surnameInput.value
        },
        valid: function() {
            return valid
        },
        revalidate: function() {
            valid = surnameInputRegex.test(surnameInput.value)
            console.log("Surname is valid ", valid)
            var errorField = surnameInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
            if  (!valid) {
                errorField.innerHTML = "Invalid input. Look up at placeholder."
                errorField.classList.add('error-native-visible')
            } else {
                errorField.classList.remove('error-native-visible')
            }
        }
    }

}()
surnameInput.addEventListener("input", surnameFieldValidator.revalidate)

emailFieldValidator = function() {
    let valid = emailInputRegex.test(emailInput.value)
    return {
        data: function() {
            return emailInput.value
        },
        valid: function() {
            return valid
        },
        revalidate: function() {
            valid = emailInputRegex.test(emailInput.value)
            console.log("Email is valid ", valid)
            var errorField = emailInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
            if  (!valid) {
                errorField.innerHTML = "Invalid input. Look up at placeholder."
                errorField.classList.add('error-native-visible')
            } else {
                errorField.classList.remove('error-native-visible')
            }
        }
    }
}()
emailInput.addEventListener("input", emailFieldValidator.revalidate)

telFieldValidator = function() {
    var valid = telInputRegex.test(telInput.value)
    return {
        data: function() {
            return telInput.value
        },
        valid: function() {
            return valid
        },
        revalidate: function() {
            valid = telInputRegex.test(telInput.value)
            console.log("Tel is valid ", valid)
            var errorField = telInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
            if  (!valid) {
                errorField.innerHTML = "Invalid input. Look up at placeholder."
                errorField.classList.add('error-native-visible')
            } else {
                errorField.classList.remove('error-native-visible')
            }
        }
    }
}()
telInput.addEventListener("input", telFieldValidator.revalidate)

passwordFieldValidator = function() {
    let valid = passwordInputRegex.test(passwordInput.value)
    return {
        data: function() {
            return passwordInput.value
        },
        valid: function() {
            return valid
        },
        revalidate: function() {
            valid = passwordInputRegex.test(passwordInput.value)
            console.log("Password is valid ", valid)
            var errorField = passwordInput.previousSibling.parentElement.parentElement.querySelector('.error-native')
            if  (!valid) {
                errorField.innerHTML = "Weak password."
                errorField.classList.add('error-native-visible')
            } else {
                errorField.classList.remove('error-native-visible')
            }
        }
    }
}()
passwordInput.addEventListener("input", passwordFieldValidator.revalidate)

let validators = [
    nameFieldValidator,
    surnameFieldValidator,
    emailFieldValidator,
    telFieldValidator,
    passwordFieldValidator,
]

// form.addEventListener('submit', (e) => {
//     allFieldsValid = nameInputRegex.test(nameInput.value) && surnameInputRegex.test(surnameInput.value) &&
//         emailInputRegex.test(emailInput.value) && telInputRegex.test(telInput.value) &&
//         passwordInputRegex.test(passwordInput.value)

//     if (!allFieldsValid) {
//         e.preventDefault()
//         return false
//     }
// })