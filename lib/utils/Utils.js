/*
 public static class Utils
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/   
const {format}  = require("util");

class Utils{
    
    // :String
    static format( ){
        return format.apply(null,arguments);
    }
    
    // :Promise
    static async sleep(ms){
        return new Promise(resolve=>setTimeout(()=>resolve(true),ms));
    }
    
    // :String
    static bufferToString(data){
        return Buffer
            .from(data,"urf-8")
            .toString();
    }
    
}
/***
    @export
*/
exports.Utils = Utils;