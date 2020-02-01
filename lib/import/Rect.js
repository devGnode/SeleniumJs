/***
 public class Point
 @author    :   Maroder
 @date      :  01/02/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
const {Dimension}   = require("./Dimension.js");

class Rect extends Dimension{

    constructor(x,y,width,height) {
        super(width,height);
        this.x = x;
        this.y = y;
    }

    getY(){
        return this.y;
    }

    getX(){
        return this.x;
    }

    setY(y){
        this.y = y;
    }

    setX(x){
        this.x = x;
    }

    move(x,y){
        this.x = x;
        this.y = y;
    }

}
/***
 @export
 */
exports.Rect = Rect;