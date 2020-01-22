/***
 public Abstract class ChromeDriver
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {AbstractDriver}      = require("./AbstractDriver.js");
const {PropertiesFile}      = require("../lib/PropertiesFile.js");
const {Window}              = require("./Window.js");
const {WebDriverRestApi}    = require("../lib/restApi/WebDriverRestApi.js");

console.log(Window);
const WEB_BROWSER = "chrome";

class ChromeDriver extends AbstractDriver{
    
    constructor( options ){
        super(WEB_BROWSER.toLowerCase());
        
        let properties = PropertiesFile.getInstance(),
            chrome      = properties.getWebdriverConfig(WEB_BROWSER.toLowerCase());
        
        this.command = chrome.bin;
        this.argv    = []; 
        
        chrome.argv.forEach(value=>this.argv.push(value));
        [
         "--port="+properties.getPort(),
        
        ].forEach(value=>this.argv.push(value));
        
        this.window = Window.build( WebDriverRestApi.getInstance() ); 
        this.opts = options;
    }
    
    // @Override
    stdout(data){
        console.log(`${data}`);
    }
    
    stdErr(data){
        console.log("Error");
    }
    
}

/*
    @export
*/
exports.ChromeDriver = ChromeDriver;