import * as UE from 'ue'
import WidgetManager from './WidgetManagers';


class CurrentWidget {

    widgetName: string;
    //widgetRoute: string;
    widgetObj : UE.UserWidget;

    //currentWidget: WidgetManager;

    Constructor(){
        this.widgetName = "";
        this.widgetObj = null;
    }


}
export default CurrentWidget;