function addSignups(user) {
    let creation = new Date(user.created_at)
    let name = user.firstname.String + " " + user.lastname.String

    const html = `
    <div class="signup-user">
        <p class="signup-date">${creation}</p>
        <p class="signup-name">${name}</p>
        <p class="signup-email">${user.email}</p>
    </div>
    `

    document.querySelector("#last-signups").innerHTML += html
}

// setInterval(function() {
    $.get("/user/latest10", function(data){
        document.querySelector("#last-signups").innerHTML = ""

        for (user of data) {
            addSignups(user)
        }
    })
// }, 1000)