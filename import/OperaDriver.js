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

const WEB_BROWSER   = "OPERA";

class OperaDriver extends AbstractDriver{

    constructor( options ){
        super(options);

        let properties = PropertiesFile.getInstance(),
            opera      = properties.getWebdriverConfig(WEB_BROWSER.toLowerCase());
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
            this.session = (await super.launch(capabilities)).sessionId;
        } catch (e) {
            console.log(e);
        }
    }

}
/***
 @export
 */
exports.OperaDriver = OperaDriver;