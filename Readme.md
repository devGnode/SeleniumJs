# seleniumJs

<img src="https://img.shields.io/badge/Git version-1.1.0-yellowgreen"/> <img src="https://img.shields.io/github/languages/top/devGnode/SeleniumJs"/> <img src="https://img.shields.io/badge/Javascript-ES2020-yellow"/> <img src="https://img.shields.io/npm/v/webdriver-js-devgnode"/> <img src="https://img.shields.io/node/v/webdriver-js-devgnode"/>

Little framework webdriver in javascript.

This framework has been written in javascript ES2020
 
### Prerequisites

 For use this package you should to install nodeJs on your platform

- nodeJs >= 12.14.1
- [phoenixnap.com/kb/install-node-js-npm-on-windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
- [nodejs.org/en/](https://nodejs.org/en/)

### Branch

- release : lastest stable version
- develop : Repo to clone ( replace master ) 
- test-integration : Branch for push unit test(s) file(s)

### installation 

#### Import from npm repository package

``
$ npm i webdriver-js-devgnode
``

#### Exportable objects :

##### Webdrivers 

Exports   | Comment   | Version tested
------------ | -------------    | ------------- 
GeckoDriver  | GeckoDriver replace Firefox Driver    | \>\= **72.0**
ChromeDriver |   ---  | \>\= **79.0** 
OperaDriver  | For use this webdriver make sure you have define Opera binary path in these capabilities, or if you are on windows plateform move setup Opera directory to C:\Program Files      | \>\= **66.0**
EdgeDriver   | For use this webdriver make sure you have define Edge binary path in these capabilities ,webdriver need of this it for launch the binary.    | \>\= **79.0** 
<s>IExplorer</s>    | I don't think to implement this webdriver is necessary    | not implemented 

#### WebDriver\( capabilities ***\[, driverOptions \]*** \)

- [Capabilities](https://github.com/devGnode/SeleniumJs#capabilities)
- driverOptions : override configuration &rarr; [see](https://github.com/devGnode/SeleniumJs#configuration-file)
    + ***String*** loggerParser : Log string parser.
    + ***String*** loggerOutputDir : Full path of log directory.
    + ***Boolean*** saveLog : save stdout in file log.
    + ***Boolean*** logStdout : Display in console error message.
    + ***Array*** logLevel : ALL,INFO,DEBUG,WARN,ERROR or void array meaning log OFF.
    + ***Object*** bin : 
        + ***String*** firefox : binary path 
        + ***String*** chrome  : binary path
        + ***String*** opera   : binary path
        + ***String*** msedge  : binary path
    + ***Object*** webdriver
        + ***String*** remoteHost : hostname
        + ***int*** remotePort   : port
            + ***Object*** gecko, chrome, opera, msedge 
                + ***Array*** args   
                + ***String*** bin : webdriver executable
                + ***String*** logLevel : webDriver logLevel
  
Example :

```javascript
const {GeckoDriver}     = require("webdriver-js-devgnode");
const {ChromeDriver}    = require("webdriver-js-devgnode");

new GeckoDriver( );
new ChromeDriver();
```

##### Locator

Exports      | Comment   
------------ | -------------    
By           | By class use the same prototype of Selenium [ &rarr; see doc ](https://selenium.dev/selenium/docs/api/java/org/openqa/selenium/By.html)   

Example :

```javascript
const {By}     = require("webdriver-js-devgnode");

driver.findElement(By.cssSelector(".class tagname"));
driver.findElement(By.xpath("//input"));
```

##### Capabilities

Exports         | Comment   
------------    | -------------    
FirefoxOptions  | Documentation in progress...
ChromeOptions   | Can be useful the list of arguments supported for Chrome/Chromium capabilities [&rarr; Args list](https://peter.sh/experiments/chromium-command-line-switches/)
OperaOptions    | Documentation in progress...
EdgesOptions    | Edge capabilities supported [&rarr; see doc](https://docs.microsoft.com/en-us/microsoft-edge/webdriver)

Example :

```javascript
const {FirefoxOptions,ChromeOptions}  = require("webdriver-js-devgnode");

let ffcap = new FirefoxOptions( )
            .setBinary("/Path/to/my/binary/firefox-esr")
            .setAcceptSslCerts(true)
            .setImplicitTimeout(1000);

let crcap = new ChromeOptions()
            .setAcceptSslCerts(true)
            .setHeadless(true)
            .setEnabledAutomationArgs();
```

##### Waiter

- Waiter

##### ExpectedConditions

- ExpectedConditions <img src="https://img.shields.io/badge/Dev%20status-dev%20in%20progress-green"/> <img src="https://img.shields.io/badge/process-30%25-yellowgreen"/>

##### Others Basic POJO

- Cookie
- Dimension
- Point
- Rect
- Proxy
 
### Configuration file 

Path :
``
 ./config
``

name :
``
configuration.json
``

This configuration file contains some necessaries attributes for proper operation listed below :

- screenOutputDir : ***String*** Define path of screenshots directory *default : "target/screenshots"*
- loggerParser : ***String*** parser defined
    + %time : unix timestamps 
    + %type : ALL,DEBUG,ERROR,INFO,LOG,WARN
    + %error : Error message to displayed
- loggerOutputDir : Define path of logs directory.    *default : "target/logs"*
- logStdout : ***Boolean*** show message in console *default : true*
- saveLog : ***Boolean*** save log *default : true*
- logLevel : ***Array*** :  [ void (, ALL,DEBUG,ERROR,INFO,LOG,WARN )] *default : ["ALL"]*
- bin : ***Object*** Define the full path of web browser binary ( can be rewrite in capability properties ) 
- remoteHost : Web driver remote host
- remotePort : Web driver remote port
- webdriver
    - argv : List of arguments who will be launched with the web driver.
    - bin : Define the full path of web driver binary.
    - logLevel : Define log type  **ALL, DEBUG, INFO, WARNING, SEVERE, OFF**.

it's possible to override these properties when you instantiate the web driver simply passing these Options in the arguments of webDriver

Template :

```
{
	"screenOutputDir": "target/screenshots",

	"loggerParser":     "%time\t%name\t: %type :\t%error",
	"loggerOutputDir":  "target/logs",
	"saveLog":          true,
	"logStdout":        true,
	"logLevel":         ["ALL"],

	"bin":{
		"firefox":    null,
		"chrome":     null,
		"opera":      null,
		"msedge":     null

	},

	"webDriver":{

		"remoteHost":"127.0.0.1",
		"remotePort":4444,

		"gecko":{
			"argv":["-vv"],
			"bin":null,
			"logLevel":null
		},
		"chrome":{
			"argv":["--whitelisted-ips","--log-level=ALL"],
			"bin":null,
			"logLevel":"ALL"
		},
		"opera":{
			"argv":["--whitelisted-ips","--log-level=ALL"],
			"bin":null,
			"logLevel":"ALL"
		},
		"msedge":{
			"argv":["--whitelisted-ips"],
			"bin":null,
			"logLevel":null
		}
	}

}
```


### From git clone ( localhost )

``
$ git clone https://github.com/devGnode/seleniumJs.git
``

```javascript
const {GeckoDriver,ChromeDriver,Proxy} = require("./webdriver-js-devgnode.js");
```

## Import Object

#### WebDriver :

import path :
``
 ./import/
``

- GeckoDriver
- ChromeDriver
- OperaDriver
- EdgesDriver
- Waiter

```javascript
const {GeckoDriver} = require("./import/GeckoDriver.js");

let driver = new GeckoDriver();
```

#### Options ( desired capabilities ) :

import path :
``
 ./import/options
``

- GeckoOptions
- ChromeOptions
- OperaOptions
- EdgesOptions 

```javascript
const {GeckoDriver}  = require("./import/GeckoDriver.js");
const {GeckoOptions} = require("./import/options/GeckoOptions.js");

var desiredCapabilities = (new GeckoOptions())
        .setBrowserName("firefox")
        .setAcceptUntrustedCertificates(true)
        .setCapability("acceptSslCerts",true);

let driver = new GeckoDriver(desiredCapabilities);
```
Options with proxy :

import path :
``
 ./lib/import
``

- Proxy

```javascript
const {GeckoDriver}  = require("./import/GeckoDriver.js");
const {GeckoOptions} = require("./import/options/GeckoOptions.js");
const {Proxy}        = require("./Proxy.js");

var desiredCapabilities = (new GeckoOptions())
        .setBrowserName("firefox")
        .setAcceptUntrustedCertificates(true)
        .setCapability("acceptSslCerts",true)
        .setProxy( (new Proxy()).setFtpProxy("0.0.0.0:8080").setHttpProxy("0.0.0.0:8080").setSslProxy("0.0.0.0:8080") );

let driver = new GeckoDriver(desiredCapabilities);
```

#### DomElement selector :

import path :
``
 ./import/locator
``

- By

```javascript
const {GeckoDriver}  = require("./import/GeckoDriver.js");
const {GeckoOptions} = require("./import/options/GeckoOptions.js");
const {By}           = require("./import/locator/By.js");

(async()=>{

var desiredCapabilities = (new GeckoOptions())
        .setBrowserName("firefox")
        .setAcceptUntrustedCertificates(true)
        .setCapability("acceptSslCerts",true);

let driver = new GeckoDriver(desiredCapabilities);
await driver.open();
await driver.get("https://google.uk");

let input        = await driver.findElement(By.className("q"));
let searchButton = await driver.findElement(By.xpath("//input[contains(@value,'Recherche Google') and @type='submit']"));

await input.sendKeys("Send message");
await searchButton.click();

driver.close();

})();
```
#### Waiter

import path :
``
 ./import/
``

```javascript
const {GeckoDriver}  = require("./import/GeckoDriver.js");
const {GeckoOptions} = require("./import/options/GeckoOptions.js");
const {By}           = require("./import/locator/By.js");
const {Waiter}       = require("./import/Waiter.js");

(async()=>{

var desiredCapabilities = (new GeckoOptions())
        .setBrowserName("firefox")
        .setAcceptUntrustedCertificates(true)
        .setCapability("acceptSslCerts",true);

let driver      = new GeckoDriver(desiredCapabilities);
let shortWait   = new Waiter(driver,10);

await driver.open();
await driver.get("https://google.uk");

let input        = await driver.findElement(By.className("q"));
let searchButton = shortWait.until(async driver=>{
    try{
        return await driver.findElement(By.xpath("//input[contains(@value,'Recherche Google') and @type='submit']"));
    }catch (e) {
      return false;
    }

}).sendKeys("Send message");

await searchButton.click();

driver.close();

})();
```
### looger

getLogger : ***String*** message [, args ... ]

- log
- info
- warn
- debug
- error

```javascript

driver.getLogger().log("message");
driver.getLogger().log("message %s :: %s", "params",125);

```

```
1581273071079	EdgeDriver	: DEBUG :	webDriver has ben launched pid = 24460
1581273071098	EdgeDriver	: LOG :	webDriver session id = d0a82e65f565878005ead66fc288a9f0
1581273074148	EdgeDriver	: LOG :	webDriver go to = https://google.com
1581273075997	EdgeDriver	: LOG :	webDriver go to = https://google.com/search?q=mdr
```

### Stream 

```javascript
 var elts = await driver.findElements(By.cssSelector("a"));
    elts.stream()
    .limit(1)
    .filter(webelement=>webelement.getText()==="i'm a link")
    .get()[0]
    .click();

var elts = await driver.findElements(By.cssSelector("li"));
    elts.stream()
    .allMatch(webelement=>webelement.getClassName().split(/\s*/).indexOf("class")>-1);

```

### implemented 

`` version : 1.1.0``

- Screenshot : WebDriver / WebElement 
- Manage Cookie : add / get / delete 
- Stream
- Logger

### Not implemented yet

- Action Object. <img src="https://img.shields.io/badge/process-0%25-orange"/>
- Window Handle / create new window / frame

### Issue

- When an Exception is raised, the process of webdriver isn't killed correctly the port stay opened
