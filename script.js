const pad = document.querySelectorAll(".item");
// const pad1 = document.getElementById("cie")
const display = document.querySelector(".display")
pad.forEach((elm) => elm.addEventListener("click", (evt) => {
    display.innerHTML = evt.target.innerHTML;
}))