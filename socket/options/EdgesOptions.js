/***
 public class EdgeOptions
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 all methods :
    @return ChromeOptions instance
*/
const {AbstractDriversOptions} = require("./AbstractDriversOptions.js");

class EdgeOptions extends AbstractDriversOptions{
    
    constructor(){
        super();
    }    
}
/***
    @export
*/
exports.EdgeOptions = EdgeOptions;