'use strict';

function createLevel(xSize, ySize) {

    //var maze = makeMaze(xSize, ySize);
    var levelMaze = makeMaze(xSize, ySize);

    console.log("level is:");
    console.log(levelMaze);
    loadMaze(levelMaze);

}

function makeMaze(mazeWidth, mazeHeight) {
    if (isEven(mazeWidth)) {
        mazeWidth = mazeWidth + mazeWidth;
    }
    if (isEven(mazeHeight)) {
        mazeHeight = mazeHeight + mazeHeight;
    }
    var maze = [];
    var moves = [];
    var endFound = false;
    for (var i = 0; i < mazeHeight; i++) {
        maze[i] = [];
        for (var j = 0; j < mazeWidth; j++) {
            maze[i][j] = "#";
        }
    }

    //set start position
    var posX = 1;
    var posY = 1;
    maze[posX][posY] = "S";

    moves.push(posY + posY * mazeWidth);

    while (moves.length) {

        //find out which directions are available
        var possibleDirections = "";
        if (posX + 2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == "#") {
            possibleDirections += "S";
        }
        if (posX - 2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == "#") {
            possibleDirections += "N";
        }
        if (posY - 2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == "#") {
            possibleDirections += "W";
        }
        if (posY + 2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == "#") {
            possibleDirections += "E";
        }

        //if more than 0 directions available
        if (possibleDirections) {
            var move = rndBetween(0, possibleDirections.length);
            switch (possibleDirections[move]) {
                case "N":
                    maze[posX - 2][posY] = " ";
                    maze[posX - 1][posY] = " ";
                    posX -= 2;
                    break;
                case "S":
                    maze[posX + 2][posY] = " ";
                    maze[posX + 1][posY] = " ";
                    posX += 2;
                    break;
                case "W":
                    maze[posX][posY - 2] = " ";
                    maze[posX][posY - 1] = " ";
                    posY -= 2;
                    break;
                case "E":
                    maze[posX][posY + 2] = " ";
                    maze[posX][posY + 1] = " ";
                    posY += 2;
                    break;
            }
            moves.push(posY + posX * mazeWidth);
        } else {
            //if no directions available
            //reached end of current, make end if not already set
            if (endFound == false) {
                maze[posX][posY] = "E";
                endFound = true;
            }

            var back = moves.pop();
            posX = Math.floor(back / mazeWidth);
            posY = back % mazeWidth;
        }
    }

    return maze;

}

function loadMaze(maze) {
    var consoleOut = "";
    var entity;
    var posX;
    var posY;
    var blockSize = 1;
    for (var i = 0; i < maze.length; i++) {
        var mazeRow = maze[i];
        for (var j = 0; j < mazeRow.length; j++) {
            //console.log("maze[" + i + "][" + j + "] = " + mazeRow[j]);
            posX = (j * blockSize);
            posY = (i * blockSize);

            consoleOut += mazeRow[j]

            //load block depending on grid type
            switch (mazeRow[j]) {
                case " ":
                    //FLOOR or water
                    if (rndBetween(0, 6) == 1) {
                        entity = new Entity();
                        entity.object = makeCube(blockSize);
                        positionObject(entity.object, posX, -1, posY);
                        textureObject(entity.object, "media/texture/water-lores.jpg");
                        entities.push(entity);
                    } else {
                        entity = new Entity();
                        entity.object = makeCube(blockSize);
                        positionObject(entity.object, posX, -0.8, posY);
                        textureObject(entity.object, "media/texture/grass-lores.jpg");
                        entities.push(entity);
                    }

                    //place items
                    if (rndBetween(0, 4) == 1) {
                        entity = new Entity();
                        entity.tag = COIN;
                        entity.object = newObject("media/object/item/gem-" + arrayPick([
                            "red",
                            "green",
                            "blue",
                            "purple"
                        ]) + ".json");
                        positionObject(entity.object, posX, 0.2, posY);
                        entities.push(entity);
                    }
                    break;
                case "#":
                    entity = new Entity();
                    //entity.object = makeCube(blockSize);
                    //entity.object = newObject("media/object/blender/export/wall.json");
                    entity.object = newObject("media/object/tree/tree4.json");
                    positionObject(entity.object, posX, -0.4, posY);
                    entity.object.rotateY(rndBetween(1, 360))
                    entity.collision = true;
                    entity.size = 0.7;
                    entities.push(entity);

                    entity = new Entity();
                    entity.object = makeCube(blockSize);
                    positionObject(entity.object, posX, -0.8, posY);
                    textureObject(entity.object, "media/texture/grass-lores.jpg");
                    entities.push(entity);

                    break;
                case "S":
                    //start position
                    entity = new Entity();
                    entity.object = makeCube(blockSize);
                    positionObject(entity.object, posX, -0.8, posY);
                    textureObject(entity.object, "media/texture/grass-lores.jpg");
                    entities.push(entity);

                    //create and place player

                    player.object = newObject("media/object/elf/model.json");
                    positionObject(player.object, posX, -0.3, posY);
                    player.speed = 0.05;
                    player.size = 0.75;
                    cameraFollowObject(player.object);

                    console.log("player is: ");
                    console.log(player.object);
                    break;
                case "E":
                    entity = new Entity();
                    entity.tag = END;
                    entity.object = newObject("media/object/blender/tower/tower1.json");
                    //positionObject(entity.object, posX, -0.4, posY);
                    positionObject(entity.object, posX, -1.4, posY);
                    entity.collision = false;
                    entities.push(entity);
                    break;
                default:

            }

        }
        console.log(consoleOut);
        consoleOut = "";
    }
    /*
        for (var x = 0; x < xSize; x++) {
            for (var y = 0; y < ySize; y++) {
                currentSection = maze[x][y];
                entity = new Entity();
            }
        }
        */
}

function unloadMaze() {
    removeAllObjects();
    entities = [];
}
