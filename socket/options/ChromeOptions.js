/***
 public class ChromeOptions
 
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
    }
    
    setAcceptInsecureCerts(bool){
        this.setCapability("acceptInsecureCerts",bool);
        return this;
    }
    
    setHeadless(bool){
        this.setCapability("headless",bool);
        return this;
    }
    
    setAcceptSslCerts(bool){
        this.setCapability("acceptSslCerts",bool);
        return this;
    }
    
    // @Override
    addArguments(argument){
       if(this.capabilities["goog:chromeOptions"] === undefined)
            (this.capabilities["goog:chromeOptions"] = {}).args = [argument];
       else
        if( !this.capabilities["goog:chromeOptions"].args.map(value=>value===argument)[0] ){
            this.capabilities["goog:chromeOptions"].args.push(argument);
        };;
        
        return this;
    }
    
    addExtensions(){
        
    }
}
/***
    @export
*/
exports.ChromeOptions = ChromeOptions;