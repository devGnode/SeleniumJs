/***
 public Abstract class AbstractDriver
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

*/
"use strict";

const {WebDriverRestApi}    = require("../lib/restApi/WebDriverRestApi.js");
const {JavascriptExecutor}  = require("../lib/js/JavascriptExecutor.js");
const {PropertiesFile}      = require("../lib/PropertiesFile.js");
const {Manage}              = require("../lib/Manage");
const {Navigate}            = require("../lib/Navigate.js");
const {WebElement}          = require("../lib/WebElement.js");
const {Utils}               = require("../lib/utils/Utils.js");
const {Stream}              = require("../lib/Misc/Stream.js");

class AbstractDriver {

    static #API                      = WebDriverRestApi.getInstance();

    // private
    #Hmanage;
    #Hnavigate;

    // protected
    session     = null;
    Hprocess    = null;

    constructor(capabilities,driverOpts){

        this.#Hmanage    = new Manage();
        this.#Hnavigate  = new Navigate();

        let prop = PropertiesFile.getInstance().setProperty("capabilities",capabilities||{getCapabilities:function(){return {};}});
        Stream
            .of(driverOpts||{})
            .each((value,key)=>{
                prop.setProperty(key,value);
            });
    }
    
    // :void
    async open( ){
        try {
            // Need to wait, sometime
            // webDrive didn't yet launched
            await this.Hprocess.launch();
            await Utils.sleep(1000);
            await this.launch(PropertiesFile.getInstance().getProperty("capabilities"));

            // @private
            // not really a good practice closure
            // the legacy of an old development method
            this.#Hmanage.getSessionId =
            this.#Hnavigate.getSessionId =
            this.#Hmanage.timeouts().getSessionId =
            this.#Hmanage.window().getSessionId = (function(slf) {
                return function () {
                    return slf.session;
                };
            })(this);

        }catch (e) {
            console.log(e);
        }
    }

    /***
     * @protected
     * @returns void
     */
    async launch(capabilities){
        let response;
        if((response = await AbstractDriver.#API.open(capabilities)).getStatusCode() === 200 ){
            try{
                this.session = response.getBodyAsObject().value.sessionId;
            }catch(e){}
            return response.getBodyAsObject();
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }

    /***
     * @returns {Hprocess}
     */
    process(){
        return this.Hprocess;
    }

    /***
     * @returns {Hmanage}
     */
    manage(){
        return this.#Hmanage;
    }

    /***
     * @returns {Navigate}
     */
    navigate( ){
       return this.#Hnavigate;
    }

    /***
     * @returns {boolean}
     */
    killProcess(){
        return this.process().killProcess();
    }

    /***
     *
     * @param url
     * @returns {Response}
     */
    async get(url){
        let response;
        if((response = await AbstractDriver.#API.get(this.session,url === null || url.length === 0 ? "about:blank" : url)).getStatusCode() === 200 ){
            return void 0;
        }
        // NoSuchWindow
        // ff : value.error, other : value.message
        throw new Error(response.getError());
    }

    /***
     * @returns {string}
     */
    async getCurrentUrl(){
        let response;
        if((response = await AbstractDriver.#API.getUrl(this.session)).getStatusCode() === 200 ){
            return response.getBodyAsObject().value || "";
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }

    /***
     * @returns {string}
     */
    async getTitle(){
        let response;
        if((response = await AbstractDriver.#API.getTitle(this.session)).getStatusCode() === 200 ){
            return response.getBodyAsObject( ).value || "";
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }

    /***
     * @param By
     * @returns {Array<WebElement>}
     */
    async findElements(By){
        let response;
        if((response = await AbstractDriver.#API.findElements(this.session,By)).getStatusCode()===200){
            return Array.from(
                response
                    .getBodyAsObject()
                    .value
                    .map(targetElement=> new WebElement(this,targetElement))
            );
        }
        // NoSuchWindow
        // NoSuchElement
        throw new Error(response.getError());
    }

    /***
     * @param By
     * @returns {WebElement}
     */
    async findElement(By){
        let response;
        if((response=await AbstractDriver.#API.findElement(this.session,By)).getStatusCode()===200){
            return new WebElement(this,response.getBodyAsObject().value);
        }
        // NoSuchWindow
        // NoSuchElement
        throw new Error(response.getError());
    }

    /***
      @fixed
      @returns {String}
     */
    async getPageSource(){
        let response;
        if((response = await AbstractDriver.#API.getPageSource(this.session)).getStatusCode() === 200 ){
            return Buffer.from( response.getBodyAsObject( ).value,"base64").toString("utf8");
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }

    async close(){

    }

    /***
     * @returns {boolean}
     */
    async quit(){
        if(( await AbstractDriver.#API.deleteSession(this.session)).getStatusCode()===200){
            try {
                this.process()
                    .killMessage("process has terminate : "+this.killProcess());
            }catch (e) {}
            return true;
        }
        return false;
    }

    async getWindowHandles( ){

    }

    async getWindowHandle(){

    }

    async switchTo(){

    }

    /***
     * @returns {Array<WebElement>|WebElement|*}
     */
    async executeScript(/*String , Object ...*/){
        var javascriptExecutorData, response,data;

        try{
            javascriptExecutorData = JavascriptExecutor.executeScript.apply(null,arguments);
            if((response = await AbstractDriver.#API.executeSyncScript(this.session,javascriptExecutorData)).getStatusCode() === 200 ){

                // may be a list of DomElements
                if( (data = response.getBodyAsObject( ).value) instanceof Array )
                return data.map(value=> typeof value === "object" ? new WebElement(this,value) : value );
                // may a simple DomElement
                else if(typeof data === "object"){
                    return new WebElement(this,data);
                }
                // another data
                // boolean, String, Number
                return data;
            }
        }catch(e){
            // TypeError  missing argument to JavascriptExecutor
            console.log(e);
        }
        //ScriptTimeout
        //JavaScriptError
        //NoSuchWindow
        throw new Error(response.getError());
    }

    async executeAsyncScript(){

    }

    /***
     * @return void
     */
    async takeScreenshot(){
        let response;
        if((response = await AbstractDriver.#API.screenShot(this.session) ).getStatusCode() === 200 ){
            try{
                return await Utils.writeBase64Image(
                    PropertiesFile.getInstance().getProperty("screenOutputDir"),
                    null,
                    response.getBodyAsObject( ).value
                );
            }catch (e) {
                throw new Error(e.message);
            }
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }
}
/***
    @export
*/    
exports.AbstractDriver = AbstractDriver;