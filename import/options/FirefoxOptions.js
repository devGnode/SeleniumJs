/***
 public class AbstractOptions
  firefox commands cli documentation :
    https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options

 firefox options documentation :
    https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
   
 all methods :
    @return ChromeOptions instance
*/
const {AbstractDriversOptions} = require("./AbstractDriversOptions.js");

class FirefoxOptions extends AbstractDriversOptions{
    
    constructor(){
        super();
        this.capabilities["moz:firefoxOptions"] = {
            args:[],prefs:{},log:{level:"info"}
        };
    }

    // @return {FirefoxOptions}
    setAcceptUntrustedCertificates(bool){
        this.setCapability("acceptInsecureCerts",bool);
        return this;
    }

    // @return {FirefoxOptions}
    setHeadless(bool){
        if(bool===true) {
            this.setCapability("moz:headless", bool);
            this.setCapability("headless", bool);
            super.addArguments("--headless", "moz:firefoxOptions");
        }
        return this;
    }

    /***
     * firefox url -> about:config
     * @param prefsNamed
     * @param value
     * @returns {FirefoxOptions}
     */
    setPreferences(prefsNamed,value){
        if(this.capabilities["moz:firefoxOptions"].prefs[prefsNamed] === undefined){
            this.capabilities["moz:firefoxOptions"].prefs[prefsNamed] = value;
        }
        return this;
    }

    // @return {FirefoxOptions}
    setLogLevel(logLevel){
        if(["trace","info","warn","debug","error","fatal","config"].indexOf(logLevel)===-1){
            this.capabilities["moz:firefoxOptions"].log.level = logLevel;
        }
        return this;
    }

    // @Override
    setBinary(binPath) {
        this.capabilities["moz:firefoxOptions"].binary = binPath;
        return this;
    }

    // @Override
    addArguments( ) {
        Array
            .from( arguments )
            .forEach(args=>super.addArguments(args,"moz:firefoxOptions"));
        return this;
    }
}
/***
    @export
*/
exports.FirefoxOptions = FirefoxOptions;