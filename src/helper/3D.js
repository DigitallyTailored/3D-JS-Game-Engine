'use strict';

function newObject(sourceFile) {
    //var obj = new THREE.Mesh(resource[sourceFile]);
    var obj = resource[sourceFile].clone();
    sceneAdd(obj);
    return obj;
}

function makeCube(size) {

    var obj = new THREE.Mesh(new THREE.CubeGeometry(size, size, size),
        new THREE.MeshNormalMaterial());

    sceneAdd(obj);
    return obj;
}

function makeWall(xSize, ySize, zSize) {

    var obj = new THREE.Mesh(new THREE.CubeGeometry(xSize, ySize, zSize),
        new THREE.MeshNormalMaterial());

    sceneAdd(obj);
    return obj;
}

function handleLoadedObject(geometry, materials) {
    var material = new THREE.MultiMaterial(materials);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    addResource("object/testobj.json", mesh);
}

function textureObject(object, textureFile, bumpmapFile = null) {

    var materialRef = resource[textureFile];

    // check if resource already exists
    if (typeof materialRef != "undefined") {
        material = materialRef;
        // bumpmap is already applied to material if it exists so can forget
        // about checking that
    } else {

        // load new resource
        var texture = new THREE.TextureLoader().load(textureFile);
        texture.anisotropy = renderer.getMaxAnisotropy();
        if (bumpmapFile != null) {

            bumpMaterialRef = resource[bumpmapFile];
            var bumpMaterialRef = new THREE.TextureLoader().load(bumpmapFile);

            var material = new THREE.MeshPhongMaterial({
                map: texture,
                shininess: 20,
                bumpMap: bumpMaterialRef,
                bumpScale: 1,
            });

        } else {
            var material = new THREE.MeshPhongMaterial({
                map: texture
            });
        }
        resource[textureFile] = material;
    }

    // use material
    object.material = material;

}

function positionEntity(ent, x, y, z) {
    positionObject(ent.object, x, y, z)
}

function positionObject(object, x, y, z) {
    object.position.x = x;
    object.position.y = y;
    object.position.z = z;
}

function sceneAdd(obj) {
    // add to main scene for now but can be extended later
    objects.push(obj);
    scene.add(obj);
}

function staticObject(obj) {
    if (staticOBject == 0) {
        staticOBject = obj;
    } else {
        //THREE.GeometryUtils.merge(staticOBject, obj);
    }
}

// remove all loaded objects
function removeAllObjects() {
    var arrayLength = objects.length;
    for (var i = 0; i < arrayLength; i++) {
        scene.remove(objects[i]);
    }

    objects = [];

}

function objectSize(obj) {
    var box = new THREE.Box3().setFromObject(obj);
    return (dif(box.min.x, box.max.x) + dif(box.min.y, box.max.y) + dif(box.min.z, box.max.z)) / 3;
}

function characterEntityCollision(character) {
    for (var id in entities) {
        if (entities[id].collision == true) {
            if (objectsBoxCollisionDefined(character.object, character.size, entities[id].object, entities[id].size)) {
                return true;
            }
        }
    }
    return false;
}

function objects2DCollision(obj1, obj2) {
    return objects2DCollisionDefined(obj1, obj1.size, obj2, obj2.size);
}

function objects2DCollisionDefined(obj1, size1, obj2, size2) {
    size1 = size1 / 2;
    size2 = size2 / 2;
    if ((obj1.position.x - size1) < (obj2.position.x + size2)) {
        if ((obj1.position.x + size1) > (obj2.position.x - size2)) {
            if ((obj1.position.z - size1) < (obj2.position.z + size2)) {
                if ((obj1.position.z + size1) > (obj2.position.z - size2)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function objectsBoxCollision(obj1, obj2) {
    return objectsBoxCollisionDefined(obj1, obj1.size, obj2, obj2.size);
}

function objectsBoxCollisionDefined(obj1, size1, obj2, size2) {
    size1 = size1 / 2;
    size2 = size2 / 2;
    if ((obj1.position.x - size1) < (obj2.position.x + size2)) {
        if ((obj1.position.x + size1) > (obj2.position.x - size2)) {
            if ((obj1.position.z - size1) < (obj2.position.z + size2)) {
                if ((obj1.position.z + size1) > (obj2.position.z - size2)) {
                    if ((obj1.position.y - size1) < (obj2.position.y + size2)) {
                        if ((obj1.position.y + size1) > (obj2.position.y - size2)) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}

// *****************************************************************************************************************************************
// CONTROL
// CONTROL
// CONTROL
// *****************************************************************************************************************************************

// use input to do stuffs
function pushCharacter(character, distance) {
    character.object.translateZ(distance);
}

function controlCharacter(character) {
    character.oldX = character.object.position.x;
    character.oldZ = character.object.position.z;
    controlObject(character.object, character.speed);
    character.newX = character.object.position.x;
    character.newZ = character.object.position.z;
    character.object.position.z = character.oldZ;
    //test new X collision first
    if (characterEntityCollision(character)) {
        character.object.position.x = character.oldX;
    }

    character.object.position.z = character.newZ;
    if (characterEntityCollision(character)) {
        character.object.position.z = character.oldZ;
    }
}

function controlObject(obj, speed) {
    if (keyDown["shift"] == true) {
        console.log(keyDown);
        speed = speed * 2;
    }
    /*
        if (keyDown["w"] == true) {
            obj.translateZ(speed);
        }

        if (keyDown["s"] == true) {
            obj.translateZ(-speed);
        }

        if (keyDown["a"] == true) {
            obj.rotateY(0.1);
        }

        if (keyDown["d"] == true) {
            obj.rotateY(-0.1);
        }
    */

    var initRotation = 0;
    if (keyDown["w"] == true) {
        obj.rotation.y = initRotation + 0;
        obj.translateZ(speed);
    }

    if (keyDown["s"] == true) {
        obj.rotation.y = initRotation + degToRad(180);
        obj.translateZ(speed);
    }

    if (keyDown["a"] == true) {
        obj.rotation.y = initRotation + degToRad(90);
        obj.translateZ(speed);
    }

    if (keyDown["d"] == true) {
        obj.rotation.y = initRotation + degToRad(270);
        obj.translateZ(speed);
    }

    //touch input; maybe feed these touch directions to default keys? like arrows keys?? Think about this..
    //console.log(Math.floor(touchAngle) + " - " + Math.floor(touchDistance));
    if (touchDown == true) {
        obj.rotation.y = -touchRad + 90;
        obj.translateZ(speed);
    }
}

function cameraFollowCharacter(character) {
    cameraFollowObject(character.object);
}

function cameraFollowObject(obj) {
    var distance = 3;
    camera.position.x = obj.position.x;
    camera.position.y = (obj.position.y + (distance * 2));
    camera.position.z = (obj.position.z - distance);
    camera.lookAt(obj.position);
}

function freeCam() {

    var oldX = camera.rotation.x;
    camera.rotation.x = 0;
    camera.rotateY(0.001 * getMouseX());
    camera.rotation.x = oldX;
    camera.rotateX(0.001 * getMouseY());

    var speed = 0.2;
    if (keyDown["shift"]) {
        speed = speed * 2;
    }

    if (mouseDown || keyDown["w"]) {
        camera.translateZ(-speed);
    }

    if (keyDown["s"]) {
        camera.translateZ(speed);
    }

    if (keyDown["a"]) {
        camera.translateX(-speed);
    }

    if (keyDown["d"]) {
        camera.translateX(speed);
    }

}
