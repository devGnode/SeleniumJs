/***
 public class Cookie
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 all methods :
 @return Cookie instance
 */
// @Getter
// @Setter
class Cookie{

    name       = null;
    value      = null;
    path       = null;
    domain     = null;
    secure     = null;
    httpOnly   = null;
    expiry     = "MAX-AGE";

    constructor(name,value,path,domain,secure,httpOnly,expiry){
        this.name       = name||null;
        this.value      = value||null;
        this.path       = path||null;
        this.domain     = domain|| null;
        this.secure     = secure||null;
        this.httpOnly   = httpOnly||null;
        this.expiry     = expiry||"MAX-AGE";
    }

    setName(name){
        this.name = name;
        return this;
    }

    setValue(value){
        this.value = value;
        return this;
    }

    setPath(path){
        this.path = path;
        return this;
    }

    setDomain(domain){
        this.domain = domain;
        return this;
    }

    setSecure(isSecure){
        this.secure = isSecure;
        return this;
    }

    setHttpOnly(isHttp){
        this.httpOnly = isHttp;
        return this;
    }

    setExpiry(expire){
        this.expiry = expire;
        return this;
    }

    getName( ){
        return this.name;
    }

    getValue( ){
        return this.value;
    }

    getPath( ){
        return this.path;
    }

    getDomain( ){
        return this.domain;
    }

    getSecure( ){
        return this.secure;
    }

    getHttpOnly( ){
        return this.httpOnly;
    }

    getExpiry( ){
        return this.expiry;
    }
}
/***
 @export
 */
exports.Cookie = Cookie;