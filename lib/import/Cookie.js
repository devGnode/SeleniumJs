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

    constructor(){
        this.name       = null;
        this.value      = null;
        this.path       = null;
        this.domain     = null;
        this.secure     = null;
        this.httpOnly   = null;
        this.expiry     = "MAX-AGE";
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
        this.expire = expire;
        return this;
    }

}
/***
 @export
 */
exports.Cookie = Cookie;