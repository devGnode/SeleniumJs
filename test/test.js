const {FirefoxOptions} = require("../import/options/FirefoxOptions.js");
const {ChromeOptions} = require("../import/options/ChromeOptions.js");
const {Proxy} = require("../lib/Proxy.js");

var assert = require('assert');


var ff = new FirefoxOptions();
var cr = new ChromeOptions();
var px = new Proxy();

describe('DriverOptions', function() {


    px.setHttpProxy("127.0.0.1:8080")
        .setSslProxy("127.0.0.1:8080")
        .setFtpProxy("127.0.0.1:8080")
        .setNoProxy("localhost")
        .setNoProxy("*.");
    it('should return -1 when the value is not present', function(done) {
        //assert.equals(-1,-1);
        done();
    });

    ff
        .setAcceptUntrustedCertificates(true)
        .setHeadless(true)
        .setCapability("acceptSslCerts", true)
        .setProxy(px);

    cr.setAcceptInsecureCerts(true)
        .setAcceptSslCerts(true)
        .setProxy(px)
        .addArguments("--start-maximize")
        .addArguments("--enable-automation");

});
console.log(ff);
console.log(cr);

const {WebElement} = require("../lib/WebElement.js");
const {JavascriptExecutor} = require("../lib/js/JavascriptExecutor.js");

var elt = new WebElement({},{ELEMENT:"0.23232323-2"});


let r = JavascriptExecutor.executeScript("Array.from(arguments).forEach(value=>console.log(value));",1,"tmp",elt);

console.log(JSON.stringify(r));
/*try{
    JavascriptExecutor.executeScript();
}catch(e){
    console.log({e:e});
}*/