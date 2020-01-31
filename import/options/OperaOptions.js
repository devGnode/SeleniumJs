/***
 public class OperaOptions

 Opera commands line cli documentation:
    https://peter.sh/experiments/chromium-command-line-switches/

 Opera capabilities options documentation :4
    https://sny.no/2011/10/capabilities

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 all methods :
    @return ChromeOptions instance
*/
const {AbstractDriversOptions} = require("./AbstractDriversOptions.js");

class OperaOptions extends AbstractDriversOptions{
    
    constructor(){
        super();
        this.capabilities["operaOptions"] = {
            args:[]
        };
    }

    // @return this
    setAcceptInsecureCerts(bool){
        this.setCapability("acceptInsecureCerts",bool);
        return this;
    }

    // @Override
    setBinary(binPath) {
        this.capabilities["operaOptions"].binary = binPath;
        return this;
    }

    // @Override
    addArguments( ) {
        Array
            .from( arguments )
            .forEach(args=>super.addArguments(args,"operaOptions"));
        return this;
    }

}
/***
    @export
*/
exports.OperaOptions = OperaOptions;