var adDiv;

function adShow() {
    adDiv = document.createElement("div");
    adDiv.className += " adBox";
    adDiv.className += " adBox-show";

    adDiv.innerHTML = '<iframe src="http://devanew.com/" style="border: 0pt none ;' +
        'position: absolute;' +
        'width: 100%;' +
        'height: 100%;" scrolling="no"></iframe>';
    document.body.appendChild(adDiv);
}

function adHide() {
    adDiv.innerHTML = "";
    adDiv.classList.remove("adBox-show");
}
