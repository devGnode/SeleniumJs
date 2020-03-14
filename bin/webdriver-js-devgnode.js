/***
 Exports module webdriver-js-devgnode

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
const {ChromeDriver}   = require("../import/ChromeDriver.js");
const {GeckoDriver}    = require("../import/GeckoDriver.js");
const {OperaDriver}    = require("../import/OperaDriver.js");
const {EdgeDriver}     = require("../import/EdgeDriver.js");

const {ChromeOptions}   = require("../import/options/ChromeOptions.js");
const {FirefoxOptions}  = require("../import/options/FirefoxOptions.js");
const {OperaOptions}    = require("../import/options/FirefoxOptions.js");
const {EdgeOptions}     = require("../import/options/EdgesOptions.js");

const {By}              = require("../import/locator/By.js");
const {Waiter}          = require("../import/Waiter.js");
const {ExpectedConditions}  = require("../import/ExpectedConditions.js");

const {Cookie}          = require("../lib/import/Cookie.js");
const {Dimension}       = require("../lib/import/Dimension.js");
const {Point}           = require("../lib/import/Point.js");
const {Proxy}           = require("../lib/import/Proxy.js");
const {Rect}            = require("../lib/import/Rect.js");

module.exports  = {

    /***
     * @Drivers
     */
    ChromeDriver     : ChromeDriver,
    GeckoDriver      : GeckoDriver,
    OperaDriver      : OperaDriver,
    EdgeDriver       : EdgeDriver,

    /***
     * @Locator
     * @By
     */
    By              : By,

    /***
     * @Capabilities
     */
    ChromeOptions   : ChromeOptions,
    FirefoxOptions  : FirefoxOptions,
    OperaOptions    : OperaOptions,
    EdgeOptions     : EdgeOptions,

    /***
     * @Waiter
     */
    Waiter          : Waiter,

    /***
     * @ExpectedConditions
     */
    ExpectedConditions   : ExpectedConditions,


    /***
     * @Exports Basic POJO Objects
     */
    Cookie          : Cookie,
    Dimension       : Dimension,
    Point           : Point,
    Proxy           : Proxy,
    Rect            : Rect

};