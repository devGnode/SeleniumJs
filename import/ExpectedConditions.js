const {WebElement}       = require("../lib/WebElement.js");
const {By}               = require("./locator/By.js");

class ExpectedConditions{

    constructor() {}

    /***
     * @param locator||WebElement
     * @param attr
     * @param value
     * @returns {function(...[*]=)}
     */
    static attributeContains(locator,attr,value){
        return async function(driver){
            var element;
            try {
                element = locator instanceof By ? driver.findElement(locator) : locator;
               if( await element.getAttribute(attr) === value ) {
                   return element;
               }
            }catch(e){
                return false;
            }
            return false;
        };
    }

    /***
     * @param By
     * @returns {Promise<function(...[*]=)>}
     */
    static presenceOfElementLocated(By){
        return async function(driver){
            try{
                return await driver.findElement(By);
            }catch (e) {
                return false;
            }
        };
    }

    /***
     * @param By
     * @param regexp
     * @returns {function(...[*]=)}
     */
    static textMatches(By, regexp ){
        return async function(driver){
            try{
                let element = await driver.findElement(By);
                if(regexp.test( element.getText() )){
                    return element;
                }
            }catch (e) {
                return false;
            }
            return false;
        };
    }

    /***
     * @param webElement
     * @returns {function(...[*]=)}
     */
    static visibilityOf(webElement){
        return async function( ){
            try{
                if( await webElement.isDisplayed() ){
                    return webElement;
                }
            }catch (e) {
                return false;
            }
            return false;
        };
    }

    /***
     * @param by
     * @returns {function(*): function(...[*]=)}
     */
    static visibilityOfElementLocated(by){
        return async (driver)=>{
            return ExpectedConditions.visibilityOf(by instanceof By ? driver.findElement(by) : by);
        };
    }

    /***
     * @param Array<webElement>
     * @returns {function(...[*]=)}
     */
    static visibilityOfAllElements(webElements){
        return async function( ){
          try{
              var webElement = null,
                  returned = [];

              for(webElement in webElements){
                    if(webElement instanceof WebElement)
                    returned.push(await webElement.isDisplayed());
              }
              if( returned.filter(visibility=>visibility===false).length > 0 )
                  return webElements;

          }catch (e) {
              return false;
          }
            return false;
        };
    }

    /***
     * @param by
     * @returns {function(*): function(...[*]=)}
     */
    static visibilityOfAllElementsLocatedBy(by){
        return async (driver)=> {
            return ExpectedConditions
                .visibilityOfAllElements(by instanceof By ? driver.findElement(by) : by);
        };
    }
}
/***
 @exports
*/
exports.ExpectedConditions = ExpectedConditions;