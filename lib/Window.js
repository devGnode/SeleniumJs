/***
 public class Window
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const {WebDriverRestApi} = require("../lib/restApi/WebDriverRestApi.js");
const {Dimension}        = require("./import/Dimension.js");
const {Point}            = require("./import/Point.js");

var webDriverRestApi = WebDriverRestApi.getInstance();

class Window{

    constructor( ){ this.getSessionId = null; }

    // @return void
    async maximize(){
        let response;
        if((response = await webDriverRestApi.maximize(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
    }

    // @return void
    async minimize(){
        let response;
        if((response = await webDriverRestApi.minimize(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
    }

    // @return void
    async fullscreen(){
        let response;
        if((response = await webDriverRestApi.fullScreen(this.getSessionId())).getStatusCode() === 200 ){
            return void 0;
        }
    }

    // @return Dimension
    async getSize(){
        let response;
        if((response = await webDriverRestApi.getWindowSize(this.getSessionId())).getStatusCode() === 200 ){
            let dim = response.getBodyAsObject().value;
            return new Dimension(dim.width,dim.height);
        }

        return null;
    }

    // @return void
    async setSize(dimension){
        let response;
        if((response = await webDriverRestApi.setWindowSize(this.getSessionId(),dimension)).getStatusCode() === 200 ){
            return void 0;
        }
    }

    // @return Point
    async getPosition(){
        let response;
        if((response = await webDriverRestApi.getWindowSize(this.getSessionId())).getStatusCode() === 200 ){
            let post = response.getBodyAsObject().value;
            return new Point(post.x,post.y);
        }

        return null;
    }

    // @return void
    async setPosition(point){
        let response;
        if((response = await webDriverRestApi.setWindowSize(this.getSessionId(),point)).getStatusCode() === 200 ){
            return void 0;
        }
    }

}
/***
    @export
*/    
exports.Window = Window;