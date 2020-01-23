/***
 public class AbstractOptions
 
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
    }
    
    setAcceptUntrustedCertificates(bool){
        this.setCapability("acceptInsecureCerts",bool);
        return this;
    }
    
    setHeadless(bool){
        this.setCapability("moz:headless",bool);
        this.setCapability("headless",bool);
        return this;
    }
    
    addExtensions(){
        
    }
    
}
/***
    @export
*/
exports.FirefoxOptions = FirefoxOptions;