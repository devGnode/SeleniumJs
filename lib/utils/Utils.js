/*
 public static class Utils
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/   
const {format}        = require("util");
const {writeFile}     = require("fs");
const {writeFileSync} = require("fs");
const {statSync}      = require("fs");
const {mkdirSync}     = require("fs");
const uuid            = require("uuid");

class Utils{

    /***
     * @return {string}
     */
    static format( ){
        return format.apply(null,arguments);
    }

    /***
     * @param ms
     * @return {Promise<void>}
     */
    static async sleep(ms){
        return new Promise(resolve=>setTimeout(()=>resolve(void 0),ms));
    }

    /***
     * @param data
     * @return {string}
     */
    static bufferToString(data){
        return Buffer
            .from(data,"utf-8")
            .toString();
    }

    /***
     *
     * @param outputDirectory
     * @param fileNamePrefix
     * @param base64Data
     * @return {Promise<Buffer|ErrorException>}
     */
    static async writeBase64Image(outputDirectory,fileNamePrefix,base64Data){
        outputDirectory += !outputDirectory.endsWith("/") ? "/" : "";
        fileNamePrefix   =  !fileNamePrefix ? "" : fileNamePrefix+"-";
        if( !Utils.existsDir(outputDirectory) ){
            mkdirSync(outputDirectory,{recursive:true});
        }
        return new Promise((resolve,fail)=>{
            writeFile(outputDirectory+fileNamePrefix+uuid()+".png",base64Data,{encoding:"base64",flag:"w+"},(error)=>{
                if(error) fail(error);
                resolve(Buffer.from(base64Data,"base64"));
            });
        });
    }

    /***
     *
     * @param outputLogDir
     * @param fileName
     * @param data
     * @return void
     */
    static writeLog(outputLogDir,fileName,data){
        outputLogDir += !outputLogDir.endsWith("/") ? "/" : "";
        if( !Utils.existsDir(outputLogDir) ){
            mkdirSync(outputLogDir,{recursive:true});
        }
        writeFileSync(outputLogDir+fileName+".log",data+"\r\n",{ encoding:"utf8", flag:"a"});
    }

    /***
     * @param directory
     * @return {boolean}
     */
    static existsDir( directory ){
        try{
            statSync(directory);
            return true;
        }catch (e) {
            return false;
        }
    }

}
/***
    @export
*/
exports.Utils = Utils;