$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Invalid input."
);

$("form").validate({
    rules: {
        name: {
            required: true,
            regex: /[A-ZА-ЯІЇЄ][a-zA-Z0-9а-яА-ЯіІїЇєЄ]+/
        },
        surname: {
            required: true,
            regex: /[A-ZА-ЯІЇЄ][a-zA-Z0-9а-яА-ЯіІїЇєЄ]+/
        },
        email: {
            required: true,
            email: true,
            regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        },
        tel: {
            required: true,
            regex: /^(\+)?(\d{10}|\d{12})$/
        },
        password: {
            required: true,
            regex: /[A-Za-z\d@$!%*#?&]{8,}/
        }
    },
    // messages: {
    //     name: "This fields is required",
    //     surname: "This fields is required",
    //     email: "This fields is required",
    //     tel: "This field is required",
    //     password: "This field is required"
    // },
    // submitHandler: function() {
    //     return false
    // }
})