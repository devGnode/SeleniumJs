/***
 public class Timeouts
     @author    :   Maroder
     @date      :   17/01/2020
     @licence   :   GNU/GPL
     @version   :   1.0

 */
const {WebDriverRestApi} = require("./restApi/WebDriverRestApi.js");
const {Logger}           = require("../lib/Misc/Logger.js");
const {RunTimeException}= require("../lib/exception/RunTimeException.js");

class Timeouts{

    static #Logger;
    static #API = WebDriverRestApi.getInstance();

    #driver;

    constructor(driver) {

        Timeouts.#Logger  = Logger.factory(this.constructor.name);
        this.#driver      = driver;
    }

    async implicitlyWait(msTimeout){
        let response;
        if((response = await Timeouts.#API.setTimeouts(this.#driver.getSessionId(),"implicit",msTimeout)).getStatusCode() === 200 ){
            return void 0;
        }
        // Timeouts
        throw new RunTimeException(Timeouts.#Logger,response.getError());
    }

    async getImplicitTimeout( ){
        return this.getTimeouts().implicit || null;
    }

    async pageLoadTimeout(msTimeout){
        let response;
        if((response = await Timeouts.#API.setTimeouts(this.#driver.getSessionId(),"pageLoad",msTimeout)).getStatusCode() === 200 ){
            return void 0;
        }
        // Timeouts
        throw new RunTimeException(Timeouts.#Logger,response.getError());
    }

    async getPageLoadTimeout( ){
        return this.getTimeouts().pageLoad || null;
    }

    async setScriptTimeout(msTimeout){
        let response;
        if((response = await Timeouts.#API.setTimeouts(this.#driver.getSessionId(), "script",msTimeout)).getStatusCode() === 200 ){
            return void 0;
        }
        // Timeouts
        throw new RunTimeException(Timeouts.#Logger,response.getError());
    }

    async getScriptTimeout( ){
        return this.getTimeouts().script || null;
    }

    //
   async getTimeouts(){
        let response;
        if((response = await Timeouts.#API.getTimeouts(this.#driver.getSessionId())).getStatusCode() === 200 ){
            return response.getBodyAsObject();
        }
       // Timeouts
       throw new RunTimeException(Timeouts.#Logger,response.getError());
    }
}
/***
 @export
*/
exports.Timeouts = Timeouts;