/***
 public class Navigate

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
const {WebDriverRestApi} = require("../lib/restApi/WebDriverRestApi.js");
const {Logger}           = require("../lib/Misc/Logger.js");
const {RunTimeException}= require("../lib/exception/RunTimeException.js");

class Navigate{

    static #Logger;
    static #API = WebDriverRestApi.getInstance();

    #driver;

    constructor(driver) {
        Navigate.#Logger = Logger.factory(this.constructor.name);
        this.#driver = driver;
    }

    // @return void
    async back(){
        let response;
        if((response = await Navigate.#API.back(this.#driver.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException( Navigate.#Logger,response.getError());
    }

    // @return void
    async forward(){
        let response;
        if((response = await Navigate.#API.forward(this.#driver.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException( Navigate.#Logger,response.getError());
    }

    // @return void
    async refresh( ){
        let response;
        if((response = await Navigate.#API.refresh(this.#driver.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException( Navigate.#Logger,response.getError());
    }

    // ??
    async to( ){
        throw new Error("Not supported !");
    }

}
/***
 @export
*/
exports.Navigate = Navigate;