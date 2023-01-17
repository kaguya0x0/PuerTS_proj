#pragma once

#include "CoreMinimal.h"
#include "Tickable.h"
#include "TSWidgetPrivate.generated.h"

UCLASS()
class PUERTS_UNREAL_DEMO_API UTSWidgetPrivate : public UObject
{
	GENERATED_BODY()

public:
	UFUNCTION(BlueprintImplementableEvent)
	void Tick(float DeltaTime);

	UFUNCTION(BlueprintImplementableEvent)
	void SetupUI(UUserWidget* ui);

	UFUNCTION(BlueprintImplementableEvent)
	void Destory();
};