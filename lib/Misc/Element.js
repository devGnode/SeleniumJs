/***
 public class Element

 @author    :   Maroder
 @date      :   09/02/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 */
class Element{

    #element;

    // @private attributes
    constructor(DomElement) {
        this.#element = DomElement;
    }

    // @return String
    get(){
        if(this.#element.ELEMENT)
            return this.#element.ELEMENT;
        else{
            var tmp;
            for( tmp in this.#element ){
                return this.#element[tmp];
            }
        }

    }
}
/***
 @exports
*/
exports.Element = Element;