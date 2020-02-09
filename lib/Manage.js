/***
 public Abstract class AbstractDriver
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
const {Window}           = require("./Window.js");
const {Timeouts}         = require("./Timeouts.js");
const {WebDriverRestApi} = require("../lib/restApi/WebDriverRestApi.js");
const {Cookie}           = require("./import/Cookie.js");

const {Logger}           = require("../lib/Misc/Logger.js");
const {RunTimeException}= require("../lib/exception/RunTimeException.js");

class Manage{

    static #Logger;
    static #API = WebDriverRestApi.getInstance();

    #Hwindow;
    #Htimeouts;
    #Hlogs;
    #driver;

    // @private attributes
    constructor( driver ) {

        Manage.#Logger   = Logger.factory(this.constructor.name);
        this.#Hwindow    = new Window( driver );
        this.#Htimeouts  = new Timeouts( driver );
        this.#driver     = driver;
        this.#Hlogs      = null;
    }

    /***
     * @return void
     */
    async addCookie(cookie){
        let response;
        if((response = await Manage.#API.addCookie(this.#driver.getSessionId(),cookie)).getStatusCode()===200){
            return void 0;
        }
        //
        throw new RunTimeException( Manage.#Logger,response.getError());
    }

    /***
     * @return void
     */
    async deleteAllCookies(){
        let response;
        if((response = await Manage.#API.deleteAllCookie(this.#driver.getSessionId())).getStatusCode()===200){
            return void 0;
        }
        //
        throw new RunTimeException( Manage.#Logger,response.getError());
    }

    /***
     * @param cookie
     * @return void
     */
    async deleteCookie(cookie){
        await this.deleteCookieNamed(cookie.getName());
    }

    /***
     * @param name
     * @return void
     */
    async deleteCookieNamed(name){
        let response;
        if((response = await Manage.#API.deleteNamedCookie(this.#driver.getSessionId(),name)).getStatusCode()===200){
            return void 0;
        }
        //
        throw new RunTimeException( Manage.#Logger,response.getError());
    }

    /***
     * @param name
     * @return {Cookie}
     */
    async getCookieNamed(name){
        let response;
        if((response = await Manage.#API.getNamedCookie(this.#driver.getSessionId(),name)).getStatusCode()===200){
            let cookie = response.getBodyAsObject().value;
            return new Cookie(
                cookie.name,
                cookie.value,
                cookie.path,
                cookie.domain,
                cookie.secure,
                cookie.httpOnly,
                cookie.expiry
            );
        }
        //
        throw new RunTimeException( Manage.#Logger,response.getError());
    }

    /***
     * @return {Array<Cookie>}
     */
    async getCookies(){
        let response;
        if((response = await Manage.#API.getAllCookie(this.#driver.getSessionId())).getStatusCode()===200){
            return Object()
                .stream()
                .of( response.getBodyAsObject().value )
                .map(cookie=>new Cookie(cookie.name,cookie.value,cookie.path,cookie.domain,cookie.secure,cookie.httpOnly,cookie.expiry))
                .stream()
                .get();
        }
        //
        throw new RunTimeException( Manage.#Logger,response.getError());
    }

    logs(){
        return this.#Hlogs;
    }

    /***
     * @return {Timeouts}
     */
    timeouts(){
        return this.#Htimeouts;
    }

    /***
     * @return {Window}
     */
    window(){
        return this.#Hwindow;
    }

}
/***
 @export
*/
exports.Manage = Manage;