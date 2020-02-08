/***
 public class Point
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
class Point{

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    getY(){
        return this.y;
    }

    getX(){
        return this.x;
    }

    move(x,y){
        this.x = x;
        this.y = y;
    }

}
/***
 @export
 */
exports.Point = Point;