"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class LoginData extends UE.Object {
    constructor() {
        super(...arguments);
        LoginData.dataLength = 0;
    }
    static CheckID(inputID) {
        if (this.usersInfo.Get(inputID) != undefined && this.usersInfo.Get(inputID) != null) {
            return true;
        }
        return false;
    }
    static LoginTest(inputID, inputPW) {
        if (this.usersInfo.Get(inputID) == inputPW) {
            return true;
        }
        return false;
    }
    static AddUserInfo(addid, addpassword) {
        let uid = addid;
        let upw = addpassword;
        this.usersInfo.Add(uid, upw);
        LoginData.dataLength++;
    }
    static GetDataLength() {
        return LoginData.dataLength;
    }
}
LoginData.usersInfo = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
exports.default = LoginData;
//# sourceMappingURL=LoginData.js.map