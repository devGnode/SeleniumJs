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
                    var chunck = "";

                    query.on("data",response=>{
                        chunck += HttpUtils.bufferToString(response);
                    });
                    query.on('end',response=>{
                        resolve(new Response(query.statusCode,chunck));
                    });

            }).on("error",error=>{
                failed(
                    new Response(500, JSON.stringify({error:error.code,message:error.code}))
                );
            });

            if((data=HttpQuery.getData())!==null){
                try{
                    q.write(data);
                }catch (e) {
                    throw new Response(500, JSON.stringify({error:e.code,message:e.code}))
                }

            }
            q.end();
        });
    }
}
/***
    @export
*/
exports.HttpUtils = HttpUtils;