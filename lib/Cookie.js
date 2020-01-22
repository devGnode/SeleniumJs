
// @Getter
// @Setter
class Cookie{

    constructor(){
        this.name = null;
        this.value = null;
        this.path = null;
        this.domain = null;
        this.secure = null;
        this.httpOnly = null;
        this.expiry = "MAX-AGE";
    }

    setName(name){
        this.name = name;
    }

    setValue(value){
        this.value = value;
    }

    setPath(path){
        this.path = path;
    }

    setDomain(domain){
        this.domain = domain;
    }

    setSecure(isSecure){
        this.secure = isSecure;
    }

    setHttpOnly(isHttp){
        this.httpOnly = isHttp;
    }

    setExpiry(expire){
        this.expire = expire;
    }

}