/***
 public class Response
 private importation
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 
*/
class Response{

    /***
     * @private
     */
    #statusCode = 200;
    #body       = null;

    constructor(statusCode,body){
        this.#statusCode = statusCode;
        this.#body       = body;
    }

    /***
     * @return {null}
     */
    getBody(){
        return this.#body;
    }

    /***
     *
     * @return {number}
     */
    getStatusCode(){
        return this.#statusCode;
    }

    /***
     *
     * @return {void}
     * @param  status
     */
    setStatusCode(status){
        this.#statusCode = status;
    }

    /***
     *
     * @return {Object}
     */
    getBodyAsObject(){
        return JSON.parse(this.getBody());
    }

    /***
     *
     * @return {string}
     */
    getError(){
        let response = this.getBodyAsObject();
        return response.value.error === undefined && response.value.message !== undefined ?
            response.value.message :
            response.value.error !== undefined && response.value.message !== undefined ?
            response.value.error+" : "+response.value.message  :
            "success";
    }

}
/***
    @export
*/
exports.Response = Response;