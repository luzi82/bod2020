// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var WheelW = require("WheelW");
var WheelE = require("WheelE");

var BikeDirection = cc.Enum({
    EAST: 1,
    WEST: 2,
});

var MOTOR_SPEED = 500;
var ROTATE_TORQUE = 10000;

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        body: {
            default: null,
            type: cc.RigidBody,
        },
        wheelJointW: {
            default: null,
            type: WheelW,
        },
        wheelJointE: {
            default: null,
            type: WheelE,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.keyUpDown = false;
        this.keyDownDown = false;
        this.keyLeftDown = false;
        this.keyRightDown = false;

        this.spaceUp = true;
        this.direction = BikeDirection.EAST;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.director.getPhysicsManager().on('before-step', this.onBeforStep, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.director.getPhysicsManager().off('before-step', this.onBeforStep, this);
    },

    onKeyDown: function (event) {
        //cc.log("onKeyDown");
        switch(event.keyCode) {
            case cc.macro.KEY.up:{
                this.keyUpDown = true;
                break;
            }
            case cc.macro.KEY.down:{
                // this.getActiveWheel().enableMotor = true;
                this.keyDownDown = true;
                break;
            }
            case cc.macro.KEY.left:{
                this.keyLeftDown = true;
                break;
            }
            case cc.macro.KEY.right:{
                this.keyRightDown = true;
                break;
            }
            case cc.macro.KEY.space:{
                if(this.spaceUp){
                    this.spaceUp = false;
                    this.direction = this.getOppositeDirect(this.direction);
                }
                break;
            }
        }
    },

    onKeyUp: function (event) {
        //cc.log("onKeyUp");
        switch(event.keyCode) {
            case cc.macro.KEY.up:{
                this.keyUpDown = false;
                break;
            }
            case cc.macro.KEY.down:{
                this.keyDownDown = false;
                break;
            }
            case cc.macro.KEY.left:{
                this.keyLeftDown = false;
                break;
            }
            case cc.macro.KEY.right:{
                this.keyRightDown = false;
                break;
            }
//            case cc.macro.KEY.down:{
//                //this.getActiveWheel().maxMotorTorque = 1000;
//                this.getActiveWheel().enableMotor = false;
//                this.getActiveWheel().motorSpeed = 500;
//                break;
//            }
            case cc.macro.KEY.space:{
                this.spaceUp = true;
                break;
            }
        }
    },

    start () {
    },

    update (dt) {},

    onBeforStep: function() {
        // speed
        var frontWheel = null;
        var backWheel = null;
        var motorSpeed = 0;
        if (this.direction == BikeDirection.EAST) {
            frontWheel = this.wheelJointE;
            backWheel = this.wheelJointW;
            motorSpeed = -MOTOR_SPEED;
        } else if (this.direction == BikeDirection.WEST) {
            frontWheel = this.wheelJointW;
            backWheel = this.wheelJointE;
            motorSpeed = MOTOR_SPEED;
        }
        if ((!this.keyUpDown)&&(!this.keyDownDown)) {
            frontWheel.enableMotor = false;
            backWheel.enableMotor = false;
        } else if ((!this.keyUpDown)&&( this.keyDownDown)) {
            frontWheel.enableMotor = true;
            frontWheel.motorSpeed = 0;
            backWheel.enableMotor = true;
            backWheel.motorSpeed = 0;
        } else if (( this.keyUpDown)&&(!this.keyDownDown)) {
            frontWheel.enableMotor = true;
            frontWheel.motorSpeed = motorSpeed;
            backWheel.enableMotor = false;
        } else if (( this.keyUpDown)&&( this.keyDownDown)) {
            frontWheel.enableMotor = true;
            frontWheel.motorSpeed = motorSpeed;
            backWheel.enableMotor = true;
            backWheel.motorSpeed = 0;
        }
    
        // torque
        var torque = 0;
        if(this.keyLeftDown){
            torque += ROTATE_TORQUE;
        }
        if(this.keyRightDown){
            torque -= ROTATE_TORQUE;
        }
        if(torque!=0){
            this.body.applyAngularImpulse (torque);
        }
    },

    getActiveWheel () {
        if (this.direction == BikeDirection.EAST){
            return this.wheelJointW;
        }
        if (this.direction == BikeDirection.WEST){
            return this.wheelJointE;
        }
        return null;
    },

    getOppositeDirect(d) {
        if (d == BikeDirection.EAST){
            return BikeDirection.WEST;
        }
        if (d == BikeDirection.WEST){
            return BikeDirection.EAST;
        }
        return null;
    },

});
