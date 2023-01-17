import * as UE from 'ue'
import CurrentWidget from './CurrentWidget';
import {$ref, $unref, $set, argv, on, toManualReleaseDelegate, releaseManualReleaseDelegate, blueprint, off} from 'puerts';

//let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld() as UE.World;

class Widget_Manager extends UE.Object{

    widgetMap:UE.TMap<string,string>;
    currentUIMap:UE.TMap<string,UE.UserWidget>;
    currentWidget : CurrentWidget;

    constructor(){
        super(...arguments);
        this.widgetMap = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
        this.currentUIMap = UE.NewMap(UE.BuiltinString,UE.UserWidget);
        //this.currentUIMap as UE.TMap<string,UE.UserWidget>;
        this.widgetMap.Add("login","/Game/Blueprints/WBP_Login.WBP_Login_C");
        this.widgetMap.Add("userInfo","/Game/Blueprints/WBP_UserInfo.WBP_UserInfo_C");
        this.widgetMap.Add("Bag","/Game/Blueprints/UMG/WBP_Inventory.WBP_Inventory_C");
    }
 
    InitWidget(world:UE.World,UIName:string,isDestroy:boolean = false):UE.UserWidget{

        if(!this.CheckWidget(UIName)){
            return null;
        }
        //let path ="/Game/Blueprints/WBP_Login.WBP_Login_C";
        let path = this.widgetMap.Get(UIName);
        console.log(path);
        if(path==""){
            return null;
        }
        let widgetClass = UE.Class.Load(path);
        let UI = UE.UMGManager.CreateWidget(world,widgetClass) as UE.UserWidget; 
        
        if(UI.GetClass() == undefined){
            console.log("undified")
        }
        else if(UI == null){
            console.log("null")
        }

        this.currentUIMap.Add(UIName,UI as UE.UserWidget);

        return UI;

    }

    CheckWidget(UIName:string):boolean{
        if(this.widgetMap.GetRef(UIName)!= undefined && this.widgetMap.GetRef(UIName)!=  null ){
            return true;
        }
        return false;
    }

    OpenWidget(world:UE.World,UIName:string):UE.UserWidget{
        
        let widget:UE.UserWidget =null;
        if( this.currentUIMap.GetRef(UIName) == undefined){
            widget = this.InitWidget(world,UIName);
            if(widget){
                widget.AddToViewport(0);
                var obj = new CurrentWidget();
                obj.widgetName = UIName;
                obj.widgetObj = widget;
                this.currentWidget = obj;
            }
        }
        else{  
            this.currentUIMap[UIName].SetVisibility(UE.ESlateVisibility.Visible);
            var obj = new CurrentWidget();
            obj.widgetName = UIName;
            obj.widgetObj = this.currentUIMap[UIName];
            this.currentWidget = obj;
        }
        return this.currentWidget.widgetObj;
    }

    CloseWidget(UIName:string,destory:boolean = false):boolean{
        let widget:UE.UserWidget = null;
        if(this.currentUIMap.Get(UIName)!=null|| this.widgetMap.Get(UIName)== undefined){
            widget = this.currentUIMap.Get(UIName);
        }
        if(widget == null) return false;
        if(!destory){
            widget.SetVisibility(UE.ESlateVisibility.Hidden);
            var obj = new CurrentWidget();
            this.currentWidget = obj;
        }
        else{
            widget.RemoveFromViewport();
            this.currentUIMap[UIName] = null;

            var obj = new CurrentWidget();
            this.currentWidget = obj;
        }
        return true;
    }

    GetWidget(UIName:string):UE.UserWidget{
        let widget:UE.UserWidget = null;
        if(this.currentUIMap.Get(UIName)!= undefined ||this.currentUIMap.Get(UIName)!= null){
            widget = this.currentUIMap.Get(UIName);
        }
        return widget;
    }

    /*
    CreateWidget(world:UE.World,UIName:string):UE.UserWidget{
        let widget:UE.UserWidget = null;
        if(UIName == ""){
            return widget;
        }
        widget = this.InitWidget(world,UIName);
        if(widget){
            widget.AddToViewport(0);
        }
        return widget;
    }
    */

}

export default Widget_Manager;