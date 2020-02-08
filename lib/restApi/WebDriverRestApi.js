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
 
 All methods return : Response
*/
const {format}          = require("util");
const {HttpQuery}       = require("../HttpQuery.js");
const {PropertiesFile}  = require("../PropertiesFile.js");

class WebDriverRestApi{

    static INSTANCE  = new WebDriverRestApi();
    static #PROP     = PropertiesFile.getInstance();

    // Window
    static BASE                     = "/session";
    static #DELETE                  = WebDriverRestApi.BASE+"/%s";
    static #SOURCE_CODE             = WebDriverRestApi.BASE+"/%s/source";
    static #WINDOW_BACK             = WebDriverRestApi.BASE+"/%s/back";
    static #WINDOW_FORWARD          = WebDriverRestApi.BASE+"/%s/forward";
    static #WINDOW_URL              = WebDriverRestApi.BASE+"/%s/url";
    static #WINDOW_CLOSE            = WebDriverRestApi.BASE+"/%s/window";
    static #WINDOW_MAX              = WebDriverRestApi.BASE+"/%s/window/maximize";
    static #WINDOW_MIN              = WebDriverRestApi.BASE+"/%s/window/minimize";
    static #WINDOW_FULLSCREEN       = WebDriverRestApi.BASE+"/%s/window/fullscreen";
    static #WINDOW_TITLE            = WebDriverRestApi.BASE+"/%s/title";
    static #WINDOW_REFRESH          = WebDriverRestApi.BASE+"/%s/refresh";
    static #WINDOW_COOKIE           = WebDriverRestApi.BASE+"/%s/cookie";
    static #WINDOW_COOKIE_NAME      = WebDriverRestApi.BASE+"/%s/cookie/%s";

    static #WINDOW_POSITION         = WebDriverRestApi.BASE+"/%s/window/rect";
    static #WINDOW_TIMEOUTS         = WebDriverRestApi.BASE+"/%s/timeouts";

    // Element(s)
    static #FIND_ELEMENT            = WebDriverRestApi.BASE+"/%s/element";
    static #FIND_ELEMENTS           = WebDriverRestApi.BASE+"/%s/elements";
    static #FIND_ELT_FROM_PARENT    = WebDriverRestApi.BASE+"/%s/element/%s/element";
    static #FIND_ELTS_FROM_PARENT   = WebDriverRestApi.BASE+"/%s/element/%s/elements";
    static #ELEMENT_ACTIVE          = WebDriverRestApi.BASE+"/%s/element/%s/active";
    static #ELEMENT_SELECTED        = WebDriverRestApi.BASE+"/%s/element/%s/selected";
    static #ELEMENT_ENABLED         = WebDriverRestApi.BASE+"/%s/element/%s/enabled";
    static #ELEMENT_SEND_VALUE      = WebDriverRestApi.BASE+"/%s/element/%s/value";
    static #ELEMENT_CLEAR_VALUE     = WebDriverRestApi.BASE+"/%s/element/%s/clear";
    static #ELEMENT_GET_TEXT        = WebDriverRestApi.BASE+"/%s/element/%s/text";
    static #ELEMENT_CLICK           = WebDriverRestApi.BASE+"/%s/element/%s/click";
    static #ELEMENT_GET_TAG_NAME    = WebDriverRestApi.BASE+"/%s/element/%s/name";
    static #ELEMENT_GET_ATTRIBUTE   = WebDriverRestApi.BASE+"/%s/element/%s/attribute/%s";
    static #ELEMENT_GET_PROPERTY    = WebDriverRestApi.BASE+"/%s/element/%s/property/%s";
    static #ELEMENT_GET_CSS_PROP    = WebDriverRestApi.BASE+"/%s/element/%s/css/%s";
    static #ELEMENT_POSITION        = WebDriverRestApi.BASE+"/%s/element/%s/rect";
    static #ELEMENT_DISPLAYED       = WebDriverRestApi.BASE+"/%s/element/%s/displayed";
    static #FORM_SUBMIT              = WebDriverRestApi.BASE+"/%s/element/%s/submit";

    // Javascript
    static #EXECUTE_JS_SYNC         = WebDriverRestApi.BASE+"/%s/execute/sync";
    static #EXECUTE_JS_ASYNC        = WebDriverRestApi.BASE+"/%s/execute/async";

    static ALERT_TEXT               = WebDriverRestApi.BASE+"/%s/alert/text";
    static ALERT_ACCEPT             = WebDriverRestApi.BASE+"/%s/alert/accept";
    static ALERT_DISMISS            = WebDriverRestApi.BASE+"/%s/alert/dismiss";

    static ACTION_PERFORM_RELEASE   = WebDriverRestApi.BASE+"/%s/actions";

    static #WINDOW_SCREENSHOT        = WebDriverRestApi.BASE+"/%s/screenshot";
    static #ELEMENT_SCREENSHOT       = WebDriverRestApi.BASE+"/%s/element/%s/screenshot";

    /**
     * @return {WebDriverRestApi}
     */
    constructor(){
        if(WebDriverRestApi.INSTANCE){
            return WebDriverRestApi.INSTANCE;
        }
    }

    // @private
    format( ){
        return format.apply(null,arguments);
    }

    // @private
    getQuery( ){
        return HttpQuery
            .options( )
            .withHostname(WebDriverRestApi.#PROP.getHost())
            .withPort(WebDriverRestApi.#PROP.getPort())
            .withHeader("Accept","application/json")
            .withHeader("Cache-Control","no-cache");
    }

    // @private
    post(){
        return this.
            getQuery()
            .withHeader("Content-Type","application/json")
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
     * ...
     */

    // @post
    async open(capabilities){
       return await this
           .post()
           .withData({ desiredCapabilities: capabilities.getCapabilities() })
           .withEndPoint(WebDriverRestApi.BASE)
           .build()
           .send();
    }

    // @post
    async maximize(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_MAX,sessionId))
            .build()
            .send();
    }

    // @post
    async minimize(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_MIN,sessionId))
            .build()
            .send();
    }

    // to-review
    // @post
    async fullScreen(sessionId){
        return await this
            .post()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_FULLSCREEN,sessionId))
            .withData({})
            .build()
            .send();
    }

    // @get
    async getPageSource(sessionId){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#SOURCE_CODE,sessionId))
            .build()
            .send();
    }

    // @post
    async get(sessionId,url){
        return await this
            .post( )
            .withData({ url:url })
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_URL,sessionId))
            .build()
            .send();
    }

    // @get
    async getUrl(sessionId){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_URL,sessionId))
            .build()
            .send();
    }

    // @get
    async getTitle(sessionId){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_TITLE,sessionId))
            .build()
            .send();
    }

    // @post
    async refresh(sessionId){
        return await this
            .post( )
            .withData({})
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_REFRESH,sessionId))
            .build()
            .send();
    }

    // @get
    async getWindowSize(sessionId){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_POSITION,sessionId))
            .build()
            .send();
    }

    // @post
    async setWindowSize(sessionId,size){
        return await this
            .post()
            .withData(size)
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_POSITION,sessionId))
            .build()
            .send();
    }

    // @delete
    async closeWindow(sessionId){
        return await this
            .getQuery()
            .withMethod("DELETE")
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_CLOSE,sessionId))
            .build()
            .send();
    }

    // @delete
    async deleteSession(sessionId){
        return await this
            .getQuery()
            .withMethod("DELETE")
            .withEndPoint(this.format(WebDriverRestApi.#DELETE,sessionId))
            .build()
            .send();
    }

    // @get
    async getAllCookie(sessionId){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_COOKIE,sessionId))
            .build()
            .send();
    }

    // @get
    async getNamedCookie(sessionId,name){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_COOKIE_NAME,sessionId,name))
            .build()
            .send();
    }

    // @post
    async addCookie(sessionId,Cookie){
        return await this
            .post( )
            .withData(Cookie)
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_COOKIE,sessionId))
            .build()
            .send();
    }

    // @delete
    async deleteAllCookie(sessionId){
        return await this
            .getQuery()
            .withMethod("DELETE")
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_COOKIE,sessionId))
            .build()
            .send();
    }

    // @delete
    async deleteNamedCookie(sessionId,name){
        return await this
            .getQuery()
            .withMethod("DELETE")
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_COOKIE_NAME,sessionId,name))
            .build()
            .send();
    }

    // @post
    async back(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_BACK,sessionId))
            .build()
            .send();
    }

    // @post
    async forward(sessionId){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_FORWARD,sessionId))
            .build()
            .send();
    }

    // post
    async setTimeouts(sessionId,timeoutType,ms){
        return this
            .post()
            .withData((({})[timeoutType]=ms))
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_TIMEOUTS,sessionId))
            .build()
            .send();
    }

    async getTimeouts(sessionId){
        return this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_TIMEOUTS,sessionId))
            .build()
            .send();
    }

     // ?? may be to move up this API call
    // to an another file WebDriverElement ??

    //@post
    async findElement(sessionId,By){
        return await this
            .post()
            .withData(By)
            .withEndPoint(this.format(WebDriverRestApi.#FIND_ELEMENT,sessionId))
            .build()
            .send();
    }

    // @post
    async findElementFromParent(sessionId,By,webElementToken){
        return await this
            .post()
            .withData(By)
            .withEndPoint(this.format(WebDriverRestApi.#FIND_ELT_FROM_PARENT,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @post
    async findElements(sessionId,By){
        return await this
            .post()
            .withData(By)
            .withEndPoint(this.format(WebDriverRestApi.#FIND_ELEMENTS,sessionId))
            .build()
            .send();
    }

    // @post
    async findElementsFromParent(sessionId,By,webElementToken){
        return await this
            .post()
            .withData(By)
            .withEndPoint(this.format(WebDriverRestApi.#FIND_ELTS_FROM_PARENT,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @post
    async sendKeys(sessionId,webElementToken,value){
        console.log("element ID "+webElementToken.get());
        return await this
            .post()
            .withData(value)
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_SEND_VALUE,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @get
    async getText(sessionId,webElementToken){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_GET_TEXT,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @post
    async clear(sessionId,webElementToken){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_CLEAR_VALUE,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @post
    async click(sessionId,webElementToken){
        return await this
            .post()
            .withData({LEFT:0,MIDDLE:1,RIGHT:2})
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_CLICK,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @get
    async getElementRect(sessionId,webElementToken){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_POSITION,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @get
    async getElementAttribute(sessionId,webElementToken,attribute){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_GET_ATTRIBUTE,sessionId,webElementToken.get(),attribute))
            .build()
            .send();
    }

    // @get
    async getElementProperty(sessionId,webElementToken,property){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_GET_PROPERTY,sessionId,webElementToken.get(),property))
            .build()
            .send();
    }

    //@get
    async getElementTagName(sessionId,webElementToken){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_GET_TAG_NAME,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @get
    async getElementCssProperty(sessionId,webElementToken,cssProperty){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_GET_CSS_PROP,sessionId,webElementToken.get(),cssProperty))
            .build()
            .send();
    }

    // @get
    async isSelected(sessionId,webElementToken){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_SELECTED,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @get
    async isEnabled(sessionId,webElementToken){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_ENABLED,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    async isActive(sessionId,webElementToken){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_ACTIVE,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @get
    async isDisplayed(sessionId,webElementToken){
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_DISPLAYED,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @post
    async executeSyncScript(sessionId,javascriptExecutor){
        return await this
            .post()
            .withData(javascriptExecutor)
            .withEndPoint(this.format(WebDriverRestApi.#EXECUTE_JS_SYNC,sessionId))
            .build()
            .send();
    }

    async submit(sessionId,webElementToken){
        return await this
            .post()
            .withData({})
            .withEndPoint(this.format(WebDriverRestApi.#FORM_SUBMIT,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    // @post
    // to do implemented
    async executeASyncScript(sessionId,javascriptExecutor){
        return await this
            .post()
            .withData(javascriptExecutor)
            .withEndPoint(this.format(WebDriverRestApi.#EXECUTE_JS_ASYNC,sessionId))
            .build()
            .send();
    }

    async screenShot(sessionId) {
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#WINDOW_SCREENSHOT,sessionId))
            .build()
            .send();
    }

    async elementScreenShot(sessionId,webElementToken) {
        return await this
            .getQuery()
            .withEndPoint(this.format(WebDriverRestApi.#ELEMENT_SCREENSHOT,sessionId,webElementToken.get()))
            .build()
            .send();
    }

    static getInstance(){
        return WebDriverRestApi.INSTANCE;
    }
    
}
/***
    @exports 
*/
exports.WebDriverRestApi = WebDriverRestApi;