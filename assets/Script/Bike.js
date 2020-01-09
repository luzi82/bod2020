// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
            type: cc.WheelJoint,
        },
        wheelJointE: {
            default: null,
            type: cc.WheelJoint,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.keyUp = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        cc.log("onKeyDown");
        switch(event.keyCode) {
            case cc.macro.KEY.up:{
                //cc.log("cc.macro.KEY.up "+this.wheelJointW.motorSpeed);
                cc.log("cc.macro.KEY.up "+this.wheelJointW.enableMotor);
                this.wheelJointW.enableMotor = true;
                cc.log("cc.macro.KEY.up "+this.wheelJointW.enableMotor);
                break;
            }
        }
    },

    onKeyUp: function (event) {
        cc.log("onKeyUp");
        switch(event.keyCode) {
            case cc.macro.KEY.up:{
                this.wheelJointW.enableMotor = false;
                break;
            }
        }
    },

    start () {
    },

    update (dt) {},
});
