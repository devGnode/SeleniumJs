/***
 public Abstract class WebDriverProcess
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0
 
 public method :
    getBrowserName - config parameter of your started config
    killProcess    - killing force webdriver process
    exit           - exit webBrowser and then kill shell process
    
 Must don't use protected method outside of 
 this framework.
*/
const {ShellExecutionUtils} = require("./utils/ShellExecutionUtils.js");
const {Utils}               = require("./utils/Utils");
const {Logger}              = require("./Misc/Logger.js");

class WebDriverProcess{

    static #Logger;

    #command;
    #argv;
    #shellHandle;
    #isLaunched;

    // @private attributes
    constructor(command,argv){

        WebDriverProcess.#Logger = Logger.factory(this.constructor.name);
        this.#command     = command;
        this.#argv        = argv;
        this.#shellHandle = null;
        this.#isLaunched  = false;
    }
    
    // to review
    async launch(){

        if( !this.#isLaunched ){
            await ShellExecutionUtils.launchWebDriver(this)
            .catch(shellHandle=> this.stderr((new Date( )).getTime()+"\tAn error occurred while executing shell webdriver") )
            .then(shellHandle=>{
                if( (this.#shellHandle = shellHandle) ){
                    WebDriverProcess.#Logger.debug(
                        "sh $%s %s",
                        this.getShellCommandLine(),
                        this.getShellArgv().join(" ")
                    );
                }
          }); 
          return (this.#isLaunched = true);
        }
        return false;
    }
    
    // :string
    getShellCommandLine(){
        return this.#command;
    }
    
    // :array
    getShellArgv(){
        return this.#argv;
    }

    // :handle
    getShellHandle(){
        return this.#shellHandle;
    }

    // :boolean
    killProcess(){
        return this
            .#shellHandle
            .kill("SIGINT");
    }

    // :void
    killMessage(data){
        //console.log("[+] kill message ", `${data}`,t);
    }

    // :void
    errorMessage(data){
        WebDriverProcess.#Logger.cutom(`Error : ${data}`);
    }
    
    // @param String, Object ...
    // :void
    stdout(){
        if(arguments.length===1){
            console.log(arguments[0]);
            WebDriverProcess.#Logger.custom("%s : %s","Log",arguments[0]);
        }else{
            WebDriverProcess.#Logger.log("%s : %s","Log",Utils.format.apply(null,arguments));
            console.log(Utils.format.apply(null,arguments));
        }
    }

    // @params String, Object ...
    // :void
    stderr(){
        WebDriverProcess.#Logger.custom("%s : %s","Error",Utils.format.apply(null,arguments));
    }
    
}
/***
    @export
*/    
exports.WebDriverProcess = WebDriverProcess;