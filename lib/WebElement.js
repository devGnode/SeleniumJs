/***
 public class WebElement

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const Exception          = require("./exception/Exception.js");
const {Element}          = require("./Misc/Element.js");
const {Utils}            = require("../lib/utils/Utils.js");
const {WebDriverRestApi} = require("./restApi/WebDriverRestApi.js");
const {Dimension}        = require("./import/Dimension.js");
const {Point}            = require("./import/Point.js");
const {Rect}             = require("./import/Rect.js");
const {PropertiesFile}   = require("./PropertiesFile.js");

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
        throw new Error(response.getError());
    }
    
    // @return String
    async getText(){
        let response;
        if((response = await WebElement.#API.getText(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
        throw new Error(response.getError());
    }
    
    // @return String
    async getTagName(){
        let response;
        if((response = await WebElement.#API.getElementTagName(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value.toLowerCase() || null;
        }
        // NoSuchWindow
        // StaleElementReference
        throw new Error(response.getError());
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
        throw new Error(response.getError());
    }
    
    // @return String
    async getProperty(property){
        let response;
        if((response = await WebElement.#API.getElementProperty(this.#driver.session,this.#element,property)).getStatusCode()===200){
            return response.getBodyAsObject().value || null;
        }
        // NoSuchWindow
        // StaleElementReference
        throw new Error(response.getError());
    }

    /***
     *
     * @param type
     * @returns {Promise<Rect|null|Dimension>}
     */
    async getScreen(type){
        let response;
        if(["rect","dim","location"].indexOf(type)>-1) throw new TypeError("wrong arguments : "+type);
        if((response = await WebElement.#API.getElementRect(this.#driver.session,this.#element)).getStatusCode()===200){
            let dim = response.getBodyAsObject().value;
            switch(type){
                case "rect": return new Rect(dim.x,dim.y,dim.width,dim.height); break;
                case "dim": return new Dimension(dim.width,dim.height); break;
                case "point": new Point(dim.x,dim.y); break;
                default: return null;
            }
        }
        // NoSuchWindow
        // StaleElementReference
        throw new Error(response.getError());
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
        throw new Error(response.getError());
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
        throw new Error(response.getError());
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
        throw new Error(response.getError());
    }
    
    // @return boolean
    async isActive(){
        let response;
        if((response = await WebElement.#API.isActive(this.#driver.session,this.#element)).getStatusCode()===200){
            return !!this.#driver,response.getBodyAsObject().value;
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }
    
    // @return boolean
    async isEnabled(){
        let response;
        if((response = await WebElement.#API.isEnabled(this.#driver.session,this.#element)).getStatusCode()===200){
            return !!this.#driver,response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
        throw new Error(response.getError());
    }
    
    // @return boolean
    async isDisplayed(){
        let response;
        if((response = await WebElement.#API.isDisplayed(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
        throw new Error(response.getError());
    }
    
    // @return boolean
    async isSelected(){
        let response;
        if((response = await WebElement.#API.isSelected(this.#driver.session,this.#element)).getStatusCode()===200){
            return response.getBodyAsObject().value;
        }
        // NoSuchWindow
        // StaleElementReference
        throw new Error(response.getError());
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
        throw new Error(response.getError());
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
        throw new Error(response.getError());
    }
    
    // @return void
    async clear(){
        let response;
        if((response = await WebElement.#API.clear(this.#driver.session,this.#element)).getStatusCode()!==200){
            // NoSuchWindow
            // StaleElementReference
            // ElementNotVisible
            // InvalidElementState
            throw new Error(response.getError());
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
            throw new Error(response.getError());
        }
        return this;
    }
    
    // @return WebElement
    async sendKeys(value){
        let response;
        var data = this.getDriver().constructor.name === "GeckoDriver" ? {text:value} : {value:[value]};
        if((response = await WebElement.#API.sendKeys(this.#driver.session,this.#element,data)).getStatusCode()!==200){
            // NoSuchWindow
            throw new Error(response.getError());
        }
        return this;
    }
    
    // @return WebElement
    async submit(){
        let response;
        if((response = await WebElement.#API.submit(this.#driver.session,this.#element)).getStatusCode()!==200){
            // NoSuchWindow
            // StaleElementReference
            throw new Error(response.getError());
        }
        return this;
    }

    /***
     * @return {Promise<Buffer>}
     */
    async takeScreenshot( ){
        let response;
        if((response = await WebElement.#API.elementScreenShot(this.#driver.session,this.#element)).getStatusCode()===200){
            try{
               return  await Utils.writeBase64Image(
                   PropertiesFile.getInstance().getProperty("screenOutputDir"),
                   null,
                   response.getBodyAsObject().value
               );
            }catch (e) {
                throw new Error(e.message);
            }
        }
        // NoSuchWindow
        throw new Error(response.getError());
    }
    
}
/***
    @export
*/
exports.WebElement = WebElement;