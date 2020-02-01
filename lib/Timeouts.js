/***
 public class Timeouts
     @author    :   Maroder
     @date      :   17/01/2020
     @licence   :   GNU/GPL
     @version   :   1.0

 */
const {WebDriverRestApi} = require("./restApi/WebDriverRestApi.js");

class Timeouts{

    static #API = WebDriverRestApi.getInstance();

    constructor() {
        this.getSessionId = null;
    }

    async implicitlyWait(msTimeout){
        let response;
        if((response = await Timeouts.#API.setTimeouts(this.getSessionId(),"implicit",msTimeout)).getStatusCode() === 200 ){
            return void 0;
        }else{
            // throw implementation
        }

    }

    async getImplicitTimeout( ){
        return this.getTimeouts().implicit || null;
    }

    async pageLoadTimeout(msTimeout){
        let response;
        if((response = await Timeouts.#API.setTimeouts(this.getSessionId(),"pageLoad",msTimeout)).getStatusCode() === 200 ){
            //
            return void 0;
        }else{
            // throw implementation
        }
    }

    async getPageLoadTimeout( ){
        return this.getTimeouts().pageLoad || null;
    }

    async setScriptTimeout(msTimeout){
        let response;
        if((response = await Timeouts.#API.setTimeouts(this.getSessionId(), "script",msTimeout)).getStatusCode() === 200 ){
            //
            return void 0;
        }else{
            // throw implementation
        }
    }

    async getScriptTimeout( ){
        return this.getTimeouts().script || null;
    }

    //
   async getTimeouts(){
        let response;
        if((response = await Timeouts.#API.getTimeouts(this.getSessionId())).getStatusCode() === 200 ){
            return response.getBodyAsObject();
        }else{
            // throw implementation
        }
    }
}
/***
 @export
*/
exports.Timeouts = Timeouts;