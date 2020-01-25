const {FirefoxOptions} = require("../import/options/FirefoxOptions.js");
const {ChromeOptions} = require("../import/options/ChromeOptions.js");
const {ShellExecutionUtils} = require("../lib/utils/ShellExecutionUtils.js");
const {Proxy} = require("../lib/Proxy.js");

const assert = require('assert');


var ff = new FirefoxOptions();
var cr = new ChromeOptions();
var px = new Proxy();

describe('Unit Test - DriverOptions', function() {


    px.setHttpProxy("127.0.0.1:8080")
        .setSslProxy("127.0.0.1:8080")
        .setFtpProxy("127.0.0.1:8080")
        .setNoProxy("localhost")
        .setNoProxy("*.");

    ff.setAcceptUntrustedCertificates(true)
        .setHeadless(true)
        .setCapability("acceptSslCerts", true)
        .setProxy(px);

    cr.setAcceptInsecureCerts(true)
        .setAcceptSslCerts(true)
        .setProxy(px)
        .addArguments("--start-maximize")
        .addArguments("--enable-automation");

    it('Proxy Object', function(done) {
        assert.ok(px.toJson());
        assert.ok(px.toJson().httpProxy);
        assert.equal(px.toJson().httpProxy,"127.0.0.1:8080");
        done();
    });
    it('Firefox options', function(done) {
        assert.ok(ff.getCapabilities());
        assert.equal(ff.getCapabilities().proxy.httpProxy,"127.0.0.1:8080");
        done();
    });
    it('Chrome options', function(done) {
        assert.ok(cr.getCapabilities());
        assert.ok(cr.getCapabilities()["goog:chromeOptions"].args.length == 2);
        done();
    });

});

const {WebElement} = require("../lib/WebElement.js");
const {JavascriptExecutor} = require("../lib/js/JavascriptExecutor.js");

var elt = new WebElement({},{ELEMENT:"0.23232323-2"});

describe('Unit Test - WebDriver', function() {

    it('Webdriver', function(done) {
        assert.ok(elt.getElementAsObject());
        assert.equal(elt.getElementAsObject().element.ELEMENT,"0.23232323-2");
        done();
    });

});

var r = JavascriptExecutor.executeScript("Array.from(arguments).forEach(value=>console.log(value));",1,"tmp",elt);

console.log(JSON.stringify(r));
describe('Unit Test - JavascriptExecutor', function() {

    it('fail JavascriptExecutor', function(done) {
        try{
            JavascriptExecutor.executeScript();
            assert.ok(false);
        }catch(e){
            assert.ok(true);
        }
        done();
    });

});

describe('Unit Test - ShellExecutionUtils', function() {

    it('success ls -la ShellExecutionUtils',function(done) {
        var tmp;
        ShellExecutionUtils.launchWebDriver(tmp = {
            getShellArgv:function(){
                return ["-la"]
            },
            getShellCommandLine:function(){
                return "ls"
            },
            stdout:function(){ assert.ok(true); },
            stdErr:function(){ assert.ok(true); },
            killMessage:function(){ assert.ok(true); },
            errorMessage(data) { assert.fail();  }
        });
        tmp.shellHandle.kill("SIGINT");
        done();
    });

    it('ShellExecutionUtils failed commands ',function(done) {
        ShellExecutionUtils.launchWebDriver({
            getShellArgv:function(){
                return []
            },
            getShellCommandLine:function(){
                return "commands"
            },
            stdout:function(){ assert.fail(); },
            stdErr:function(){ assert.fail(); },
            killMessage:function(){ },
            errorMessage(data) { assert.ok(true);   }
        });
        done();
    });

    it('ShellExecutionUtils check shellHandle',function(done) {
        var tmp;
        ShellExecutionUtils.launchWebDriver(tmp = {
            getShellArgv:function(){
                return ["-la"]
            },
            getShellCommandLine:function(){
                return "ls"
            },
            stdout:function(){ },
            stdErr:function(){  },
            killMessage:function(){ assert.ok(true); assert.ok(true); },
            errorMessage(data) { assert.fail();  }
        });
        assert.ok(tmp.shellHandle!==null);
        tmp.shellHandle.kill("SIGINT");
        done();
    });

});

