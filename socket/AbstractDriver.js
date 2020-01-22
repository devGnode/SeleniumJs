/***
 public Abstract class AbstractDriver
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 
 public method :
    getBrowserName - config parameter of your started config
    killProcess    - killing force webdriver process
    exit           - exit webbrowser and then kill shell process
    
 Must don't use protected method outside of 
 this framework.
*/
const {ShellExecutionUtils} = require("../lib/utils/ShellExecutionUtils.js");
const {Utils}               = require("../lib/utils/Utils.js");

class AbstractDriver {
    
    // @private attribute
    constructor(browser){
        this.browserName = browser; 
        this.command     = null;
        this.argv        = null;
        this.shellHandle = null;
        this.isLaunched  = false;

        //
        this.process    = null;
    }
    
    // to rewiew
    async open( ){
        /*var slf = this;
        if( !this.isLaunched ){
           await ShellExecutionUtils.launchWebDriver(this)
            .catch(shellHandle=> this.stderr("[-] something wrong with the shell execution !") )
            .then(shellHandle=>{

                if(this.getShellHandle())
                this.stdout(
                    Utils.format("[+] %s webDriver has been lauched pid:=%s ",this.constructor.name,this.getShellHandle().pid)
                );;
           }); 
            this.isLaunched = true;*/
            // Need to wait, sometime
            // webDrive didn't yet launched
            await this.process.launch();
            await Utils.sleep(1000);
            await this.window.open(this.opts);
       // }
    }
    
    // @protected
    // :string
    getShellCommandLine(){
        return this.command;
    }
    
    // @protected
    // :array
    getShellArgv(){
        return this.argv;
    }
    
    // @protected
    // :handle
    getShellHandle(){
        return this.shellHandle;
    }
    
    // :string
    getBrowserName(){
        return this.browserName;    
    }
    
    // :boolean
    killProcess(){
        return this.shellHandle.kill("SIGINT");
    }
    
    // @async
    // :boolean
    async exit(){
        await this.window.delete();
        this.killMessage(this.process.killProcess());
    }
    
    // @protected
    // :void
    killMessage(data){
        console.log("[+] kill message ", `${data}`);
    }
    
    // @protected
    // :void
    stdout(data){
        console.log(`${data}`);
    }

    // @protected
    // :void
    stderr(data){
        this.stdout(data);
    }
    
}
/***
    @export
*/    
exports.AbstractDriver = AbstractDriver;