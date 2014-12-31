/* RETINA READY IMG SRC */
function getImgSrc(img, src, srchigh) {
    var srcResult = src;
    // if high-res screen then change _x1 on _x2
    if (window.devicePixelRatio > 1) {
    	srcResult = srchigh;
    }
    img.onload = null; //protect from second rasing
    img.src = srcResult;    
}
