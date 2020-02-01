/***
 public class WebElement

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const Exception          = require("./exception/Exception.js");
const {WebDriverRestApi} = require("./restApi/WebDriverRestApi.js");
const {Dimension}        = require("./import/Dimension.js");
const {Point}            = require("./import/Point.js");
const {Rect}             = require("./import/Rect.js");

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

class WebElement{

    static #API =   WebDriverRestApi.getInstance();

    #element;
    #driver;

    // @private
    constructor(driver,elementId){
        this.#element = new Element(elementId);
        this.#driver  = driver;
    }
    
    // @private 
    // :Object
    getElementAsObject(){
        return this.#element;
    }
    
    // @return WebDriver
    getDriver(){
        return this.#driver;
    }
    
    // @return String
    async getAttribute(name){
        let response;
        if((response = await WebElement.#API.getElementAttribute(this.#driver.session,this.#element,name)).getStatusCode()===200){
            return response.getBodyAsObject().value || null;
        }
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return String
    async getText(){
        let response;
        if((response = await WebElement.#API.getText(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return String
    async getTagName(){
        let response;
        if((response = await WebElement.#API.getElementTagName(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value.toLowerCase() || null;
        }
        return null;
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return String
    async getId(){
        return await this.getProperty("id");
    }
    
    // @return String
    async getClassName(className){
        return await this.getProperty("className");
    }
    
    // @return String
    async getCssValue(cssProperty){
        let response;
        if((response = await WebElement.#API.getElementCssProperty(this.#driver.session,this.#element,cssProperty)).getStatusCode()===200){
            return response.getBodyAsObject().value || null;
        }
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return String
    async getProperty(property){
        let response;
        if((response = await WebElement.#API.getElementProperty(this.#driver.session,this.#element,property)).getStatusCode()===200){
            return response.getBodyAsObject().value || null;
        }
        // NoSuchWindow
        // StaleElementReference
    }

    /***
     *
     * @param type
     * @returns {Promise<Rect|null|Dimension>}
     * @private
     */
    async __privateGetSize(type){
        let response;
        if((response = await WebElement.#API.getElementRect(this.#driver.session,this.#element)).getStatusCode()===200){
            let dim = response.getBodyAsObject().value;
            switch(type){
                case "Rect": return new Rect(dim.x,dim.y,dim.width,dim.height); break;
                case "dim": return new Dimension(dim.width,dim.height); break;
                case "point": new Point(dim.x,dim.y); break;
                default: return null;
            }
        }
        // NoSuchWindow
        // StaleElementReference
    }

    // @return Dimension
    async getSize(){
        let response;
        if((response = await WebElement.#API.getElementRect(this.#driver.session,this.#element)).getStatusCode()===200){
            let dim = response.getBodyAsObject().value;
            return new Dimension(dim.width,dim.height);
        }
        // NoSuchWindow
        // StaleElementReference
    }

    // @return Rect
    async getRect(){
        let response;
        if((response = await WebElement.#API.getElementRect(this.#driver.session,this.#element)).getStatusCode()===200){
            let dim = response.getBodyAsObject().value;
            return new Rect(dim.x,dim.y,dim.width,dim.height);
        }
        // NoSuchWindow
        // StaleElementReference
    }


    // @return Point
    async getLocation(){
        let response;
        if((response = await WebElement.#API.getElementRect(this.#driver.session,this.#element)).getStatusCode()===200){
            let dim = response.getBodyAsObject().value;
            return new Point(dim.x,dim.y);
        }
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return boolean
    async isActive(){
        let response;
        if((response = await WebElement.#API.isActive(this.#driver.session,this.#element)).getStatusCode()===200){
            return !!this.#driver,response.getBodyAsObject().value;
        }
        // NoSuchWindow
    }
    
    // @return boolean
    async isEnabled(){
        let response;
        if((response = await WebElement.#API.isEnabled(this.#driver.session,this.#element)).getStatusCode()===200){
            return !!this.#driver,response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return boolean
    async isDisplayed(){
        let response;
        if((response = await WebElement.#API.isDisplayed(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return boolean
    async isSelected(){
        let response;
        if((response = await WebElement.#API.isSelected(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
    }
    
    // @return WebElement
    async findElement(By){
        let response;
        if((response = await WebElement.#API.findElementFromParent(this.#driver.session,By,this.#element)).getStatusCode()===200){
            return new WebElement(this.#driver,response.getBodyAsObject().value);
        }
        // NoSuchWindow
        // NoSuchElement
        // XPathLookupError
    }
    
    // @return Array<WebElement>
    async findElements(By){
        let response;
        if((response = await WebElement.#API.findElementsFromParent(this.#driver.session,By,this.#element)).getStatusCode()===200){
            return Array.from(
                response
                .getBodyAsObject()
                .value
                .map(targetElement=>new WebElement(this.#driver,targetElement))
            );
        }
        // NoSuchWindow
        // NoSuchElement
        // XPathLookupError
    }
    
    // @return void
    async clear(){
        let response;
        if((response = await WebElement.#API.clear(this.#driver.session,this.#element)).getStatusCode()!==200){
            // NoSuchWindow
            // StaleElementReference
            // ElementNotVisible
            // InvalidElementState
        }
        return this;
    }
    
    // @return WebElement
    async click(){
        let response;
        if((response = await WebElement.#API.click(this.#driver.session,this.#element)).getStatusCode()!==200){
            // NoSuchWindow
            // StaleElementReference
            // ElementNotVisible
            // InvalidElementState
        }
        return this;
    }
    
    // @return WebElement
    async sendKeys(value){
        let response;
        var data = this.getDriver().constructor.name === "GeckoDriver" ? {text:value} : {value:[value]};
        if((response = await WebElement.#API.sendKeys(this.#driver.session,this.#element,data)).getStatusCode()!==200){
            console.log("errrrror",response, response.getBody());
            // NoSuchWindow
        }
        return this;
    }
    
    // @return WebElement
    async submit(){
        let response;
        if((response = await WebElement.#API.submit(this.#driver.session,this.#element)).getStatusCode()!==200){
            // NoSuchWindow
            // StaleElementReference
        }
        return this;
    }
    
    // @return Buffer
    async takeScreenshot(scrollBoolean){
        
    }
    
}
/***
    @export
*/
exports.WebElement = WebElement;