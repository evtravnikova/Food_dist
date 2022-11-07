function copytext() {
    //text copying is prohibited
function copyOff() {
    document.addEventListener('copy', (event) => {
        event.clipboardData.setData("text/plain", "nononono :P");
        event.preventDefault()
    }, false);
}
  //copyOff()
}

export default copytext;