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
    var interval = 10000
    var modalWaiter = setInterval(showHint, interval)
    return function () {
        console.log("postponed modal window appearence")
        clearInterval(modalWaiter)
        modalWaiter = setInterval(showHint, interval)
    }
}

var postponeModal = _postponeModal()

hideModalBtn.addEventListener('click', postponeModal)

var allInputs = document.querySelectorAll('input')

for (input of allInputs) {
    input.addEventListener('input', postponeModal)
}
