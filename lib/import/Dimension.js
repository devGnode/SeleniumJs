/***
 public class Dimension
 @author    :   Maroder
 @date      :   17/01/2020
 @licence   :   GNU/GPL
 @version   :   1.0

 */
class Dimension{

    constructor(w,h) {
        this.width  = w;
        this.height = h;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    setWidth(w){
        this.width = w;
        return this;
    }

    setHeight(h){
       this.height = h;
        return this;
    }
}
/***
 @export
 */
exports.Dimension = Dimension;