/***
 public class OperaDriver

 @author    :   Maroder
 @date      :   02/02/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 */
const {AbstractDriver}      = require("./AbstractDriver.js");
const {PropertiesFile}      = require("../lib/PropertiesFile.js");
const {WebDriverProcess}    = require("../lib/WebDriverProcess.js");

class EdgeDriver extends AbstractDriver{

    static WEB_BROWSER  = "MSEDGE";

    constructor( options ){
        super(options);

        let properties = PropertiesFile.getInstance(),
            edge      = properties.getWebdriverConfig(EdgeDriver.WEB_BROWSER.toLowerCase());
        var args = [];

        edge.argv.forEach(value=>args.push(value));
        [
            "--port="+properties.getPort()
        ].forEach(value=>args.push(value));

        this.Hprocess   = new WebDriverProcess( edge.bin, args );
    }

    // @Override
    // @private
    // :void
    async launch(capabilities) {
        try {
            console.log("123456464646464664645");
            this.session = (await super.launch(capabilities)).sessionId;
        } catch (e) {
            console.log(e);
        }
    }

}
/***
 @export
 */
exports.EdgeDriver = EdgeDriver;