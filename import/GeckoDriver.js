/***
 public Abstract class GeckoDriver

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {AbstractDriver}      = require("./AbstractDriver.js");
const {PropertiesFile}      = require("../lib/PropertiesFile.js");
const {WebDriverProcess}    = require("../lib/WebDriverProcess.js");

class GeckoDriver extends AbstractDriver{

    static WEB_BROWSER  = "FIREFOX";
    static BROWSER_TYPE = "gecko";

    constructor( options ){
        super(options);
        
        let properties = PropertiesFile.getInstance(),
            gecko      = properties.getWebdriverConfig(GeckoDriver.BROWSER_TYPE);
        var args = [];
        
        gecko.argv.forEach(value=>args.push(value));
        [
             "--port",properties.getPort(),
             "--binary",properties.getBrowserBinary(GeckoDriver.WEB_BROWSER.toLowerCase())
        
        ].forEach(value=>args.push(value));

        this.Hprocess   = new WebDriverProcess( gecko.bin, args );
    }

}

/***
    @export
*/
exports.GeckoDriver = GeckoDriver;