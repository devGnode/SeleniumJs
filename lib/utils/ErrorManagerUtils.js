
class ErrorManagerUtils{

    static errorno = {
        6:404,  //NoSuchDriver
        7:404,  //NoSuchElement
        8:404,  //NoSuchFrame
        9:404,  //UnknownCommand
        10:404, //StaleElementReference
        11:400, //ElementNotVisible
        12:400, //InvalidElementState
        13:500, //UnknownError
        15:0,   //ElementIsNotSelectable
        17:500, //JavaScriptError
        19:404, //XPathLookupError
        21:500, //Timeout
        23:404, //NoSuchWindow
        24:400, //InvalidCookieDomain
        25:500, //UnableToSetCookie
        26:500, //UnexpectedAlertOpen
        27:404, //NoAlertOpenError
        28:500, //ScriptTimeout
        29:0,   //InvalidElementCoordinates
        32:400, //InvalidSelector
        33:500, //SessionNotCreatedException
        34:500, //MoveTargetOutOfBounds

    };

    constructor() {}

    static getStatusError(errorno){
       return ErrorManagerUtils.errorno[errorno]
            ? ErrorManagerUtils.errorno[errorno] : 500;
    }
}
/***
 @exports
*/
exports.ErrorManagerUtils = ErrorManagerUtils;