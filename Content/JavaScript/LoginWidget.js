"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts");
const WidgetManager_1 = require("./WidgetManager");
const LoginData_1 = require("./LoginData");
let world = puerts_1.argv.getByName("GameInstance").GetWorld();
var uiManager = new WidgetManager_1.default();
let loginUI = uiManager.OpenWidget(world, "login");
loginUI.Button_Enroll.OnClicked.Add(() => {
    //console.log("Enroll button clicked!");
    loginUI.EnrollPanel.SetVisibility(UE.ESlateVisibility.Visible);
    loginUI.LoginPanel.SetVisibility(UE.ESlateVisibility.Hidden);
});
//返回登录界面
loginUI.Button_Return.OnClicked.Add(() => {
    //console.log("Return button clicked!");
    loginUI.EnrollPanel.SetVisibility(UE.ESlateVisibility.Hidden);
    loginUI.LoginPanel.SetVisibility(UE.ESlateVisibility.Visible);
});
let infoUI;
//登录提交
loginUI.Button_Login.OnClicked.Add(() => {
    loginUI.Tip_UserID.SetText("");
    loginUI.Tip_Password.SetText("");
    let userID = loginUI.Text_UserID.GetText();
    let userPassword = loginUI.Text_Password.GetText();
    console.log(userID, userPassword);
    if (userID == "") {
        loginUI.Tip_UserID.SetText("用户名不能为空！");
        return;
    }
    if (userPassword == "") {
        loginUI.Tip_Password.SetText("密码不能为空！");
        return;
    }
    if (LoginData_1.default.CheckID(userID)) {
        if (LoginData_1.default.LoginTest(userID, userPassword)) {
            console.log("登录成功");
            infoUI = LoginSuccess(userID);
            uiManager.CloseWidget("login");
            return;
        }
        else {
            loginUI.Tip_Password.SetText("密码错误！");
            return;
        }
    }
    loginUI.Tip_UserID.SetText("用户不存在");
});
//注册提交
loginUI.Button_EnrollSubmit.OnClicked.Add(() => {
    loginUI.Tip_EnrollID.SetText("");
    loginUI.Tip_EnrollPassword.SetText("");
    loginUI.Tip_RepeatPassword.SetText("");
    console.log("注册提交");
    let enrollID = loginUI.Text_EnrollID.GetText();
    let enrollPassword = loginUI.Text_EnrollPassword.GetText();
    let repeatPassword = loginUI.Text_RepeatPassword.GetText();
    //console.log(enrollID,enrollPassword,repeatPassword);
    if (enrollID == "") {
        loginUI.Tip_EnrollID.SetText("用户名不能为空");
        return;
    }
    if (enrollPassword == "") {
        loginUI.Tip_EnrollPassword.SetText("密码不能为空");
        return;
    }
    if (enrollPassword != repeatPassword) {
        console.log(enrollPassword, repeatPassword);
        loginUI.Tip_RepeatPassword.SetText("两次密码不一致");
        return;
    }
    LoginData_1.default.AddUserInfo(enrollID, enrollPassword);
    //console.log(loginUI.UserInfo.UserID,loginUI.UserInfo.PassWord);
    console.log("注册成功");
    loginUI.EnrollPanel.SetVisibility(UE.ESlateVisibility.Hidden);
    loginUI.LoginPanel.SetVisibility(UE.ESlateVisibility.Visible);
});
function LoginSuccess(userid) {
    let userUI = uiManager.OpenWidget(world, "userInfo");
    userUI.userName.SetText(userid);
    return userUI;
}
//# sourceMappingURL=LoginWidget.js.map