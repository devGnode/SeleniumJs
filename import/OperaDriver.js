/***
 public class OperaDriver

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 */
const {AbstractDriver}      = require("./AbstractDriver.js");
const {PropertiesFile}      = require("../lib/PropertiesFile.js");
const {WebDriverProcess}    = require("../lib/WebDriverProcess.js");

class OperaDriver extends AbstractDriver{

    static WEB_BROWSER  = "OPERA";

    constructor( capabilities,driverOpts ){
        super(capabilities,driverOpts);

        let properties = PropertiesFile.getInstance(),
            opera      = properties.getWebdriverConfig(OperaDriver.WEB_BROWSER.toLowerCase());
        var args = [];

        opera.argv.forEach(value=>args.push(value));
        [
            "--port="+properties.getPort()
        ].forEach(value=>args.push(value));

        this.Hprocess   = new WebDriverProcess( opera.bin, args );
    }

    // @Override
    // @private
    // :void
    async launch(capabilities) {
        try {
            super.setSessionId( (await super.launch(capabilities)).sessionId );
        } catch (e) {
            throw new Error(e.message);
        }
    }

}
/***
 @export
 */
exports.OperaDriver = OperaDriver;