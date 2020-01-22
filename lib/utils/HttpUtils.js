/*
 public static class HttpUtils
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/    
const http          = require("http");
const {Utils}       = require("./Utils.js");
const {Response}    = require("../Response.js");

class HttpUtils extends Utils{
    
    /***
        @param HttpQuery
        @return Promise -> Response
    */
    static async send( HttpQuery ){
        return new Promise((resolve,failed)=>{
            var q,data;
            q = http.request(
                HttpQuery.getHeader(),
                query=>{
                
                    query.on("data",response=>{
                        resolve(new Response(query.statusCode,HttpUtils.bufferToString(response)));
                    });
                    
            }).on("error",error=>{
                failed(
                    new Response(500,error.code)
                );
            });

            if((data=HttpQuery.getData())!==null){
                q.write(data);
            }
            q.end();
        });
    }
}
/***
    @export
*/
exports.HttpUtils = HttpUtils;