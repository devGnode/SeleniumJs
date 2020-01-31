/*
 public static class ShellExecution    :
 
 Allow to launch webDriver
 
 To do: 
    Check that this shell is either closed correctly,
    because it is loaded in the background and if it
    doesn't close properly, the port and the webdriver
    continue to run and listen.
    
 @author    :   Maroder
 @date      :   01/17/2020
 @licence   :   GNU/GPL
*/
const {spawn} = require("child_process");
const {Utils} = require("./Utils.js");

class ShellExecutionUtils extends Utils{
    
    /***
     @params GeckoDriver || ChromeDriver || OperaDriver || MsedgeDriver
     @return Promise
    ***/
    static async launchWebDriver(webDriverObject){
        return new Promise(
        (resolve,failed)=>{
            var shell;
            try{    
                shell = spawn(
                    webDriverObject.getShellCommandLine( ),
                    webDriverObject.getShellArgv(),
                    {
                        detached:true,
                        stdio:["pipe","pipe","pipe"]
                });

                // stdio
                shell.stdout.on("data",data=>webDriverObject.stdout(ShellExecutionUtils.bufferToString(data)));
                shell.stderr.on("data",data=>webDriverObject.stderr(ShellExecutionUtils.bufferToString(data)));
                // events
                shell.on("error",error=>webDriverObject.errorMessage(error));
                shell.on("close",data=>webDriverObject.killMessage(data));
                shell.on("exit",code=>{
                    webDriverObject.killMessage(code);
                    shell.kill("SIGINT");
                });
                resolve(shell);
            }catch(e){
                failed(e);
            }
        });
    }
}
/***
    @export
*/    
exports.ShellExecutionUtils = ShellExecutionUtils;