/***
 public class Waiter

 @author    :   Maroder
 @date      :   01/02/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 */
const {Utils}   = require("../lib/utils/Utils.js");

class Waiter{

    #seconds = 0;
    #driver  = null;

    constructor(driver,seconds) {
        this.#driver  = driver;
        this.#seconds = seconds;
    }

    /***
     *
     * @param  expected callback(driver) :Object
     * @returns {*}
     */
    async until(expected){
        var returned= null;
        let start = new Date().getTime();

        do{
            await Utils.sleep(100);
            returned = await expected.call(null,this.#driver);
        }while( ( returned === undefined || returned === null || returned === false ) && (new Date().getTime()-start)/1000 < this.#seconds );

        if( ( returned === undefined || returned === null || returned === false ) ){
            throw new Error(`waiter until : TimeoutException : you have reached the time limit of ${this.#seconds} second(s)`);
        }

        return returned;
    }

}
/***
 @export
*/
exports.Waiter = Waiter;