// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "JsEnv.h"

#include "CoreMinimal.h"

#include "GameFramework/PlayerController.h"
#include "TsPlayerController.generated.h"


/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API ATsPlayerController : public APlayerController
{
	GENERATED_BODY()

public:

	virtual void BeginPlay() override;

private:
	TSharedPtr<puerts::FJsEnv> JsEnv2;
};
