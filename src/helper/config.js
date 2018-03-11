'use strict';

// global vars
var view;
var stats;
var uiWindow;

var widthFull;
var midWidth;
var heightFull;
var midHeight;

// helper config
var camera, scene, renderer;

//objects
var staticOBject = 0;
var mesh;
var objects = [];
var entities = [];

var lights = [];

var uNumCurrent = 0;

// resources will be an object as using strings to find and set values
var targetResource = [];
var resource = [];

// input listen prep
var mouseX = 0,
    mouseY = 0,
    mouseMoveX = 0,
    mouseMoveY = 0,
    mouseDown = false;

//var touchArea = "";
var touchDown;
var touchStartX;
var touchStartY;
var touchRad = 0;
var touchAngle = 0;
var touchDistance;
var touchThreshold = 10;
var keyDown = [];

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
