/***
 public class HttpQuery
 public class HttpHeader
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {HttpUtils}   = require("./utils/HttpUtils.js");

class HttpQuery{

    #header;
    #data;

    constructor(header,data){
        this.#header = header;
        this.#data   = data;
    }
    
    // :Object
    getHeader(){
       return this.#header;
    }
    
    // :String
    getData(){
        return JSON.stringify(this.#data);
    }
    
    // :void
    async send(){
        try{
            return await HttpUtils.send(this);
        }catch(exception){
            return exception;
        }
    }
    
    static options(){
        return new HttpHeader();
    }
}

/*
    class wrap
*/
class HttpHeader{

    #hostname = null;
    #port     = 8080;
    #path     = null;
    #method   = "GET";
    #header   = null;
    #data     = null;

    // @private
    constructor(){  }
    
    withHostname( hostname ){
        this.#hostname = hostname;
        return this;
    }
    
    withPort(port){
        this.#port = port;
        return this;
    }
    
    withEndPoint(endPoint){
        this.#path = endPoint;
        return this;
    }
    
    withMethod(method){
        this.#method = method;
        return this;
    }
    
    withData(data){
        this.#method = "POST";
        this.#data   = data;
        let length  = (typeof data === "object" ? JSON.stringify(this.#data) : String(data).toString()).length;
        
        if(!this.#header)
        this.#header = {
              'Content-Length': length
        };
        else{
            this.#header["Content-Length"] = length;
        }
        return this;
    }

    withHeader(type, value){
        if(this.#header)
        this.#header[type] = value;
        else{
            (this.#header = { });
            this.#header[type] = value;
        }
        return this;
    }
    
    build(){
        var header = {
            hostname: this.#hostname,
            method  : this.#method,
            port    : this.#port,
            path    : this.#path,
        };
        if(this.#header){
            header.headers = this.#header;
        }
        return new HttpQuery(header,this.#data);
    }
}
/***
    @export
*/    
exports.HttpQuery = HttpQuery;