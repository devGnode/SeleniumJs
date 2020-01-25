/***
 public class Navigate

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
const {WebDriverRestApi} = require("../lib/restApi/WebDriverRestApi.js");

var webDriverRestApi = WebDriverRestApi.getInstance();

class Navigate{

    constructor() { this.getSessionId = null;}

    // @return void
    async back(){
        let response;
        if((response = await webDriverRestApi.back(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
    }

    // @return void
    async forward(){
        let response;
        if((response = await webDriverRestApi.forward(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
    }

    // @return void
    async refresh( ){
        let response;
        if((response = await webDriverRestApi.refresh(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
    }

    // ??
    async to( ){ }

}
/***
 @export
*/
exports.Navigate = Navigate;