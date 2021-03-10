function max(...args) {
    var m = args[0]
    for (a of args) {
        if (a > m) {
            m = a
        }
    }
    return m
}

// var vals = prompt("Enter values for max:")

// console.log(typeof vals)

// var el = document.createElement('input')
// document.body.innerHTML = document.body.innerHTML + "<input type=\"text\" id=\"func\">"

// document.body.innerHTML = document.body.innerHTML + "<input type=\"text\" id=\"func\">"
