setInterval(function() {
    $.get("/user/count", function(data){
        document.querySelector("#users-count").innerHTML = "Users count: " + data.number
    })
}, 1000)