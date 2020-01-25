/***
 public class Response
 private importation
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 
*/
class Response{
    
    constructor(statusCode,body){
        this.statusCode = statusCode;
        this.body       = body;
    }

    // @return String
    getBody(){
        return this.body;
    }

    // @return int
    getStatusCode(){
        return this.statusCode;
    }

    // @return Object
    getBodyAsObject(){
        return JSON.parse(this.getBody());
    }
}
/***
    @export
*/
exports.Response = Response;