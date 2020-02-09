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

    code = 0;
    /***
     * @param logger
     * @param msg
     * @param code
     */
    constructor(logger,msg,code){
        super();
        super.message = msg;
        this.code = code || 0;
        if( logger )
        logger.error(
            "RuntimeException %s %s",
            msg,
            super.stack
        );
        // kill process
    }
    
    getCode(){
        return super.code;
    }
    
    getMessage( ){
        return super.message;
    }
    
    getStackTrace( ){
        return this.message+this.stack;
    }
}
/***
    @export
*/
exports.RunTimeException                = RunTimeException;
