/***
 public Abstract class ChromeDriver
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {AbstractDriver}      = require("./AbstractDriver.js");
const {PropertiesFile}      = require("../lib/PropertiesFile.js");
const {WebDriverProcess}    = require("../lib/WebDriverProcess");

class ChromeDriver extends AbstractDriver{

    static WEB_BROWSER = "CHROME";

    constructor( capabilities, driverOpts ){
        super(capabilities,driverOpts);

        let properties = PropertiesFile.getInstance(),
            chrome      = properties.getWebdriverConfig(ChromeDriver.WEB_BROWSER.toLowerCase());
        var args = [];

        chrome.argv.forEach(value=>args.push(value));
        [
         "--port="+properties.getPort(),
        
        ].forEach(value=>args.push(value));

        this.Hprocess    = new WebDriverProcess( chrome.bin, args );

    }

    // @Override
    // @private
    // :void
    async launch(capabilities){
        try {
            this.session = (await super.launch(capabilities)).sessionId;
        }catch(e){
            console.log(e);
        }
    }

}
/*
    @export
*/
exports.ChromeDriver = ChromeDriver;