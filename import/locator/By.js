/***
 public static class By

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

*/
const ID                = "id";
const NAME              = "name";
const XPATH             = "xpath";
const TAG_NAME          = "tag name";
const CSS_SELECTOR      = "css selector";
const PARTIAL_LINK_TXT  = "partial link text";
const LINK_TXT          = "link text";
const CLASS_NAME        = "class name";

class By{
    
    // @private attributes
    constructor(method,value){
        this.using = method;
        this.value = value;
    }
    
    getUsing( ){
        return this.using;
    }
    
    getValue( ){
        return this.value;
    }
    
    static id(id){
        return new By(ID,id);
    }
    
    static className(classname){
        return new By(CLASS_NAME,classname);
    }
    
    static tagName(tagname){
        return new By(TAG_NAME,tagname);
    }
    
    static xpath(xpath){
        return new By(XPATH,xpath);
    }
    
    static cssSelector(cssSelector){
        return new By(CSS_SELECTOR,cssSelector);
    }
    
    static linkText(linkText){
        return new By(LINK_TXT,linkText);
    }
    
    static partialLinkText(linkText){
        return new By(PARTIAL_LINK_TXT,linkText);
    }

    static name(name){
        return new By(NAME,name);
    }

}
/***
    @export
*/
exports.By = By;