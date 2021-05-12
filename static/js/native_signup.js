var form = document.querySelector("form")

function sendSignUpDataJS() {
    document.querySelector("#errors").textContent = ""
    console.log("sending request")
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // console.log(this)
        if (this.status == 409) {
            // conflict. record already exist
            document.querySelector("#errors").textContent = "This user already exist."
        } else if (this.status == 500) {
            // server error
            document.querySelector("#errors").textContent = "Server error."
        } else if (this.status == 400) {
            // bad request. frontend error
            document.querySelector("#errors").textContent = "Client side error."
        } else if (this.status == 201) {
            // ok
            login_field.classList.add("hidden")
        }
    }
    xmlhttp.open("POST", "/user", true)
    xmlhttp.setRequestHeader("Content-Type", "application/json")
    xmlhttp.send(JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
        firstname: nameInput.value,
        lastname: surnameInput.value,
        phone: parseInt(telInput.value),
    }))
}

function sendSignUpDataAjax() {
    document.querySelector("#errors").textContent = ""
    console.log("sending request")
    $.ajax({
        url: "/user",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
            firstname: nameInput.value,
            lastname: surnameInput.value,
            phone: parseInt(telInput.value),
        }),
        statusCode: {
            400: function() {
                document.querySelector("#errors").textContent = "Client side error."
            },
            500: function() {
                document.querySelector("#errors").textContent = "Server error."
            },
            409: function() {
                document.querySelector("#errors").textContent = "This user already exist."
            }
        },
        success: function(data, textStatus) {
            login_field.classList.add("hidden")
        }
    })
}

form.addEventListener('submit', function(event) {
    let valid = true
    for (field of validators) {
        if (!field.valid()) {
            valid = false
            console.log("field not valid", field)
        }
    }
    

    if (valid) {
        // send request
        if (document.querySelector("#send-option").checked == true) {
            console.log("using jquery")
            sendSignUpDataAjax()
        } else {
            console.log("using js")
            sendSignUpDataJS()
        }
    }
    event.preventDefault()
})