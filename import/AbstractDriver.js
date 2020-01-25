/***
 public Abstract class AbstractDriver
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 
 public method :
    getBrowserName - config parameter of your started config
    killProcess    - killing force webdriver process
    exit           - exit webbrowser and then kill shell process
    
 Must don't use protected method outside of 
 this framework.
*/
const {WebDriverRestApi}    = require("../lib/restApi/WebDriverRestApi.js");
const {Manage}              = require("../lib/Manage");
const {Navigate}            = require("../lib/Navigate.js");
const {WebElement}          = require("../lib/WebElement.js");
const {Utils}               = require("../lib/utils/Utils.js");

var webDriverRestApi = WebDriverRestApi.getInstance();

class AbstractDriver {
    
    // @private attribute
    constructor(capabilities){
        this.session    = null;
        this.Hprocess   = null;
        this.Hmanage    = new Manage();
        this.Hnavigate  = new Navigate();
        this.opts       = capabilities || {getCapabilities:function(){return {};}};
    }
    
    // :void
    async open( ){
        try {
            // Need to wait, sometime
            // webDrive didn't yet launched
            await this.Hprocess.launch();
            await Utils.sleep(1000);
            await this.launch(this.opts);
            delete this.opts;

            // @private
            // not really a good practice closure
            // the legacy of an old development method
            this.Hnavigate.getSessionId = this.Hmanage.getSessionId = this.Hmanage.window().getSessionId = (function(slf) {
                return function () {
                    return slf.session;
                };
            })(this);

        }catch (e) {
            console.log(e);
        }
    }

    // @protected
    // :void
    async launch(capabilities){
        let response;
        if((response = await webDriverRestApi.open(capabilities)).getStatusCode() === 200 ){
            try{
                this.session = response.getBodyAsObject().value.sessionId;
            }catch(e){}
            return response.getBodyAsObject();
        }
    }

    // :WebDriverProcess
    process(){
        return this.Hprocess;
    }

    // :Options
    manage(){
        return this.Hmanage;
    }

    // :Navigate
    navigate( ){
       return this.Hnavigate;
    }
    // :boolean
    killProcess(){
        return this
            .process()
            .getShellHandle()
            .kill("SIGINT");
    }
    
    // @async
    // :boolean
    async exit(){
        await this.window.delete();
        this.killMessage(this.process.killProcess());
    }

    /***
     *
     * @param url
     * @returns {Promise<Response>}
     */
    async get(url){
        let response;
        if((response = await webDriverRestApi.get(this.session,url === null || url.length === 0 ? "about:blank" : url)).getStatusCode === 200 ){
            return response.getBodyAsObject();
        }
    }

    // @returns String
    async getCurrentUrl(){
        let response;
        if((response = await webDriverRestApi.getUrl(this.session)).getStatusCode() === 200 ){
            return response.getBodyAsObject().value;
        }

        return "";
    }

    // @returns String
    async getTitle(){
        let response;
        if((response = await webDriverRestApi.getTitle(this.session)).getStatusCode() === 200 ){
            return response.getBodyAsObject( ).value;
        }

        return "";
    }

    async findElements(By){
        return new WebElement(this,{element:""});
    }

    async findElement(By){
        return new WebElement(this,{element:[]});
    }

    // @returns String
    // @Unstable
    async getPageSource(){
        let response;
        if((response = await webDriverRestApi.getPageSource(this.session)).getStatusCode() === 200 ){
            /***
             * UnhandledPromiseRejectionWarning: SyntaxError: Unexpected end of JSON input
             */
            return response.getBodyAsObject( ).value;
        }
        return "";
    }

    async close(){

    }

    async quit(){

    }

    async getWindowHandles( ){

    }

    async getWindowHandle(){

    }

    async switchTo(){

    }

}
/***
    @export
*/    
exports.AbstractDriver = AbstractDriver;