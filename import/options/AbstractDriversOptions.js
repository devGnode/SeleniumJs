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
        this.capabilities = {
            timeouts:{ script:300000, pageLoad:30000, implicit:0 },
        };
    }

    // @return this
    setCapability( capabilityName, value ){
        this.capabilities[capabilityName] = value;
        return this;
    }

    // @return this
    setScriptTimeout(ms){
        this.capabilities.timeouts.script = ms;
        return this;
    }

    // @return this
    setPageLoadTimeout(ms){
        this.capabilities.timeouts.pageLoad = ms;
        return this;
    }

    // @return this
    setImplicitTimeout(ms){
        this.capabilities.timeouts.implicit = ms;
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

    /***
     * this Abstract method write args directly in
     *  desired capabilities, if args should be to
     *  another sub object use optionName
     *
     * @param argument
     * @param optionsName
     * @returns {AbstractDriversOptions}
     */
    addArguments(argument,optionsName){

        if( optionsName === undefined ) {
            if (this.capabilities.args === undefined)
                this.capabilities.args = [argument];
            else if (this.capabilities.args.args.indexOf(argument)===-1)
                this.capabilities.args.push(argument);
        }else
            if(this.capabilities[optionsName].args.indexOf(argument)===-1)
            this.capabilities[optionsName].args.push(argument);;

        return this;
    }

    // @return this
    setBrowserName(browser){
        this.capabilities.browserName = browser;
        return this;
    }

    // @return this
    setBrowserVersion(version){
        this.capabilities.browserVersion = version;
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