"use strict";

//Prepare helpers
init();

// Add each resource to be loaded

targetLaunch(menuMain);

function menuMain() {
    UILoad('gui/menu/main.html', 'gui/menu/main.js');
}

function levelLoading() { //Called before level setup to pre-load resources
    //could put game state checks here for loading only required resources
    UIReset();
    UILoad('gui/hud/main.html')
    //adShow();

    //Player
    prepareResource("media/object/elf/model.json");

    //items
    prepareResource("media/object/item/gem-red.json");
    prepareResource("media/object/item/gem-green.json");
    prepareResource("media/object/item/gem-blue.json");
    prepareResource("media/object/item/gem-purple.json");

    //Level objects
    prepareResource("media/object/blender/export/wall.json");
    prepareResource("media/object/blender/tower/tower1.json");
    prepareResource("media/object/tree/tree4.json");
    prepareResource("media/object/blender/dae/test.dae");

    targetLaunch(levelSetup);

}

function levelSetup() { //Called once all resources are loaded

    console.log(resource); //List all loaded resources

    // lights
    console.log("creating lights");

    //Ambient light
    lights[0] = new THREE.AmbientLight(0x3a4c55, 1, 0);
    lights[0].position.set(0, 20, 0);
    scene.add(lights[0]);

    //Sun
    //lights[1] = new THREE.PointLight(0xf5c51d, 1, 50);
    //scene.add(lights[1]);

    //player torch
    lights[2] = new THREE.PointLight(0xfea92e, 1, 5);
    scene.add(lights[2]);

    scene.fog = new THREE.Fog(0xffffff, 1, 50);

    //create level
    console.log("level is: ");
    nextLevel()

    //adHide();
    // Main loop
    mainLoop();

}

function nextLevel() {
    levelNumber = levelNumber + 1;
    UIIDvalue('level-counter', levelNumber)
    unloadMaze();
    createLevel((levelNumber * 2) + 15, (levelNumber * 2) + 15);
}

// Handle main loop
function mainLoop() {
    requestAnimationFrame(mainLoop);
    // Logic
    controlCharacter(player);

    pushCharacter(player, 0.5);
    lights[2].position.set(player.object.position.x, player.object.position.y + 1.1, player.object.position.z);
    pushCharacter(player, -0.5);

    // Camera
    //freeCam();
    cameraFollowCharacter(player);

    //For next project replace this entity handling with an event system
    //attaching classes to entities and npcs which will work out the events itself

    //entities
    for (var id in entities) {
        //Entity logic
        if (entities[id].active == true) {
            switch (entities[id].tag) { //
                case END:
                    if (objects2DCollisionDefined(player.object, 0.7, entities[id].object, 0.5)) {
                        entities[id].active = false;
                        targetLaunch(nextLevel);
                    }
                    break;
                case COIN:
                    //
                    entities[id].object.rotateY(0.01);
                    //Touching the player
                    if (objectsBoxCollisionDefined(player.object, 0.7, entities[id].object, 0.5)) {
                        entities[id].object.position.y = -10;
                        entities[id].active = false;
                        //use a character stat instead? or inventory?
                        gemCount = gemCount + 1;
                        UIIDvalue('gem-counter', gemCount);
                    }
                    break;
                default:

            }
        }

        //entity states

    }

    renderer.render(scene, camera);
    stats.update();
}
