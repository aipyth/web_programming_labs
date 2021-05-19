function addAllSignups(user) {
    let creation = new Date(user.created_at)
    let name = user.firstname.String + " " + user.lastname.String

    const html = `
    <div class="signup-user">
        <p class="signup-date">${creation}</p>
        <p class="signup-name">${name}</p>
        <p class="signup-email">${user.email}</p>
        <span class="close" onclick="deleteUser(${user.id})">Delete</span>
    </div>
    `

    document.querySelector("#all-signups").innerHTML += html
}

function deleteUser(id) {
    // $.delete(`/user/${id}`, function(data){
    //     console.log(data)
    // })
    $.ajax({
        url: `/user/${id}`,
        type: 'DELETE',
        success: function(result) {
            console.log("Deleted", result)
        }
    });
}

setInterval(function() {
    $.get("/user/all", function(data){
        document.querySelector("#all-signups").innerHTML = ""

        for (user of data) {
            addAllSignups(user)
        }
    })
}, 1000)