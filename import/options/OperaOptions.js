/***
 public class OperaOptions
 
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
    }
    
    setAcceptInsecureCerts(bool){
        this.setCapability("acceptInsecureCerts",bool);
        return this;
    }
    
    addExtensions(){
        
    }
}
/***
    @export
*/
exports.OperaOptions = OperaOptions;