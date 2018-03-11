//used for all objects
class Entity {
    constructor() {
        this.active = true;
        this.obj = null;
        this.size = 0;
        this.render = null;
        this.Collision = false;
        this.tag = null;
    }

    get collision() {
        return this.Collision;
    }
    set collision(status) {
        this.Collision = status;
    }

    get object() {
        return this.obj;
    }

    set object(obj) {
        this.obj = obj;
        this.size = objectSize(obj);
    }

}

//setup class for characters
class Character {
    constructor() {
        this.name = null;
        this.obj = null;
        this.size = 0;
        this.speed = 0; //0.03 is good
        this.oldX = 0;
        this.oldY = 0;
        this.oldZ = 0;
        this.newX = 0;
        this.newY = 0;
        this.newZ = 0;
    }

    get object() {
        return this.obj;
    }

    set object(obj) {
        this.obj = obj;
        this.size = objectSize(obj);
    }
}
