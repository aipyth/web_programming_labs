const login_field = document.querySelector("#login-field")

document.querySelector("#signup-btn").addEventListener("click", () => {
    login_field.classList.remove("hidden")
})

document.querySelector(".login-container > .close").addEventListener("click", () => {
    login_field.classList.add("hidden")
})

// login_field.addEventListener("click", () => {
//     login_field.classList.add("hidden")
// })