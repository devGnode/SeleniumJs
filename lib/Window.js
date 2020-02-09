/***
 public class Window
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {WebDriverRestApi} = require("../lib/restApi/WebDriverRestApi.js");
const {Dimension}        = require("./import/Dimension.js");
const {Point}            = require("./import/Point.js");

const {Logger}           = require("../lib/Misc/Logger.js");
const {RunTimeException}= require("../lib/exception/RunTimeException.js");

class Window{

    static #Logger;
    static #API = WebDriverRestApi.getInstance();

    #driver;

    constructor( driver ){

        Window.#Logger    = Logger.factory(this.constructor.name);
        this.#driver      = driver;
    }

    // @return void
    async maximize(){
        let response;
        if((response = await Window.#API.maximize(this.#driver.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException(Window.#Logger,response.getError());
    }

    // @return void
    async minimize(){
        let response;
        if((response = await Window.#API.minimize(this.#driver.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException(Window.#Logger,response.getError());
    }

    // @return void
    async fullscreen(){
        let response;
        if((response = await Window.#API.fullScreen(this.#driver.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException(Window.#Logger,response.getError());
    }

    // @return Dimension
    async getSize(){
        let response;
        if((response = await Window.#API.getWindowSize(this.#driver.getSessionId())).getStatusCode() === 200 ){
            let dim = response.getBodyAsObject().value;
            return new Dimension(dim.width,dim.height);
        }
        // NoSuchWindow
        throw new RunTimeException(Window.#Logger,response.getError());
    }

    // @return void
    async setSize(dimension){
        let response;
        if((response = await Window.#API.setWindowSize(this.#driver.getSessionId(),dimension)).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException(Window.#Logger,response.getError());
    }

    // @return Point
    async getPosition(){
        let response;
        if((response = await Window.#API.getWindowSize(this.#driver.getSessionId())).getStatusCode() === 200 ){
            let post = response.getBodyAsObject().value;
            return new Point(post.x,post.y);
        }
        // NoSuchWindow
        throw new RunTimeException(Window.#Logger,response.getError());
    }

    // @return void
    async setPosition(point){
        let response;
        if((response = await Window.#API.setWindowSize(this.#driver.getSessionId(),point)).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        throw new RunTimeException(Window.#Logger,response.getError());
    }

}
/***
    @export
*/    
exports.Window = Window;