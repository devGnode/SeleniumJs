# seleniumJs

<img src="https://img.shields.io/badge/Version-1.0.0-yellowgreen"/> <img src="https://img.shields.io/badge/Javascript-ES2020-yellow"/>

Little framework webdriver in javascript.

This framework has been written in javascript ES2020
 
### Prerequisites

 For use this package you should to install nodeJs on your platform

- nodeJs >= 12.14.1
- [phoenixnap.com/kb/install-node-js-npm-on-windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
- [nodejs.org/en/](https://nodejs.org/en/)

### Branch

- release : Lastest stable version
- develop : Repo to clone ( replace master ) 
- test-integration : Branch for push unit test(s) file(s)

### installation 

#### Import from npm repository package

``
$ npm i webdriver-js-devgnode
``

```javascript
const {GeckoDriver}     = require("webdriver-js-devgnode");
const {ChromeDriver}    = require("webdriver-js-devgnode");
const {FirefoxOptions}  = require("webdriver-js-devgnode");

new GeckoDriver( );
new ChromeDriver();
```

### Exporable object

#### Drivers

- GeckoDriver
- ChromeDriver
- OperaDriver

#### Locator

- By

#### Capabilities

- FirefoxOptions
- ChromeOptions
- OperaOptions
- EdgesOptions

#### Waiter

- Waiter

#### ExpectedConditions

- Dev in progress...

#### Another Basic POJO

- Cookie
- Dimension
- Point
- Rect
- Proxy
 

#### From git clone ( localhost )

``
$ git clone https://github.com/devGnode/seleniumJs.git
``

```javascript
const seleniumJs = require("./webdriver-js-devgnode.js");
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
- EdgesDriver : dev in progress ...
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
- EdgesOptions  : dev in progress ....

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
