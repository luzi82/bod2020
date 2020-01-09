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
        this.spaceUp = true;
        this.direction = BikeDirection.EAST;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        //cc.log("onKeyDown");
        switch(event.keyCode) {
            case cc.macro.KEY.up:{
                this.getActiveWheel().enableMotor = true;
                break;
            }
//            case cc.macro.KEY.down:{
//                //cc.log("asdf");
//                //this.getActiveWheel().maxMotorTorque = 0;
//                this.getActiveWheel().enableMotor = true;
//                this.getActiveWheel().motorSpeed = 0;
//                break;
//            }
            case cc.macro.KEY.space:{
                if(this.spaceUp){
                    this.spaceUp = false;
                    var oldEnableMotor = this.getActiveWheel().enableMotor;
                    //var oldMaxMotorTorque = this.getActiveWheel().maxMotorTorque;
                    this.getActiveWheel().enableMotor = false;
                    //this.getActiveWheel().maxMotorTorque = 1000;
                    this.direction = this.getOppositeDirect(this.direction);
                    this.getActiveWheel().enableMotor = oldEnableMotor;
                    //this.getActiveWheel().enableMotor = oldMaxMotorTorque;
                }
                break;
            }
        }
    },

    onKeyUp: function (event) {
        //cc.log("onKeyUp");
        switch(event.keyCode) {
            case cc.macro.KEY.up:{
                this.getActiveWheel().enableMotor = false;
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
