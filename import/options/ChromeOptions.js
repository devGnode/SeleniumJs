/***
 public class ChromeOptions

 Chrome cli arguments documentation :
    https://peter.sh/experiments/chromium-command-line-switches/
    + --headless
    + --enable-automation
    + --user-agent

 Chrome options documentation :
    https://chromedriver.chromium.org/capabilities
    + args          : Array chrome cli arguments
    + binary        : path to chrome app
    + extensions

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 all methods :
    @return ChromeOptions instance
*/
const {AbstractDriversOptions} = require("./AbstractDriversOptions.js");

class ChromeOptions extends AbstractDriversOptions{
    
    constructor(){
        super();
        this.capabilities["goog:chromeOptions"] = {
          args:[]
        };
    }

    // @return this
    setAcceptInsecureCerts(bool){
        this.setCapability("acceptInsecureCerts",bool);
        return this;
    }


    // @return this
    setAcceptSslCerts(bool){
        this.setCapability("acceptSslCerts",bool);
        return this;
    }

    // @return this
    setHeadless(bool){
        bool === true ? super.addArguments("--headless","goog:chromeOptions") : void 0;
        return this;
    }

    setEnabledAutomationArgs(){
        super.addArguments("--enable-automation");
        return this;
    }

    // @Override
    setBinary(binPath) {
        this.capabilities["goog:chromeOptions"].binary = binPath;
        return this;
    }

    // @return this
    // @Override
    addArguments(){
        Array
            .from(arguments)
            .forEach(args=>super.addArguments(args,"goog:chromeOptions"));
        return this;
    }
}
/***
    @export
*/
exports.ChromeOptions = ChromeOptions;