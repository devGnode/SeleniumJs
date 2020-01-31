/***
 public class By

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

*/
class By{

    // unsupported but implemented
    static #ID                  = "id";
    static #CLASS_NAME          = "class name";
    // supported
    static #XPATH               = "xpath";
    static #NAME                = "name";
    static #TAG_NAME            = "tag name";
    static #CSS_SELECTOR        = "css selector";
    static #PARTIAL_LINK_TXT    = "partial link text";
    static #LINK_TXT            = "link text";

    // @private attributes
    constructor(method,value){
        this.using = method;
        this.value = value;
    }

    // @return String
    getUsing( ){
        return this.using;
    }

    // @return String
    getValue( ){
        return this.value;
    }

    // @return By
    static id(id){
        return new By(By.#CSS_SELECTOR,"#"+id);
    }

    // @return By
    static className(classname){
        return new By(By.#CSS_SELECTOR,"."+classname);
    }

    // @return By
    static tagName(tagName){
        return new By(By.#TAG_NAME,tagName);
    }

    // @return By
    static xpath(xpath){
        return new By(By.#XPATH,xpath);
    }

    // @return By
    static cssSelector(cssSelector){
        return new By(By.#CSS_SELECTOR,cssSelector);
    }

    // @return By
    static linkText(linkText){
        return new By(By.#LINK_TXT,linkText);
    }

    // @return By
    static partialLinkText(linkText){
        return new By(By.#PARTIAL_LINK_TXT,linkText);
    }

    // @return By
    static name(name){
        return new By(By.#NAME,name);
    }

}
/***
    @export
*/
exports.By = By;