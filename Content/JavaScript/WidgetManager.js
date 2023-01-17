"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const CurrentWidget_1 = require("./CurrentWidget");
//let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld() as UE.World;
class Widget_Manager extends UE.Object {
    constructor() {
        super(...arguments);
        this.widgetMap = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
        this.currentUIMap = UE.NewMap(UE.BuiltinString, UE.UserWidget);
        //this.currentUIMap as UE.TMap<string,UE.UserWidget>;
        this.widgetMap.Add("login", "/Game/Blueprints/WBP_Login.WBP_Login_C");
        this.widgetMap.Add("userInfo", "/Game/Blueprints/WBP_UserInfo.WBP_UserInfo_C");
        this.widgetMap.Add("Bag", "/Game/Blueprints/UMG/WBP_Inventory.WBP_Inventory_C");
    }
    InitWidget(world, UIName, isDestroy = false) {
        if (!this.CheckWidget(UIName)) {
            return null;
        }
        //let path ="/Game/Blueprints/WBP_Login.WBP_Login_C";
        let path = this.widgetMap.Get(UIName);
        console.log(path);
        if (path == "") {
            return null;
        }
        let widgetClass = UE.Class.Load(path);
        let UI = UE.UMGManager.CreateWidget(world, widgetClass);
        if (UI.GetClass() == undefined) {
            console.log("undified");
        }
        else if (UI == null) {
            console.log("null");
        }
        this.currentUIMap.Add(UIName, UI);
        return UI;
    }
    CheckWidget(UIName) {
        if (this.widgetMap.GetRef(UIName) != undefined && this.widgetMap.GetRef(UIName) != null) {
            return true;
        }
        return false;
    }
    OpenWidget(world, UIName) {
        let widget = null;
        if (this.currentUIMap.GetRef(UIName) == undefined) {
            widget = this.InitWidget(world, UIName);
            if (widget) {
                widget.AddToViewport(0);
                var obj = new CurrentWidget_1.default();
                obj.widgetName = UIName;
                obj.widgetObj = widget;
                this.currentWidget = obj;
            }
        }
        else {
            this.currentUIMap[UIName].SetVisibility(UE.ESlateVisibility.Visible);
            var obj = new CurrentWidget_1.default();
            obj.widgetName = UIName;
            obj.widgetObj = this.currentUIMap[UIName];
            this.currentWidget = obj;
        }
        return this.currentWidget.widgetObj;
    }
    CloseWidget(UIName, destory = false) {
        let widget = null;
        if (this.currentUIMap.Get(UIName) != null || this.widgetMap.Get(UIName) == undefined) {
            widget = this.currentUIMap.Get(UIName);
        }
        if (widget == null)
            return false;
        if (!destory) {
            widget.SetVisibility(UE.ESlateVisibility.Hidden);
            var obj = new CurrentWidget_1.default();
            this.currentWidget = obj;
        }
        else {
            widget.RemoveFromViewport();
            this.currentUIMap[UIName] = null;
            var obj = new CurrentWidget_1.default();
            this.currentWidget = obj;
        }
        return true;
    }
    GetWidget(UIName) {
        let widget = null;
        if (this.currentUIMap.Get(UIName) != undefined || this.currentUIMap.Get(UIName) != null) {
            widget = this.currentUIMap.Get(UIName);
        }
        return widget;
    }
}
exports.default = Widget_Manager;
//# sourceMappingURL=WidgetManager.js.map