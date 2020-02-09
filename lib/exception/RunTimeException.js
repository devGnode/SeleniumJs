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

    /***
     * @param logger
     * @param msg
     * @param code
     */
    constructor(logger,msg,code){
        super();
        this.code = code || 0;
        if( logger )
        logger.error(
            "RuntimeException %s %s",
            msg,
            super.stack
        );
    }
    
    getCode(){
        return this.code;
    }
    
    getMessage( ){
        return this.message;
    }
    
    getStackTrace( ){
        return this.message+this.stack;
    }
}
/***
    @export
*/
exports.RunTimeException                = RunTimeException;
