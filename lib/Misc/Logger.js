/***
 public class Logger

 @author    :   Maroder
 @date      :   09/02/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 */
const {Utils}   = require("../utils/Utils.js");

class Logger{

    static parser = "%time\t%name\t : %type :\t%error";

    #name         = null;

    constructor(name) {
        this.#name = name;
    }

    warn( ){
        Logger.build.apply(null,["warn",this.#name].concat(Array.from(arguments)));
    }

    log( ){
        Logger.build.apply(null,["log",this.#name].concat(Array.from(arguments)));
    }

    info( ){
        Logger.build.apply(null,["info",this.#name].concat(Array.from(arguments)));
    }

    debug( ){
        Logger.build.apply(null,["debug",this.#name].concat(Array.from(arguments)));
    }

    /***
     * @param type, errorMsg [, Object .... ]
     */
    static build( ){
        let args = Array.from(arguments);
        var errorMsg = Logger.parser;

        Object().stream().of({
            type : args.shift().toUpperCase(),
            name : args.shift(),
            error: Utils.format.apply(null,args),
            time : new Date().getTime()
        }).each((value,key)=>{
            errorMsg = errorMsg.replace(new RegExp(`\%${key}`),value);
        });
        console.log(errorMsg);
    }

    static factory(name){
        return new Logger(name);
    }
}
/***
 @export
 */
exports.Logger = Logger;