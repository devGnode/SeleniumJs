/***
 public class PropertiesFile
 Singleton class
 
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
*/
const config = require("../config/configuration.json");

class PropertiesFile{
    
    constructor(){
        if(PropertiesFile.instance){
            return PropertiesFile.getInstance();
        }
        this.webDriverConfig    = config;
        PropertiesFile.instance = this;
    }

    getWebdriverConfig(type){   
        
        if(!this.webDriverConfig.webDriver[type]){
            throw new Error(`Unknow webdriver type property : ${type}`);
        }
        return this
            .webDriverConfig
            .webDriver[type];
    }
    
    getBrowserBinary(browser){
        
        if(this.webDriverConfig.bin[browser]===undefined){
            throw new Error(`Unknow browser property : ${type}`);
        }
        return this
            .webDriverConfig
            .bin[browser];
    }
    
    getHost(){
        return this
            .webDriverConfig
            .webDriver
            .remoteHost;
    }
    
    getPort(){
        return this
            .webDriverConfig
            .webDriver
            .remotePort;    
    }
    
    static getInstance(){
        return PropertiesFile.instance;
    }
}

/*
    @export Singleton
*/
exports.PropertiesFile = (new PropertiesFile(),PropertiesFile);