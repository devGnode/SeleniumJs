const {GeckoDriver} = require("./import/GeckoDriver.js");
const {ChromeDriver} = require("./import/ChromeDriver.js");

const {Proxy}          = require("./lib/Proxy.js");
const {FirefoxOptions} = require("./import/options/FirefoxOptions.js");
const {ChromeOptions}  = require("./import/options/ChromeOptions.js");

(async()=>{
    var driver;
    
    console.log("[+] Selenium nodeJS ");
    
    var capabilities = new FirefoxOptions();
    var chromecapa  = new ChromeOptions();
    capabilities
        .setBrowserName("firefox")
        .setAcceptUntrustedCertificates(true)
        .setCapability("acceptSslCerts",true);
    
    chromecapa
        .addArguments("--start-maximized")
        .setAcceptInsecureCerts(true)
        .setAcceptSslCerts(true)
        .setProxy( (new Proxy()).setFtpProxy("10.176.205.3:8080").setHttpProxy("10.176.205.3:8080").setSslProxy("10.176.205.3:8080") );
    
    driver = new GeckoDriver(capabilities);
    //driver = new ChromeDriver(chromecapa);
    console.log("[+]",driver.getShellCommandLine( )+" "+driver.getShellArgv().join(" "));
    //try{
        await driver.open();
    /*}catch(e){
        console.log(e);
    }*/
   // console.log(driver);
    await driver.window.maximize();
    await driver.window.minimize();
    await driver.window.maximize();
    
    await driver.window.get("http://google.fr");
    
    console.log( await driver.window.getCurrentUrl() );
    console.log( "Titile ", await driver.window.getTitle() );
    await driver.window.refresh();
    
    setTimeout(()=>{
        //driver.window.delete();
        //console.log("lol",driver.getShellHandle().kill());
    
    },10000);
    setTimeout(()=>{
        //driver.window.close();
        //console.log("lol",driver.getShellHandle().kill());
        driver.exit();
    },20000);
   
        
})();