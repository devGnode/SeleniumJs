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

class Manage{

    static #API = WebDriverRestApi.getInstance();;

    #Hwindow;
    #Htimeouts;
    #Hlogs;

    // @private attributes
    constructor( ) {
        this.#Hwindow    = new Window( );
        this.#Htimeouts  = new Timeouts( );
        this.#Hlogs      = null;
    }

    async addCookie(cookie){

    }

    async deleteAllCookies(){

    }

    async deleteCookie(cookie){

    }

    async deleteCookieNamed(name){

    }

    async getCookieNamed(name){

    }

    async getCookies(){

    }

    logs(){

    }

    // @return Timeouts
    timeouts(){
        return this.#Htimeouts;
    }

    // @return Window
    window(){
        return this.#Hwindow;
    }
}
/***
 @export
*/
exports.Manage = Manage;