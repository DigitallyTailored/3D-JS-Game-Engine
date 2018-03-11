//main helper functions

//QUICK ARRAY STUFF
function contains(a, obj) {
    obj = obj.toLowerCase();
    var arrayLength = a.length;
    for (var i = 0; i < arrayLength; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

function add(a, obj) {
    obj = obj.toLowerCase();
    var arrayLength = a.length;
    for (var i = 0; i < arrayLength; i++) {
        if (a[i] == obj) {
            return a;
        }
    }
    a.push(obj);
    return a;
}

function remove(a, obj) {
    obj = obj.toLowerCase();
    var arrayLength = a.length;
    for (var i = 0; i < arrayLength; i++) {
        if (a[i] == obj) {
            a.splice(i, 1);
            return a;
        }
    }
    return a;
}

function arrayPick(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function dif(num1, num2) {
    if (num1 > num2) {
        return num1 - num2;
    } else {
        return num2 - num1;
    }
}

function rndBetween(a, b) {
    return Math.floor(Math.random() * b) + a;
}

function uNum() { //returns a unique number each call
    uNumCurrent++;
    return uNumCurrent;
}

function log(msg) {
    guiLog.innerHTML = msg;
}

function degToRad(deg) {
    return deg * (Math.PI / 180)

}

function radToDeg(rad) {
    return rad * (180 / Math.PI);
}

function isEven(n) {
    return n % 2 == 0;
}

function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

//for debugging!
function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
