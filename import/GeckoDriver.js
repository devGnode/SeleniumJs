/***
 public Abstract class GeckoDriver
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {AbstractDriver}      = require("./AbstractDriver.js");
const {PropertiesFile}      = require("../lib/PropertiesFile.js");
const {WebDriverRestApi}    = require("../lib/restApi/WebDriverRestApi.js");
const {Window}              = require("./Window.js");

const {WebDriverProcess}  = require("../lib/WebDriverProcess.js");

const WEB_BROWSER   = "FIREFOX";
const BROWSER_TYPE  = "gecko";

class GeckoDriver extends AbstractDriver{
    
    constructor( options ){
        super(WEB_BROWSER.toLowerCase());
        
        let properties = PropertiesFile.getInstance(),
            gecko      = properties.getWebdriverConfig(BROWSER_TYPE);
        var args;
        
        this.command = gecko.bin;
        args = this.argv    = [];
        
        gecko.argv.forEach(value=>this.argv.push(value));
        [
            // "--marionette-port",properties.getPort(),
          //  "--connect-existing",
             "--port",properties.getPort(),
             "--binary",properties.getBrowserBinary(WEB_BROWSER.toLowerCase())
        
        ].forEach(value=>this.argv.push(value));
        
        // this.options = options||{};
        // this.manage  = new Options();
        this.process    = new WebDriverProcess(gecko.bin, args);
        this.window     = Window.build( WebDriverRestApi.getInstance() );
        this.opts       = options;
        console.log(this);
    }
    
    
    
    // @Override
    stdout(data){
        console.log(`${data}`);
    }
    
    // @Override
    stdErr(data){
        console.log("Error",`${data}`);
    }
}

/***
    @export
*/
exports.GeckoDriver = GeckoDriver;