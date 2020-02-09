/***
Exception 

 public class RunTimeException
 public class NotFoundException
 public class ElementNotInteractableException
 public class ElementNotInterceptedException
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {Logger}  = require("../Misc/Logger.js");

class RunTimeException extends Error{

    constructor(logger,msg,code){
        super();
        this.code = code || 0;
        logger.error("RuntimeException %s");
    }
    
    getCode(){
        return this.code;
    }
    
    getMessage( ){
        return this.message;
    }
    
    getStackTrace( ){
        return this.stack;
    }
}

/***
    @export
*/
exports.RunTimeException                = RunTimeException;
