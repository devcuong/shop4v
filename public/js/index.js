xOffset = 10, yOffset = 30, $("a.preview").hover(function(e) {
    this.t = this.title, this.title = "";
    var t = this.querySelector("img.lazy").src,
        a = this.querySelector("span#hidden-the-loai").innerText,
        n = this.querySelector("span#hidden-luot-xem").innerText,
        i = this.querySelector("span#hidden-tac-gia").innerText,
        d = this.querySelector("span#hidden-noi-dung").innerText,
        s = ("" != this.t && this.t, "<div id='preview'>");
    s += "<div class='tooltip-box'>", s += "<div class='img-tooltip'>", s += "<img src='" + t + "' alt='Image preview' />", s += "</div>", s += "<div class='info-tooltip'>", s += "<p><label>Thể loại:</label>" + a, s += "</p>", s += "<p><label>Lượt xem:</label>" + n, s += "</p>", s += "<p><label>Tác giả:</label>" + i, s += "</p>", s += "</div>", s += "<div class='clearfix'>", s += "</div>", s += "<div>", s += "<p><label>Nội dung:</label>" + d, s += "</p>", s += "</div>", s += "</div>", s += "</div>", $("body").append(s), $("#preview").css("top", e.pageY - xOffset + "px").css("left", e.pageX + yOffset + "px").fadeIn("fast")
}, function() {
    this.title = this.t, $("#preview").remove()
}), $("a.preview").mousemove(function(e) {
    $("#preview").css("top", e.pageY - xOffset + "px").css("left", e.pageX + yOffset + "px")
});