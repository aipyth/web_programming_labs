function max(...args) {
    var m = args[0]
    for (i = 0; i < args.length; i++) {
        if (args[i] > m) {
            m = args[i]
        }
    }
    return m
}

var vals = prompt("(5) Enter values for max:")

alert(max(...vals.split(' ').map(x => { return parseInt(x) })))

