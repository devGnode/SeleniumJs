/***
 public class ChromeApi
 
 -documentation about webdriver endPoints
  and swagger doc.
 @url_doc   :   https://w3c.github.io/webdriver/
 
 - dev
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {WebDriverRestApi} = require("./WebDriverRestApi.js");
const {WebElement}       = require("../WebElement.js");

const webDriverApi = WebDriverRestApi.getInstance();

class ChromeApi{
    
    // @private
    constructor( ){
        this.session = null;
    }
    
    async open(){
        let response;
        if((response = await this.api.open(this.options.getAsObject())).getStatusCode() == 200 ){
            this.session = response.getBodyAsObject().sessionId;
            return response.getBodyAsObject();
        }else;
           // throw new Error(" --- "+response.getStatusCode()+" "+ response.getBody()); 
    }
    
    async close(){
      let response;
      if((response = await webDriverApi.closeWindow(this.session)).getStatusCode === 200 ){
            return response.getBodyAsObject();
        }
    }
    
    async quit(){
        let response;
        if((response = await webDriverApi.deleteSession(this.session)).getStatusCode === 200 ){
          return response.getBodyAsObject();
        }
    }
    
    async get(url){
        let response;
        if((response = await webDriverApi.get(this.session,url)).getStatusCode === 200 ){
            return response.getBodyAsObject();
        }
    }
    
    // :String
    async getCurrentUrl(){
        let response;
        
        if((response = await webDriverApi.getUrl(this.session)).getStatusCode === 200 ){
            return response.getBodyAsObject().value;
        }
        
        return "";
    }
    
    // :String
    async getTitle(){
        let response;
        if((response = await webDriverApi.getTitle(this.session)).getStatusCode() == 200 ){
            return response.getBodyAsObject( ).value;
        }
        
        return "";
    }
    
    async refresh(){
        await this.api.refresh(this.session);
    }
    
    async executeScript(){
        
    }
    
    // :WebElement
    async findElement(By){
        
    }
    
    // :Array<WebElement>
    async findElements(By){
        
    }
    
}
/***
    @exports 
*/
exports.ChromeApi = ChromeApi;