# seleniumJs

Description of seleniumJs
 
### Prerequisites

 For use this framework/package you should to install nodeJs on your platform

- nodeJs >= 10.16.3
- [https://phoenixnap.com/kb/install-node-js-npm-on-windows]("https://phoenixnap.com/kb/install-node-js-npm-on-windows")
- [https://nodejs.org/en/]("https://nodejs.org/en/")


### Import from npm package

``
$ npm install seleniumJs
``

```javascript
const seleniumJs = require("seleniumJs");

seleniumJs.GeckoDriver;
seleniumJs.GeckoOptions;

```

### From git clone

``
$ git clone https://github.com/devGnode
``

```javascript
const seleniumJs = require("seleniumJs");
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
const {Proxy}        = require("./lib/Proxy.js");

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