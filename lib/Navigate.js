/***
 public class Navigate

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
const {WebDriverRestApi} = require("../lib/restApi/WebDriverRestApi.js");

class Navigate{

    static #API = WebDriverRestApi.getInstance();

    constructor() { this.getSessionId = null;}

    // @return void
    async back(){
        let response;
        if((response = await Navigate.#API.back(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }

    // @return void
    async forward(){
        let response;
        if((response = await Navigate.#API.forward(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }

    // @return void
    async refresh( ){
        let response;
        if((response = await Navigate.#API.refresh(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }

    // ??
    async to( ){
        throw new Error("Not yet implemented");
    }

}
/***
 @export
*/
exports.Navigate = Navigate;