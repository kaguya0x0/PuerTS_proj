
import * as UE from 'ue'
import {argv} from 'puerts'
import Widget_Manager from './WidgetManager';

let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld() as UE.World;


var uiManager = new Widget_Manager();
let BagUI = uiManager.OpenWidget(world,"bag") as UE.Game.Blueprints.UMG.WBP_Inventory.WBP_Inventory_C;

