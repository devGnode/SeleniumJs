const {GeckoDriver} = require("./import/GeckoDriver.js");
const {ChromeDriver} = require("./import/ChromeDriver.js");
const {OperaDriver} = require("./import/OperaDriver.js");

const {Proxy}          = require("./lib/import/Proxy.js");
const {FirefoxOptions} = require("./import/options/FirefoxOptions.js");
const {ChromeOptions}  = require("./import/options/ChromeOptions.js");

const {Dimension} = require("./lib/import/Dimension.js");

(async()=>{
    var driver;
    
    console.log("[+] Selenium nodeJS ");
    
    var capabilities = new FirefoxOptions();
    var chromecapa  = new ChromeOptions();
    capabilities
        .setBrowserName("firefox")
        .setAcceptUntrustedCertificates(true)
        .setHeadless(true)
        .setCapability("acceptSslCerts",true);
    
    chromecapa
        .addArguments("--start-maximized")
        .setAcceptInsecureCerts(true)
        .setAcceptSslCerts(true)
        .setHeadless(true)
        .setProxy( (new Proxy()).setFtpProxy("10.176.205.3:8080").setHttpProxy("10.176.205.3:8080").setSslProxy("10.176.205.3:8080") );
    
     driver = new GeckoDriver(capabilities);
    //driver = new ChromeDriver(chromecapa);
    //driver = new OperaDriver();
    console.log("[+]",driver.process().getShellCommandLine( )+" "+driver.process().getShellArgv().join(" "));

    //try{
        await driver.open();
        console.log("Manage ---------------------------->");
        console.log(driver.manage().getSessionId());
        console.log("<-----------------------------");
        console.log("Manage ---------------------------->");
        console.log(driver.manage().window().getSessionId());
        console.log("<-----------------------------");
    /*}catch(e){
        console.log(e);
    }*/
   // console.log(driver);

    await driver.manage().window().maximize();
    await driver.manage().window().minimize();
    await driver.manage().window().maximize();
    await driver.get("https://google.fr");
    console.log( await driver.getCurrentUrl() );
    console.log( "Titile ", await driver.getTitle() );
    await driver.get("https://google.fr/search?q=mdr");
    console.log( await driver.getCurrentUrl() );
    console.log( "Titile ", await driver.getTitle() );
    await driver.navigate().back();
    console.log( await driver.getCurrentUrl() );
    console.log( "Titile ", await driver.getTitle() );
    await driver.navigate().forward();
    console.log( await driver.getCurrentUrl() );
    console.log( "Titile ", await driver.getTitle() );
    //await driver.manage().window().fullscreen();
    let size = await driver.manage().window().getSize();
    let pos  = await driver.manage().window().getPosition();
    console.log( size.getWidth(),  size.getHeight( ) );
    console.log( pos.getX(),  pos.getY( ) );
    // unstable console.log( "SourceCode ", await driver.getPageSource() );

    await driver.manage().window().minimize();
    await driver.manage().window().setSize(new Dimension(350,350));

    return void 0;

    
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