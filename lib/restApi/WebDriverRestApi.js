/***
 public class WebDriverRestApi
 Singleton class
 Window REST API.

 + documentation about webdriver endPoints
   and swagger documentation.

 @url_doc   :   https://w3c.github.io/webdriver/

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 
 All methods return : @Response
*/
const {format}          = require("util");
const {HttpQuery}       = require("../HttpQuery.js");
const {PropertiesFile}  = require("../PropertiesFile.js");

// endPoints 
const  BASE            = "/session";
let DELETE             = BASE+"/%s";
let SOURCE_CODE        = BASE+"/%s/source"; // --
let WINDOW_BACK        = BASE+"/%s/back";
let WINDOW_FORWARD     = BASE+"/%s/forward";
let WINDOW_URL         = BASE+"/%s/url";
let WINDOW_CLOSE       = BASE+"/%s/window";
let WINDOW_MAX         = BASE+"/%s/window/maximize";
let WINDOW_MIN         = BASE+"/%s/window/minimize";
let WINDOW_FULLSCREEN  = BASE+"/%s/window/fullscreen";
let WINDOW_TITLE       = BASE+"/%s/title";
let WINDOW_REFRESH     = BASE+"/%s/refresh";
let WINDOW_COOKIE      = BASE+"/%s/cookie";
let WINDOW_COOKIE_NAME = BASE+"/%s/cookie/%s";

let WINDOW_POSITION    = BASE+"/%s/window/rect";

// Element(s)
let FIND_ELEMENT            = BASE+"/%s/element";
let FIND_ELEMENTS           = BASE+"/%s/elements";
let FIND_ELT_FROM_PARENT    = BASE+"/%s/element/%s/element";
let FIND_ELTS_FROM_PARENT   = BASE+"/%s/element/%s/elements";
let ELEMENT_ACTIVE          = BASE+"/%s/element/%s/active";
let ELEMENT_SELECTED        = BASE+"/%s/element/%s/selected";
let ELEMENT_ENABLED         = BASE+"/%s/element/%s/enabled";
let ELEMENT_SEND_VALUE      = BASE+"/%s/element/%s/value";
let ELEMENT_CLEAR_VALUE     = BASE+"/%s/element/%s/clear";
let ELEMENT_GET_TEXT        = BASE+"/%s/element/%s/text";
let ELEMENT_CLICK           = BASE+"/%s/element/%s/click";
let ELEMENT_GET_TAG_NAME    = BASE+"/%s/element/%s/name";
let ELEMENT_GET_ATTRIBUTE   = BASE+"/%s/element/%s/attribute/%s";
let ELEMENT_GET_PROPERTY    = BASE+"/%s/element/%s/property/%s";
let ELEMENT_GET_CSS_PROP    = BASE+"/%s/element/%s/css/%s";
let ELEMENT_POSITION        = BASE+"/%s/element/%s/rect";

let EXECUTE_JS_SYNC         = BASE+"/%s/execute/sync";
let EXECUTE_JS_ASYNC        = BASE+"/%s/execute/async";

let ALERT_TEXT              = BASE+"/%s/alert/text";
let ALERT_ACCEPT            = BASE+"/%s/alert/accept";
let ALERT_DISMISS           = BASE+"/%s/alert/dismiss";

let ACTION_PERFORM_RELEASE  = BASE+"/%s/actions";

let WINDOW_SCREENSHOT      = BASE+"/%s/screenshot";
let ELEMENT_SCREENSHOT     = BASE+"/%s/element/%s/screenshot";

// properties
var properties = PropertiesFile.getInstance();

class WebDriverRestApi{
    
    // @private static
    constructor(){ 
        if(WebDriverRestApi.Instance){
            return WebDriverRestApi.Instance;
        }
        WebDriverRestApi.Instance = this;
    }
    
    format( ){
        return format.apply(null,arguments);
    }

    // @private
    post(){
        return HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Content-Type","application/json")
            .withHeader("Accept","application/json")
            .withHeader("Cache-Control","no-cache");
    }

    /***
     * Window Rest API Request
     * + open
     * + maximize
     * + minimize
     * + fullScreen
     * + getPageSource
     * + get
     * + refresh
     * + closeWindow
     * + getTitle
     * + getUrl
     * + deleteSession
     */

    // @post
    async open(capabilities){
       return await this
           .post()
           .withData({ desiredCapabilities: capabilities.getCapabilities() })
           .withEndPoint(BASE)
           .build()
           .send();
    }

    // @post
    async maximize(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WINDOW_MAX,sessionId))
            .build()
            .send();
    }

    // @post
    async minimize(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WINDOW_MIN,sessionId))
            .build()
            .send();
    }

    // to-review
    // @post
    async fullScreen(sessionId){
        return await this
            .post()
            .withEndPoint(this.format(WINDOW_FULLSCREEN,sessionId))
            .withData({})
            .build()
            .send();
    }

    // @get
    async getPageSource(sessionId){
        return await HttpQuery
            .options()
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Accept","Application/json")
            .withEndPoint(this.format(SOURCE_CODE,sessionId))
            .build()
            .send();
    }

    // @post
    async get(sessionId,url){
        return await this
            .post( )
            .withData({ url:url })
            .withEndPoint(this.format(WINDOW_URL,sessionId))
            .build()
            .send();
    }

    // @get
    async getUrl(sessionId){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_URL,sessionId))
            .build()
            .send();
    }

    // @get
    async getTitle(sessionId){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_TITLE,sessionId))
            .build()
            .send();
    }

    // @post
    async refresh(sessionId){
        return await this
            .post( )
            .withData({})
            .withEndPoint(this.format(WINDOW_REFRESH,sessionId))
            .build()
            .send();
    }

    // @get
    async getWindowSize(sessionId){
        return await HttpQuery
            .options()
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_POSITION,sessionId))
            .build()
            .send();
    }

    // @get
    async setWindowSize(sessionId,size){
        return await this
            .post()
            .withData(size)
            .withEndPoint(this.format(WINDOW_POSITION,sessionId))
            .build()
            .send();
    }

    // @delete
    async closeWindow(sessionId){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withMethod("DELETE")
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_CLOSE,sessionId))
            .build()
            .send();
    }

    // @delete
    async deleteSession(sessionId){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withMethod("DELETE")
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(DELETE,sessionId))
            .build()
            .send();
    }

    // @get
    async getAllCookie(sessionId){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_COOKIE,sessionId))
            .build()
            .send();
    }

    // @get
    async getNamedCookie(sessionId,name){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_COOKIE_NAME,sessionId,name))
            .build()
            .send();
    }

    // @post
    async addCookie(sessionId,Cookie){
        return await this
            .post( )
            .withData(Cookie)
            .withEndPoint(this.format(WINDOW_COOKIE,sessionId))
            .build()
            .send();
    }

    // @delete
    async deleteAllCookie(sessionId){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withMethod("DELETE")
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_COOKIE,sessionId))
            .build()
            .send();
    }

    // @delete
    async deleteNamedCookie(sessionId,name){
        return await HttpQuery
            .options( )
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withMethod("DELETE")
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(WINDOW_COOKIE_NAME,sessionId,name))
            .build()
            .send();
    }

    // @post
    async back(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WINDOW_BACK,sessionId))
            .build()
            .send();
    }

    // @post
    async forward(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WINDOW_FORWARD,sessionId))
            .build()
            .send();
    }

     // may be to move up this API call
    // to an another file WebDriverElement
    async findElement(By,sessionId){
        return await this
            .post()
            .withData(By)
            .withEndPoint(this.format(FIND_ELEMENT,sessionId))
            .build()
            .send();
    }

    async findElements(By){
        return await this
            .post()
            .withData(By)
            .withEndPoint(this.format(FIND_ELEMENTS,sessionId))
            .build()
            .send();
    }

    async isActive(sessionId,webElement){
        return await HttpQuery
            .options()
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Cache-Control","no-cache")
            .withHeader("Content-Type","application/json")
            .withHeader("Accept","application/json")
            .withEndPoint(this.format(ELEMENT_ACTIVE,sessionId))
            .build()
            .send();
    }

    // @post
    async executeSyncScript(sessionId,javascriptExecutor){
        return await this
            .post()
            .withData(javascriptExecutor)
            .withEndPoint(this.format(EXECUTE_JS_SYNC,sessionId))
            .build()
            .send();
    }

    // @post
    // to do implemented
    async executeASyncScript(sessionId,javascriptExecutor){
        return await this
            .post()
            .withData(javascriptExecutor)
            .withEndPoint(this.format(EXECUTE_JS_ASYNC,sessionId))
            .build()
            .send();
    }

    async screenShot(sessionId,webElement) {
        return await HttpQuery
            .options()
            .withHostname(properties.getHost())
            .withPort(properties.getPort())
            .withHeader("Cache-Control","no-cache")
            .withHeader("Accept","application/json;charset=UTF-8")
            .withEndPoint(this.format(W,sessionId,webElement.getElement()))
            .build()
            .send();
    }

    static getInstance(){
        return WebDriverRestApi.Instance;
    }
    
}
/***
    @exports 
*/
exports.WebDriverRestApi = (new WebDriverRestApi( ),WebDriverRestApi);