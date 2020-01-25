/***
 public Abstract class AbstractOptions
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 
 all methods :
    @return ChromeOptions instance
*/
class AbstractDriversOptions{
    
    // @private attributes
    constructor(){
        this.capabilities = {};
    }

    // @return this
    setCapability( capabilityName, value ){
        this.capabilities[capabilityName] = value;
        return this;
    }

    // @return this
    setBinary(bin){
        this.setCapability("binary",bin);
        return this;
    }

    // @return this
    setProxy(proxyObject){
        this.capabilities.proxy = proxyObject.toJson();
        return this;
    }

    // @return this
    addArguments(argument){
       if(this.capabilities.args===undefined){
           this.capabilities.args = [argument];
       }else
        if( !this.capabilities.args.map(value=>value===argument)[0] ){
            this.capabilities.args.push(argument);
        };;
        
        return this;
    }

    // @return this
    setBrowserName(browser){
        this.capabilities.browserName = browser;
        return this;
    }

    // @return Object
    getCapabilities(){
        return this.capabilities;
    }
    
}
/***
    @export
*/
exports.AbstractDriversOptions = AbstractDriversOptions;