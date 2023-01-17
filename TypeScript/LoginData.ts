import * as UE from 'ue'

class LoginData extends UE.Object{

    static usersInfo = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
    static dataLength:number 

    constructor( ) { 
        super(...arguments);
        LoginData.dataLength = 0; 
    }

    static CheckID(inputID:string):boolean{
        if(this.usersInfo.Get(inputID)!=undefined && this.usersInfo.Get(inputID)!=null ){
            return true;
        }
        return false;      
    }
    static LoginTest(inputID:string,inputPW:string):boolean{
  
        if(this.usersInfo.Get(inputID)==inputPW){
            return true;
        }
        return false;

    }

    static AddUserInfo(addid:string,addpassword:string):void{
        let uid = addid as string;
        let upw = addpassword as string;
        this.usersInfo.Add(uid,upw);
        LoginData.dataLength ++;
    }
    static GetDataLength():number{
        return LoginData.dataLength;
    }
    
}
export default LoginData;