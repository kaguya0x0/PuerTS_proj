# unreal demo for puerts

## 

一、虚拟机启动：

在TsGameInstance.h中启动构造第一个虚拟机，启动登录脚本LoginWidget.ts；

在TsPlayerController.h中启动构造第二个虚拟机，启动背包脚本BagWidget.ts;



二、UI管理器：

在继承自Object类的WidgetManager.ts里实现UI的基本管理：

​	TMap<string,string> widgetMap静态配置UI名字和路径的对应；

​	TMap<string,UE.UserWidget>currentUIMap保存已经初始化的UI；

​	CheckWidget检查是否存在此名字的UI；

​	InitWidget初始化控件；

​	OpenWidget打开控件到视口，如果控件没有创建会进行初始化；

​	CloseWidget关闭控件；

​	GetWidget根据UI名获得已经初始化的控件；



三、登录界面的MVC框架：

Modle：在LoginData.ts中保存所有用户账号数据，并且实现对数据的查询增加操作；

View：在UMG中拼好WBP_Login，设置好控件变量名字，在TS中用UI管理器打开；

Controller：在LoginWidget.ts中实现绑定控件的逻辑操作，并且调用LoginData的函数对数据操作；