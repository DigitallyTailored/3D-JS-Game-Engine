'use strict';

function init() {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20);
    camera.eulerOrder = "YXZ";
    camera.position.z = 500;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setClearColor(0x99bce4);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    view = document.getElementById('container');
    //view.style.width = '100%';
    //view.style.height = '99%';
    view.innerHTML = "";
    view.appendChild(renderer.domElement);

    uiWindow = document.createElement("div");
    uiWindow.id = "ui-window";
    view.appendChild(uiWindow);

    widthFull = view.offsetWidth;
    midWidth = widthFull / 2;
    heightFull = view.offsetHeight;
    midHeight = heightFull / 2;

    //stats
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    initInput();

}
