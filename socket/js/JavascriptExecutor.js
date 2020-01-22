/***
 @private
 public static class JavascriptExecutor

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

*/
const {WebElement} = require("../WebElement.js");

class JavascriptExecutor{
    
    constructor(script,args){
        this.script = script;
        this.args   = args;
    }
    
    // @params String, Object ...
    static executeScript( /*script, Object ...*/ ){
        let script, tmp,
            args = [];
        
        if(arguments.length < 1) throw new TypeError("executeScript missing argument");
        script = ( tmp = Array.from(arguments) ).shift();
        tmp.forEach(argument=>{
            
            // WebElement Object
            if(argument instanceof WebElement)
            args.push(argument. getElementAsObject());
            else{
                args.push(argument);
            }
            
        });
        
        return new JavascriptExecutor(script,args);
    }
}
/***
    @export
*/   
exports.JavascriptExecutor = JavascriptExecutor; 