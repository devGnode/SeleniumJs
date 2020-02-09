/***
 public class Waiter

 @author    :   Maroder
 @date      :   01/02/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 */
const {Utils}               = require("../lib/utils/Utils.js");
const {Logger}              = require("../lib/Misc/Logger.js");
const {RunTimeException}    = require("../lib/exception/RunTimeException.js");

class Waiter{

    static #Logger;

    #seconds = 0;
    #driver  = null;

    constructor(driver,seconds) {

        Waiter.#Logger  = Logger.factory(this.constructor.name);
        this.#driver    = driver;
        this.#seconds   = seconds;
    }

    /***
     *
     * @param  expected callback(driver) :Object
     * @returns {*}
     */
    async until(expected){
        var returned= null;
        let start = new Date().getTime(), lastError;

        // disabled log
        Logger.logStdout = Logger.saveLog = false;
        do{
            try{
                await Utils.sleep(100);
                returned =  await expected.call(null,this.#driver);
            }catch (e) {
                lastError = e;
                returned = null;
            }
        }while( ( returned === undefined || returned === null || returned === false ) && (new Date().getTime()-start)/1000 < this.#seconds );
        // enabled log
        Logger.logStdout = Logger.saveLog = true;

        if( ( returned === undefined || returned === null || returned === false ) ){
            Waiter.#Logger.error("%s - %s","expectedConditions fail",lastError.getStackTrace());
            throw new RunTimeException(Waiter.#Logger,`waiter until : TimeoutException : you have reached the time limit of ${this.#seconds} second(s)`);
        }

        return returned;
    }

}
/***
 @export
*/
exports.Waiter = Waiter;