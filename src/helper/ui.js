'use strict';

function UILoad(fileUI, fileJS) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', fileUI, true);
    xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want
        console.log('GUI HTML+CSS: ' + fileUI);
        uiWindow.innerHTML = uiWindow.innerHTML + this.responseText;

        if (fileJS) { //load accompanying JS file if it has been set
            var xhrjs = new XMLHttpRequest();
            xhrjs.open('GET', fileJS, true);
            xhrjs.onreadystatechange = function() {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return; // or whatever error handling you want
                console.log('GUI JS: ' + fileJS);
                eval(this.responseText);
            };
            xhrjs.send();
        }
    };
    xhr.send();
}

function UIAdd(UIString) {
    uiWindow.innerHTML = uiWindow.innerHTML + UIString;
}

function UIReset() {
    uiWindow.innerHTML = "";
}

function UIIDvalue(uiIDref, newValue) {
    document.getElementById(uiIDref).innerHTML = newValue;
}
