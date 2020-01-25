/***
 public Abstract class AbstractDriver
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
const {Window}  = require("../lib/Window.js");
//const {Timeout} = null;

class Manage{

    // @private attributes
    constructor( ) {
        this.Hwindow    = new Window( );
        this.Htimeouts  = null;
        this.Hlogs      = null;
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

    timeouts(){

    }

    // :Window
    window(){
        return this.Hwindow;
    }
}
/***
 @export
*/
exports.Manage = Manage;