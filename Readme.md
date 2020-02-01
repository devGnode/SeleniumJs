<img src="https://img.shields.io/badge/Version-1.0.0-yellow"/>

# seleniumJs

Dev in progress....

Description of seleniumJs
 
### Prerequisites

 For use this framework/package you should to install nodeJs on your platform

- nodeJs >= 10.16.3
- [phoenixnap.com/kb/install-node-js-npm-on-windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
- [nodejs.org/en/](https://nodejs.org/en/)

### Branch

- release : Lastest stable version
- develop : Repo to clone ( replace master ) 
- test-integration : Branch for push unit test(s) file(s)

### installation 

#### Import from npm package

``
$ npm install webdriver-js-devgnode
``

```javascript
const seleniumJs = require("webdriver-js-devgnode");

seleniumJs.GeckoDriver;
seleniumJs.GeckoOptions;

```

#### From git clone

``
$ git clone https://github.com/devGnode/seleniumJs.git
``

```javascript
const seleniumJs = require("./lib/main.js");
```

## Import Object

WebDriver :

import path :
``
 ./import/
``

- GeckoDriver
- ChromeDriver
- OperaDriver
- MSedgeDriver

```javascript
const {GeckoDriver} = require("./import/GeckoDriver.js");

let driver = new GeckoDriver();
```

Options ( desired capabilities ) :

import path :
``
 ./import/
``

- GeckOptions
- ChromeOptions
- OperaOptions
- MsedgeOptions

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
 ./lib
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

DomElement selector :

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
