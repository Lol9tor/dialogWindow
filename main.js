window.onload = function (){
    var btn = document.getElementById("showHide");
    var frame = document.getElementById("frame");
    frame.originHeight = frame.clientHeight;

    btn.onclick = showHideFrame;

    var img = document.getElementById("close");
    img.onclick = deleteFrame;

    var head = document.getElementById('head');
    head.onmousedown = function(e) {
        document.body.onselectstart = function() {
            return false
        };
        document.ondragstart = function() {
            return false
        };
        var self = document.getElementById('frame');
        e = fixEvent(e);

        var coords = getCoords(self);// get coords element div

        var shiftX = e.pageX - coords.x; // получить сдвиг target относительно курсора мыши
        var shiftY = e.pageY - coords.y; //

        function moveAt(e) {
            self.style.left = e.pageX - shiftX + 'px';
            self.style.top = e.pageY - shiftY+ 'px';
        }

        moveAt(e);
        self.style.zIndex = 1000; // above another elements

        document.onmousemove = function(e) {
            e = fixEvent(e);
            moveAt(e);
        };

        head.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            document.ondragstart = null;
            document.body.onselectstart = null;
            self = null;
        };

        return false;

    };

};


function showHideFrame(){
    var frame = document.getElementById("frame");
    if (frame.style.display == "none"){
        frame.style.display = "";
        showFrame();
    }
    else
        hideFrame();
}

function hideFrame() {
    var frame = document.getElementById("frame");
    var btn = document.getElementById("showHide");
    if (frame.clientHeight >= 4){
        frame.style.height = (frame.clientHeight-4)+"px";
        btn.disabled = true;
        setTimeout("hideFrame()", 25);
    }
    else {
       btn.disabled = false;
       frame.style.display = "none";
       btn.textContent = "Show";
    }

}

function showFrame() {
    var frame = document.getElementById("frame");
    var btn = document.getElementById("showHide");
    if (frame.clientHeight < frame.originHeight){
        frame.style.height = (frame.clientHeight+4)+"px";
        btn.disabled = true;
        setTimeout("showFrame()", 25);

    }
    else {
        btn.disabled = false;
        btn.textContent = "Hide";
    }
}

function deleteFrame() {
    var frame = document.getElementById("frame");
    var close = confirm("Close this window?");
    var btn = document.getElementById("showHide");
    if (close) {
        hideFrame();
        setTimeout(function(){
            frame.parentNode.removeChild(frame);
            btn.disabled = true;
        }, 1350);
    }
}

function fixEvent(e) {
    // get object event for IE
    e = e || window.event;

    // add pageX/pageY for IE
    if ( e.pageX == null && e.clientX != null ) {
        var html = document.documentElement;
        var body = document.body;
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }

    // add which for IE
    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
    }

    return e
}

function getCoords(e){
    var left = 0;
    var top  = 0;

    while (e.offsetParent){
        left += e.offsetLeft;
        top  += e.offsetTop;
        e	 = e.offsetParent
    }

    left += e.offsetLeft;
    top  += e.offsetTop;

    return {x:left, y:top}
}
