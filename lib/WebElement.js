/***
 public class WebElement

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const Exception          = require("./exception/Exception.js");
const {WebDriverRestApi} = require("./restApi/WebDriverRestApi.js");
const webDriverApi       = WebDriverRestApi.getInstance();

class Element{

    constructor(DomElement) {
        this.element = DomElement;
    }

    get(){
        var tmp;
        for( tmp in this.element ){
            return this.element[tmp];
        }
        return null;
    }
}

class WebElement{
    
    // @private
    constructor(driver,elementId){
        this.element = new Element(elementId);
        this.driver  = driver;
    }
    
    // @private 
    // :Object
    getElementAsObject(){
        return this.element;
    }
    
    // :WebDriver
    getDriver(){
        return this.driver;
    }
    
    // :String
    getAttribute(name){
        
    }
    
    // :String
    getText(){
        
    }
    
    // :String
    getTagName(){
        
    }
    
    // :String
    getId(){
        
    }
    
    // :String
    getClassName(className){
        
    }
    
    // :String
    getCssValue(cssProperty){
        
    }
    
    // :String
    getProperty(property){
        
    }
    
    // :Size
    getSize(){
        
    }
    
    // :Position
    getPosition(){
        
    }
    
    // :boolean
    isActive(){
        
    }
    
    // :boolean
    isEnabled(){
        
    }
    
    // :boolean
    isDisplayed(){
        
    }
    
    // :boolean
    isSelected(){
        
    }
    
    // :WebElement
    findElement(By){
        let response;
        if((response=webDriverApi.findElement(this.driver.session,this.element.get()).getStatusCode()===200)){
            return new WebElement(response.getBodyAsObject().value);
        }
    }
    
    // :WebElement
    findElements(by){

       //return new WebElement(this.getDriver(),);
    }
    
    // :WebElement
    clear(){
        
        
        return this;
    }
    
    // :WebElement
    click(){
        
        return this;
    }
    
    // :WebElement
    sendKeys(){
        
        return this;
    }
    
    // :WebElement
    submit(){
     
        return this;
    }
    
    // :Buffer
    takeScreenshot(scrollBoolean){
        
    }
    
}
/***
    @export
*/
exports.WebElement = WebElement;