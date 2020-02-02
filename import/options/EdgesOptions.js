/***
 public class EdgeOptions

 MsEdge Web Api documentation : version >= 79
 https://docs.microsoft.com/en-us/microsoft-edge/webdriver

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 all methods :
    @return ChromeOptions instance
*/
const {AbstractDriversOptions} = require("./AbstractDriversOptions.js");

class EdgeOptions extends AbstractDriversOptions{
    
    constructor(){
        super();
        this.capabilities["ms:edgeOptions"] = {
            args:[]
        };
    }

    // @Override
    setBinary(binPath) {
        this.capabilities["ms:edgeOptions"].binary = binPath;
        return this;
    }

    // not supported
    // @Override
    setProxy(bin){ return this; }

    // @Override
    addArguments(argument,optionsName){ Array
        .from(arguments)
        .forEach(args=>super.addArguments(args,"ms:edgeOptions"));
        return this;
    }

}
/***
    @export
*/
exports.EdgeOptions = EdgeOptions;