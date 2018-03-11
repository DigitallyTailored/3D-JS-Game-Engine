'use strict';

function initInput() {
    // set events for input
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('touchstart', onDocumentTouchDown, false);
    document.addEventListener('touchend', onDocumentTouchUp, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}

function onDocumentMouseMove(event) {
    mouseMoveX -= event.movementX;
    mouseMoveY -= event.movementY;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onDocumentMouseDown(event) {
    mouseDown = true;
}

function onDocumentMouseUp(event) {
    mouseDown = false;
}

function onDocumentTouchUp(event) {
    //mouseDown = false;
    touchDown = false;
}

function onDocumentTouchDown(event) {
    var touches = event.changedTouches;
    touchStartX = touches[0].clientX;
    touchStartY = touches[0].clientY;
    touchDown = true;
    //updateTouches(event);
}

function onDocumentTouchMove(event) {
    updateTouches(event);
}

function updateTouches(event) {
    var touches = event.changedTouches;
    //console.log(touches[0].clientX);
    var offsetX = touchStartX - touches[0].clientX;
    var offsetY = touchStartY - touches[0].clientY;

    touchRad = Math.atan2(offsetY, offsetX); // In radians
    touchAngle = radToDeg(touchRad);

    var dx = touches[0].clientX - touchStartX;
    var dy = touches[0].clientY - touchStartY;
    touchDistance = Math.sqrt(dx * dx + dy * dy);

    //console.log(Math.floor(touchAngle) + " - " + Math.floor(touchDistance));

}

/*
function onDocumentTouchUp(event) {
    //mouseDown = false;
    touchArea = "";
}

function onDocumentTouchDown(event) {
    updateTouches(event);
}

function onDocumentTouchMove(event) {
    updateTouches(event);
}

function updateTouches(event) {
    var touches = event.changedTouches;
    var offsetX = touches[0].clientX - midWidth;
    var offsetY = touches[0].clientY - midHeight;

    if (Math.abs(offsetX) > Math.abs(offsetY)) {
        //touching left or right
        if (offsetX > 0) {
            touchArea = "right";
        } else {
            touchArea = "left";
        }
    } else {
        //touching up or down
        if (offsetY > 0) {
            touchArea = "down";
        } else {
            touchArea = "up";
        }
    }
}
*/

function onDocumentKeyDown(event) {
    keyDown[event.key.toLowerCase()] = true;
}

function onDocumentKeyUp(event) {
    keyDown[event.key.toLowerCase()] = false;
}

function getMouseX() {
    var f_result = mouseMoveX;
    mouseMoveX = 0;
    return f_result;
}

function getMouseY() {
    var f_result = mouseMoveY;
    mouseMoveY = 0;
    return f_result;
}
