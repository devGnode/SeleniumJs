/***
 Exports module webdriver-js-devgnode

 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
module.exports  = {

    /***
     * @Drivers
     */
    ChromeDriver     : require("../import/ChromeDriver.js"),
    GeckoDriver      : require("../import/GeckoDriver.js"),
    OperaDriver      : require("../import/OperaDriver.js"),
    // EdgesDriver   : require("../import/EdgeDriver.js"),

    /***
     * @Locator
     * @By
     */
    By              : require("../import/locator/By.js"),

    /***
     * @Capabilities
     */
    ChromeOptions   : require("../import/options/ChromeOptions.js"),
    FirefoxOptions  : require("../import/options/FirefoxOptions.js"),
    OperaOptions    : require("../import/options/OperaOptions.js"),
    EdgeOptions     : require("../import/options/EdgesOptions.js"),

    /***
     * @Waiter
     */
    Waiter          : require("../import/Waiter.js"),

    /***
     * @ExpectedConditions
     */
    // ExpectedConditions   : require("../import/ExpectedConditions.js"),


    /***
     * @Exports Basic POJO Objects
     */
    Cookie          : require("../lib/import/Cookie.js"),
    Dimension       : require("../lib/import/Dimension.js"),
    Point           : require("../lib/import/Point.js"),
    Proxy           : require("../lib/import/Proxy.js"),
    Rect            : require("../lib/import/Rect.js")

};