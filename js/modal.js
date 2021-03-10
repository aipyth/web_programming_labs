function showHint() {
    var modal = document.querySelector("#forminfo")
    modal.classList.add("modal-visible")
}

function hideHint() {
    var modal = document.querySelector("#forminfo")
    modal.classList.remove("modal-visible")
}

const showModalButton = document.querySelector("#form-info-btn")
showModalButton.addEventListener('click', showHint)

const hideModalBtn = document.querySelector(".close")
hideModalBtn.addEventListener('click', hideHint)

function _postponeModal() {
    var modalWaiter = setInterval(showHint, 5000)
    return function () {
        clearInterval(modalWaiter)
        modalWaiter = setInterval(showHint, 5000)
    }
}

var postponeModal = _postponeModal()

var allInputs = document.querySelectorAll('input')

for (input of allInputs) {
    input.addEventListener('input', postponeModal)
}
