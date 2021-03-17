class Student {
    constructor(name, surname, age, course) {
        this.name = name
        this.surname = surname
        this.age = age
        this.course = course
    }

    get str() {
        return "[ " + this.name + ' ' + this.surname + ' ' + this.age + ' ' + this.course + " ]"
    }

    GetOlder(ch) {
        this.age = this.age + ch
        return this
    }

    ChangeSurname(surname) {
        this.surname = surname
        return this
    }

    MoveToNextCourse() {
        this.course = this.course + 1
        return this
    }
}

let st = new Student("Oleg", "Oleg", 30, 2)
document.querySelector('#obj').innerHTML = "<p>Student object created: " + st.str + "</p>"
document.querySelector('#obj').innerHTML += "<p>Changes surname: " + st.ChangeSurname("Ol").str  + "</p>"
document.querySelector('#obj').innerHTML += "<p>Moved to next course: " + st.MoveToNextCourse().str + "</p>"
document.querySelector('#obj').innerHTML += "<p>And got older: " + st.GetOlder(1).str  + "</p>"
document.querySelector('#obj').innerHTML += "<p>Finally the student is: " + st.str + "</p>"

// console.log("Student object created: ", st)
// console.log("Changes surname: ", st.ChangeSurname("Ol"))
// console.log("Moved to next course: ", st.MoveToNextCourse())
// console.log("And got older: ", st.GetOlder(1))
// console.log("Finally the student is: ", st)