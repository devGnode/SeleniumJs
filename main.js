const {ChromeDriver} = require("webdrnpmiver-js-devgnode");

const {GeckoDriver} = require("./import/GeckoDriver.js");
//const {ChromeDriver} = require("./import/ChromeDriver.js");
const {OperaDriver} = require("./import/OperaDriver.js");
const {By} = require("./import/locator/By.js");

const {Proxy}          = require("./lib/import/Proxy.js");
const {FirefoxOptions} = require("./import/options/FirefoxOptions.js");
const {ChromeOptions}  = require("./import/options/ChromeOptions.js");
const {OperaOptions}  = require("./import/options/OperaOptions.js");

const {ExpectedConditions} = require("./import/ExpectedConditions.js");

const {Dimension} = require("./lib/import/Dimension.js");

const {Waiter} = require("./import/Waiter.js");

(async()=>{
    // driver
    var driver;
    
    console.log("[+] Selenium nodeJS ");

    /***
     *
     * @capabilities
     */
    var capabilities = new FirefoxOptions();
    var chromecapa  = new ChromeOptions();
    var opcapa = new OperaOptions();

    capabilities
        .setBrowserName("firefox")
        .setAcceptUntrustedCertificates(true)
        //.setHeadless(true)
        .setCapability("acceptSslCerts",true);
    
    chromecapa
        .addArguments("--start-maximized")
        .setAcceptInsecureCerts(true)
        .setAcceptSslCerts(true);
        //.setHeadless(true);
        //.setProxy( (new Proxy()).setFtpProxy("10.176.205.3:8080").setHttpProxy("10.176.205.3:8080").setSslProxy("10.176.205.3:8080") );

    opcapa
        .setAcceptInsecureCerts(true);


    /***
     * @webDriver
     */
    driver = new GeckoDriver(capabilities);
    //driver = new ChromeDriver(chromecapa);
    //driver = new OperaDriver(opcapa);

    /***
     * @waiter
     */
    var waiter = new Waiter(driver,10);
    console.log("[+]",driver.process().getShellCommandLine( )+" "+driver.process().getShellArgv().join(" "));

    // open Driver
    await driver.open();

    // some Test
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

    // @unstable
    // unstable console.log( "SourceCode ", await driver.getPageSource() );

    /***
     * @resize
     */
    //await driver.manage().window().minimize();
    //await driver.manage().window().setSize(new Dimension(350,350));

    let inpt = await driver.executeScript("return document.getElementsByTagName(\"input\");",125546);
    console.log( inpt.length );

    await driver.navigate().back();
    var elts =
    await waiter.until(async driver=>{
        try{
            return await driver.findElement(By.xpath("//input[@title='Rechercher']"));
        }catch (e) {
            return false;
        }
    });
    //var elts = await driver.findElement(By.xpath("//input[@title='Rechercher']"));
    await elts.sendKeys("je fait ma premiere recher avc google");
    //await elts.sendKeys("\uE006");
    await waiter.until(ExpectedConditions.attributeContains(elts,"name","q"));
    //await elts.clear();

    await elts.isDisplayed();
    ( await waiter.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@name='btnK']"))) ).click();

    var elts1 = await driver.findElement(By.className("gb_ae"));
    await elts1.click();

    var elts2 = await driver.findElement(By.className("RveJvd"));
    await elts2.click();

    await driver.manage().timeouts().getTimeouts();

    setTimeout(async ()=>{
        //driver.window.close();
        //console.log("lol",driver.getShellHandle().kill());
        await driver.quit();
    },20000);
   
        
})();