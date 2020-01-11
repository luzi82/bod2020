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
        testBody: {
            default: null,
            type: cc.RigidBody,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.keyLeftDown = false;
        this.keyRightDown = false;

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags =
            cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.director.getPhysicsManager().on('before-step', this.onBeforStep, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.director.getPhysicsManager().off('before-step', this.onBeforStep, this);
    },

    start () {

    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:{
                this.keyLeftDown = true;
                break;
            }
            case cc.macro.KEY.right:{
                this.keyRightDown = true;
                break;
            }
        }
    },
    
    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:{
                this.keyLeftDown = false;
                break;
            }
            case cc.macro.KEY.right:{
                this.keyRightDown = false;
                break;
            }
        }
    },

    onBeforStep: function() {
        var torque = 0;
        if(this.keyLeftDown){
            torque += 400;
        }
        if(this.keyRightDown){
            torque -= 400;
        }
        if(torque!=0){
            this.testBody.applyAngularImpulse (torque);
        }
    },

    update (dt) {},
});
