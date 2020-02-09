/***
 public class Logger

 @author    :   Maroder
 @date      :   09/02/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 */
const {Utils}           = require("../utils/Utils.js");
const {PropertiesFile}  = require("../PropertiesFile.js");
const uuid              = require("uuid");

class Logger{

    /***
     * @Parameters
     */
    static parser       = "%time\t%name\t : %type :\t%error";
    static outputLog    = "target/logs";
    static saveLog      = true;
    static logStdout    = true;
    static logLevel     = ["ALL"];

    /***
     * json or string or xml
     */
    static outType      = "string";
    static #oid         = uuid();

    /***
     */
    #name         = null;

    constructor(name) {

        /***
         * Rewrite Logger configuration
         */
        let prop = PropertiesFile.getInstance();
        Logger.parser       = prop.getProperty("loggerParser","%time\t%name\t : %type :\t%error");
        Logger.outputLog    = prop.getProperty("loggerOutputDir", "target/logs");
        Logger.saveLog      = prop.getProperty("saveLog", true);
        Logger.logStdout    = prop.getProperty("logStdout", true);
        Logger.logLevel     = prop.getProperty("logLevel", ["ALL"]);

        this.#name = name;
    }

    warn( ){
        Logger.stdout.apply(null,["warn",this.#name].concat(Array.from(arguments)));
    }

    log( ){
        Logger.stdout.apply(null,["log",this.#name].concat(Array.from(arguments)));
    }

    info( ){
        Logger.stdout.apply(null,["info",this.#name].concat(Array.from(arguments)));
    }

    debug( ){
        Logger.stdout.apply(null,["debug",this.#name].concat(Array.from(arguments)));
    }

    error( ){
        Logger.stdout.apply(null,["error",this.#name].concat(Array.from(arguments)));
    }

    /***
     * @param type, errorMsg [, Object .... ]
     */
    static stdout( ){
        let args = Array.from(arguments);
        var tmp,errorMsg = Logger.parser;

        Object().stream().of(tmp={
            type : args.shift().toUpperCase(),
            name : args.shift(),
            error: Utils.format.apply(null,args),
            time : new Date().getTime()
        }).each((value,key)=>{
            errorMsg = errorMsg.replace(new RegExp(`\%${key}`),value);
        });
        if( Logger.logLevel.indexOf(tmp.type.toUpperCase())>-1||Logger.logLevel.indexOf("ALL")>-1) {

            // merge error line
            if(Logger.saveLog){
               Utils.writeLog(
                   Logger.outputLog,
                   (new Date()).toLocaleDateString( ).replace(/\//g,"-")+"-"+Logger.#oid,
                   errorMsg
               );
            }
            if(Logger.logStdout)
            console.log(errorMsg);
        }
    }

    static factory(name){
        return new Logger(name);
    }
}
/***
 @export
 */
exports.Logger = Logger;