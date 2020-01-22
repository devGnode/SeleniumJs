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
class RunTimeException extends Error{
    
    constructor(msg,code){
        super(msg);
        this.code = code || 0;
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

class ElementNotInteractableException extends RunTimeException{
    
    constructor(msg){
        super(msg);
    }
}

class NotFoundException extends RunTimeException{
    
    constructor(msg){
        super(msg);
    }
}

class ElementNotInterceptedException extends RunTimeException{
    
    constructor(msg){
        super(msg);
    }
}
/***
    @export
*/
exports.RunTimeException                = RunTimeException;
exports.NotFoundException               = NotFoundException;
exports.ElementNotInteractableException = ElementNotInteractableException;
exports.ElementNotInterceptedException  = ElementNotInterceptedException;
