// Fill out your copyright notice in the Description page of Project Settings.


#include "TsPlayerController.h"


void ATsPlayerController::BeginPlay() {
	
	JsEnv2 = MakeShared<puerts::FJsEnv>();
	TArray<TPair<FString, UObject*>> Arguments;
	if (GetGameInstance()) {
		Arguments.Add(TPair<FString, UObject*>(TEXT("GameInstance"), GetGameInstance()));
	}
	Arguments.Add(TPair<FString, UObject*>(TEXT("PlayerController"),this));
	JsEnv2->Start("BagWidget", Arguments);
}