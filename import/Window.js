/***
 public Abstract class Window
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/

class Window{
    
    // @private
    constructor(api){
        this.api     = api;
        this.session = null;
    }
    
    async open(data){
        let response;
        if((response = await this.api.open(data)).getStatusCode() == 200 ){

                this.session = response.getBodyAsObject().value.sessionId;
                //this.session = response.getBodyAsObject().sessionId;

            return response.getBodyAsObject();
        }else
            throw new Error(" --- "+response.getStatusCode()+" "+ response.getBody()); 
    }
    
    async close(){
       await this.api.closeWindow(this.session);
    }
    
    async delete(){
        await this.api.deleteSession(this.session);
    }
    
    async get(url){
        let response;
        if((response = await this.api.get(this.session,url)).getStatusCode === 200 ){
            return response.getBodyAsObject();
        }
    }
    
    // :String
    async getCurrentUrl(){
        let response;
        
        if((response = await this.api.getUrl(this.session)).getStatusCode === 200 ){
            return response.getBodyAsObject().value;
        }
        
        return "";
    }
    
    async maximize(){
        let response;
        if((response = await this.api.maximize(this.session)).getStatusCode() == 200 ){
            return response.getBodyAsObject();
        }else
            throw new Error(" --- "+response.getStatusCode());
        
    }
    
    async minimize(){
        let response;
        if((response = await this.api.minimize(this.session)).getStatusCode() == 200 ){
            return response.getBodyAsObject();
        }else;
            // throw
    }
    
    // :String
    async getTitle(){
        let response;
        if((response = await this.api.getTitle(this.session)).getStatusCode() == 200 ){
            return response.getBodyAsObject( ).value;
        }
        
        return "";
    }
    
    async refresh(){
        await this.api.refresh(this.session);
    }
    
    async executeScript(){
        
    }
    
    static build(api){
        return new Window(api);
    }
    
}
/***
    @export
*/    
exports.Window = Window;