'use strict';

function targetLaunch(target) {
    console.log("launching: " + target.toString().split('\n')[0]);
    loadResources(target);
}

function prepareResource(resource, resourceHandler) {
    targetResource.push([resource, resourceHandler]);
}

function loadResources(target) {
    if (targetResource.length > 0) {
        //console.log("loading: " + targetResource[0]);

        var fileName = targetResource[0][0];
        var fileHandler = targetResource[0][1];
        var fileExtension = fileName.split('.').pop();
        console.log("loading: '" + fileName + "' - " + fileExtension + " - '" + fileHandler + "' handler");
        if (typeof fileHandler !== 'undefined') {
            //prepare loader based on specified handler
            fileHandler = fileHandler.toLowerCase();
            switch (fileHandler) {
                case "jsonloader":
                    var loader = new THREE.JSONLoader();
                    break;
                default:
                    var loader = new THREE.ObjectLoader();
            }
        } else {
            //prepare loader based on file extension
            fileExtension = fileExtension.toLowerCase();
            switch (fileExtension) {
                case "dae":
                    var loader = new THREE.ColladaLoader();
                    break;
                default:
                    var loader = new THREE.ObjectLoader();
            }
        }

        loader.load(
            fileName,

            function(obj) { //work out what object is and save as resource
                console.log("loaded: " + fileName);

                switch (fileExtension) {
                    case "dae":
                        addResource(fileName, obj.scene);
                        break;
                    default:
                        addResource(fileName, obj)
                }

                targetResource.shift();
                if (targetResource.length > 0) { //load next item if there is one
                    loadResources(target);
                } else { //loaded everything, we're out!
                    targetResource = [];
                    target();
                }
            },
            function(xhr) { //progress
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(xhr) { //error
                console.error('An error happened:');
                console.error(xhr);
            }
        );
    } else {
        target();
    }
}

function addResource(resourceName, resourceRef) {
    console.log("adding resouce: " + resourceName);
    console.log(resourceRef);
    resource[resourceName] = resourceRef;
}
