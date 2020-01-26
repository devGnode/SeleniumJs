/***
 public class EdgeOptions

 MsEdge Web Api documentation :
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
    }

    // @Override
    setBinary(bin){ return this; }

    // @Override
    setProxy(bin){ return this; }

    // @Override
    addArguments(argument,optionsName){ return this; }

}
/***
    @export
*/
exports.EdgeOptions = EdgeOptions;