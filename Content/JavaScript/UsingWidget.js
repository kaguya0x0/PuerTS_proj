"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts");
let world = puerts_1.argv.getByName("GameInstance").GetWorld();
let widgetloginClass = UE.Class.Load("/Game/Blueprints/WBP_Login.WBP_Login_C");
let widgetLogin = UE.UMGManager.CreateWidget(world, widgetloginClass);
widgetLogin.AddToViewport(0);
//console.log("Add success");
/*
按钮绑定
*/
//切换到注册界面
widgetLogin.Button_Enroll.OnClicked.Add(() => {
    //console.log("Enroll button clicked!");
    widgetLogin.EnrollPanel.SetVisibility(UE.ESlateVisibility.Visible);
    widgetLogin.LoginPanel.SetVisibility(UE.ESlateVisibility.Hidden);
});
//返回登录界面
widgetLogin.Button_Return.OnClicked.Add(() => {
    //console.log("Return button clicked!");
    widgetLogin.EnrollPanel.SetVisibility(UE.ESlateVisibility.Hidden);
    widgetLogin.LoginPanel.SetVisibility(UE.ESlateVisibility.Visible);
});
//登录提交
widgetLogin.Button_Login.OnClicked.Add(() => {
    widgetLogin.Tip_UserID.SetText("");
    widgetLogin.Tip_Password.SetText("");
    //console.log("Login button clicked!");
    //获取已注册用户信息
    let usersInfo = widgetLogin.UsersInfo;
    let userID = widgetLogin.Text_UserID.GetText();
    let userPassword = widgetLogin.Text_Password.GetText();
    console.log(userID, userPassword);
    if (userID == "") {
        widgetLogin.Tip_UserID.SetText("用户名不能为空！");
        return;
    }
    if (userPassword == "") {
        widgetLogin.Tip_Password.SetText("密码不能为空！");
        return;
    }
    for (var i = 0; i < usersInfo.Num(); i++) {
        console.log(i, usersInfo.Get(i).UserID, usersInfo.Get(i).PassWord);
        if (userID == usersInfo.Get(i).UserID) {
            if (userPassword == usersInfo.Get(i).PassWord) {
                console.log("登录成功！");
                widgetLogin.SetVisibility(UE.ESlateVisibility.Hidden);
                return;
            }
            else {
                widgetLogin.Tip_Password.SetText("密码错误");
                return;
            }
        }
    }
    widgetLogin.Tip_UserID.SetText("用户不存在");
});
//注册提交
widgetLogin.Button_EnrollSubmit.OnClicked.Add(() => {
    widgetLogin.Tip_EnrollID.SetText("");
    widgetLogin.Tip_EnrollPassword.SetText("");
    widgetLogin.Tip_RepeatPassword.SetText("");
    console.log("注册提交");
    let enrollID = widgetLogin.Text_EnrollID.GetText();
    let enrollPassword = widgetLogin.Text_EnrollPassword.GetText();
    let repeatPassword = widgetLogin.Text_RepeatPassword.GetText();
    //console.log(enrollID,enrollPassword,repeatPassword);
    if (enrollID == "") {
        widgetLogin.Tip_EnrollID.SetText("用户名不能为空");
        return;
    }
    if (enrollPassword == "") {
        widgetLogin.Tip_EnrollPassword.SetText("密码不能为空");
        return;
    }
    if (enrollPassword != repeatPassword) {
        console.log(enrollPassword, repeatPassword);
        widgetLogin.Tip_RepeatPassword.SetText("两次密码不一致");
        return;
    }
    widgetLogin.UserInfo.UserID = enrollID;
    widgetLogin.UserInfo.PassWord = enrollPassword;
    widgetLogin.UsersInfo.Add(widgetLogin.UserInfo);
    console.log(widgetLogin.UserInfo.UserID, widgetLogin.UserInfo.PassWord);
    console.log("注册成功");
});
//# sourceMappingURL=UsingWidget.js.map