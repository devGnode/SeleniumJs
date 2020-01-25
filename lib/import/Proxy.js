/***
 public class Proxy
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
   
  all methods :
    @return Proxy instance except
*/
class Proxy{
    
    // @private attributes
    constructor(){
        this.proxyType          = "manual";
        this.proxyAutoConfigUrl = null;
        this.ftpProxy           = null;
        this.httpProxy          = null;
        this.noProxy            = [];
        this.sllProxy           = null;
        this.socksProxy         = null;
        this.socksVersion       = null;
    }
    
    setProxyType(type){
        if(["pac", "direct", "autodetect", "system", "manual"].indexOf(type)>-1){
            this.proxyType = type;
        }
        return this;
    }
    
    setProxyAutoconfigUrl(url){
        this.proxyAutoConfigUrl = url;
        return this;
    }
    
    setFtpProxy(proxy){
        this.ftpProxy = proxy;
        return this;
    }
    
    setHttpProxy(proxy){
        this.httpProxy = proxy;
        return this;
    }
    
    setSslProxy(proxy){
        this.sslProxy = proxy;
        return this;
    }
    
    setSocksProxy(proxy){
        this.socksProxy = proxy;
        return this;
    }
    
    setSocksVersion(version){
        this.socksVersion = version;
        return this;
    }
    
    setNoProxy(proxy){
        if( !this.noProxy.map(value=>proxy===value)[0] ){
            this.noProxy.push(proxy);
        }
        return this;
    }

    // @return Object
    toJson(){
        var returned = {},
            tmp;
        
        for( tmp in this )
        if(this[tmp]!==null&& typeof this[tmp] !== "function"){
            returned[tmp] = this[tmp];
        };;
        
        return returned;
    }
}
/***
    @export
*/
exports.Proxy = Proxy;