function changeToSlug(e) { return ("@" + e.toLowerCase().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a").replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e").replace(/i|í|ì|ỉ|ĩ|ị/gi, "i").replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o").replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u").replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y").replace(/đ/gi, "d").replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "").replace(/ /gi, "-").replace(/\-\-\-\-\-/gi, "-").replace(/\-\-\-\-/gi, "-").replace(/\-\-\-/gi, "-").replace(/\-\-/gi, "-") + "@").replace(/\@\-|\-\@|\@/gi, "") }
if ($(document).ready(function() { $("#truyen-de-cu").owlCarousel({ loop: !0, margin: 10, nav: !0, dots: !1, autoplay: !0, autoplayTimeout: 1e3, autoplayHoverPause: !0, navText: ['<i class="fa fa-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-right" aria-hidden="true"></i>'], responsive: { 0: { items: 2 }, 600: { items: 2 }, 1e3: { items: 5 } } }) }), $(".visited-comics-page").length && "undefined" != typeof Storage)
    if (void 0 !== localStorage["visited-comics"])
        if (0 < (H = JSON.parse(localStorage["visited-comics"])).length) { var L = $("<div>").addClass("row"); for (b = H.length - 1; 0 <= b; b--) { var XA = $("<div>").addClass("col-md-3 col-truyen"),
                    I = H[b],
                    O = $("<div>").addClass("item"),
                    R = $("<figure>").addClass("clearfix"),
                    W = $("<div>").addClass("image"),
                    U = $("<a>").attr("title", I.name).attr("href", I.url),
                    B = $("<img>").addClass("lazy").attr("alt", I.name).attr("data-original", I.image).attr("src", I.image),
                    G = $("<div>").addClass("view");
                $("<a>").addClass("visited-remove").attr("href", "#").data("id", I.id).html('<i class="fa fa-times"></i> Xóa').click(function(e) { return e.preventDefault(), V($(this)), !1 }).appendTo(G), U.append(B), W.append(U).append(G); var M = $("<figcaption>"),
                    _ = $("<h3>"),
                    P = $("<ul>"),
                    E = $("<li>").addClass("chapter clearfix"),
                    D = $("<a>").html('Đọc tiếp <i class="fa fa-angle-double-right"></i>').attr("href", I.chapterUrl),
                    N = $("<i>").text(I.chapterName).addClass("time"),
                    z = $("<a>").html(I.name).attr("title", I.name).attr("href", I.url);
                _.append(z), E.append(D).append(N), P.append(E), M.append(_).append(P), R.append(W).append(M), O.append(R), L.append(XA), XA.append(O) }
            $(".visited-comics-page").empty().append(L) } else $(".visited-comics-page").html("Bạn chưa đọc truyện nào.");
else $(".visited-comics-page").html("Bạn chưa đọc truyện nào.");
if ($(".visited-comics").length && "undefined" != typeof Storage && void 0 !== localStorage["visited-comics"] && 0 < (H = JSON.parse(localStorage["visited-comics"])).length) { var titleHistory = "<div class='title-history'><h4>Lịch sử đọc truyện<a class='view-all' href='/lich-su'>tất cả></a></h4></div>";
    L = $("<div>").addClass("box darkBox"), P = $("<ul>").addClass("list-unstyled"); var J = 0; for (b = H.length - 1; 0 <= b; b--) { I = H[b], E = $("<li>").addClass("clearfix"); var F = $("<div>").addClass("t-item");
        E.append(F), U = $("<a>").addClass("thumb").attr("title", I.name).attr("href", I.chapterUrl), B = $("<img>").addClass("lazy").attr("alt", I.name).attr("data-original", I.image).attr("src", "//images.weserv.nl/?url=" + I.image + "&w=80"), U.append(B), F.append(U), _ = $("<h3>").addClass("t-title"), z = $("<a>").html(I.name).attr("href", I.chapterUrl), _.append(z), F.append(_); var q = $("<p>").addClass("chapter"),
            K = $("<a>").html("Đọc tiếp " + I.chapterName + ' <i class="fa fa-angle-double-right"></i>').attr("href", I.chapterUrl),
            X = $("<span>").addClass("view pull-right"); if ($("<a>").addClass("visited-remove").attr("href", "#").data("id", I.id).html('<i class="fa fa-times"></i> Xóa').click(function(e) { return e.preventDefault(), V($(this)), !1 }).appendTo(X), q.append(K).append(X), F.append(q), P.append(E), 2 < ++J) break }
    L.append(P), $(".visited-comics").empty(), $(".visited-comics").append(titleHistory), $(".visited-comics").append(L) }

function V(e) { if ("undefined" != typeof Storage && void 0 !== localStorage["visited-comics"]) { var t = JSON.parse(localStorage["visited-comics"]),
            a = $(e).data("id"); if (0 < t.length) { var i = t.map(function(e) { return e.id }).indexOf(a); - 1 < i && (t.splice(i, 1), localStorage["visited-comics"] = JSON.stringify(t), $(e).parents(".item").remove(), $(e).parents("li").remove()) } } }
jQuery.ui.autocomplete.prototype._resizeMenu = function() { this.menu.element.outerWidth(this.element.outerWidth()) }, $(function() { $("#search-input").autocomplete({ source: function(e, t) { $.ajax({ type: "post", url: "/tim-truyen/tu-khoa", dataType: "json", data: { tuKhoa: e.term }, success: function(e) { t($.map(e, function(e) { var t = "/truyen-tranh/" + e.slug_truyen + "/"; return { label: e.ten_truyen, url: t } })) } }) }, minlength: 2, select: function(e, t) { window.location.href = t.item.url }, open: function() {}, close: function() {} }) });
for (var allTheLoai = theLoai.size, i = 0; i < allTheLoai; i++) { var a = $("<a>"),
        b = $("<div>").addClass("col-md-3 col-6");
    a.attr("href", "/tim-truyen/" + theLoai.get(i)[0]), a.attr("title", theLoai.get(i)[1]), a.text(theLoai.get(i)[1]), b.append(a), $("footer .row").append(b) }
var listCategory = $(".dropdown-item");
for (i = 0; i < listCategory.length; i++) listCategory[i].setAttribute("href", "/tim-truyen/" + changeToSlug(listCategory[i].innerText.trim()));
for (var elementPerCol = theLoai.size / 4, lastElementCol = theLoai.size - 3 * Math.round(elementPerCol), col1 = elementPerCol, col2 = elementPerCol, col3 = elementPerCol, col4 = lastElementCol, j = (a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), 0); j < Math.round(col1); j++) { var c = $("<li>");
    (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c) }
for (a.append(b), $(".multi-column .row").append(a), a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), j = 12; j < Math.round(col1) + Math.round(col2); j++) c = $("<li>"), (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c);
for (a.append(b), $(".multi-column .row").append(a), a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), j = 24; j < Math.round(col1) + Math.round(col2) + Math.round(col3); j++) c = $("<li>"), (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c);
for (a.append(b), $(".multi-column .row").append(a), a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), j = 36; j < Math.round(col1) + Math.round(col2) + Math.round(col3) + Math.round(col4); j++) { var d;
    c = $("<li>"), (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c) }
a.append(b), $(".multi-column .row").append(a);
var btn = $("#back-home-button");
$(window).scroll(function() { 300 < $(window).scrollTop() ? btn.addClass("show") : btn.removeClass("show") }), btn.on("click", function(e) { e.preventDefault(), $("html, body").animate({ scrollTop: 0 }, "300") }), xOffset = 10, yOffset = 30, $("a.preview").hover(function(e) { this.t = this.title, this.title = ""; var t = this.querySelector("img.lazy-hinh").src,
        a = this.querySelector("span#hidden-the-loai").innerText,
        i = this.querySelector("span#hidden-luot-xem").innerText,
        r = this.querySelector("span#hidden-tac-gia").innerText,
        n = this.querySelector("span#hidden-noi-dung").innerText,
        l = ("" != this.t && this.t, "<div id='preview'>");
    l += "<div class='tooltip-box'>", l += "<div class='img-tooltip'>", l += "<img src='" + t + "' alt='Image preview' />", l += "</div>", l += "<div class='info-tooltip'>", l += "<p><label>Thể loại:</label>" + a, l += "</p>", l += "<p><label>Lượt xem:</label>" + i, l += "</p>", l += "<p><label>Tác giả:</label>" + r, l += "</p>", l += "</div>", l += "<div class='clearfix'>", l += "</div>", l += "<div>", l += "<p><label>Nội dung:</label>" + n, l += "</p>", l += "</div>", l += "</div>", l += "</div>", $("body").append(l), $("#preview").css("top", e.pageY - xOffset + "px").css("left", e.pageX + yOffset + "px").fadeIn("fast") }, function() { this.title = this.t, $("#preview").remove() }), $("a.preview").mousemove(function(e) { $("#preview").css("top", e.pageY - xOffset + "px").css("left", e.pageX + yOffset + "px") });
var nodes = document.querySelectorAll(".needs_to_be_rendered");
timeago.render(nodes, "vi"), timeago.cancel();
var numberNodes = document.querySelectorAll(".needs_to_format");
for (i = 0; i < numberNodes.length; i++) numberNodes[i].innerHTML = numberNodes[i].innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
if ($("body").hasClass("view-chapter") && "undefined" != typeof Storage && (c = $(".chapter-id").data("id"))) { if (void 0 !== localStorage["visited-chapters"]) { if (-1 == (H = JSON.parse(localStorage["visited-chapters"])).indexOf(c)) { if (H.push(c), 2e3 < H.length)
                for (b = 0; b < 1500; b++) H.shift();
            localStorage["visited-chapters"] = JSON.stringify(H) } } else(O = []).push(c), localStorage["visited-chapters"] = JSON.stringify(O); var x = $(".breadcrumb li").eq(2).find("a"),
        A = $(".breadcrumb li").eq(3).find("a"),
        k = $('meta[itemprop="image"]').attr("content"); if (x && A && k) { var S = $("#hidden-id-truyen").val(); if (j = { id: S, image: k, name: x.find("span").html(), url: x.attr("href"), chapterName: A.find("span").html(), chapterUrl: A.attr("href") }, void 0 !== localStorage["visited-comics"]) { var H, T = (H = JSON.parse(localStorage["visited-comics"])).map(function(e) { return e.id }).indexOf(S); if (-1 < T && H.splice(T, 1), H.push(j), 72 < H.length)
                for (b = 72; b < H.length; b++) H.shift();
            localStorage["visited-comics"] = JSON.stringify(H) } else(O = []).push(j), localStorage["visited-comics"] = JSON.stringify(O) } }
var proxy1 = "",
    proxy2 = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*&url=",
    proxy3 = "https://images.weserv.nl/?url=";

function changeClass(e, t) { var a = $(e);
    t.forEach(function(e, t) { e.classList.remove("btn-success") }), a[0].classList.add("btn-success") }
var loadChapter = document.querySelectorAll("a.loadchapter");

function loadImageFromServer(e) { var t = document.querySelectorAll("img.img-truyen"); switch (e) {
        case 1:
            t.forEach(function(e, t) { $(e).attr("src", $(e).data("src")) }); break;
        case 2:
            t.forEach(function(e, t) { $(e).attr("src", proxy2 + encodeURIComponent($(e).data("src"))) }); break;
        case 3:
            t.forEach(function(e, t) { $(e).attr("src", proxy3 + encodeURIComponent($(e).data("src"))) }); break;
        case 4:
            t.forEach(function(e, t) { $(e).attr("src", $(e).data("cdn")) }); break;
        case 5:
            t.forEach(function(e, t) { $(e).attr("src", proxy2 + encodeURIComponent($(e).data("cdn"))) }); break;
        case 6:
            t.forEach(function(e, t) { $(e).attr("src", proxy3 + encodeURIComponent($(e).data("cdn"))) }) } }

function loadListChapter(e) { e.forEach(function(e, t) { var a = new Option("Chapter " + e.ten_chap, "/truyen-tranh/" + $("#hidden-name-truyen").val() + "/chap-" + e.ten_chap + "/" + e.id_chap),
            i = new Option("Chapter " + e.ten_chap, "/truyen-tranh/" + $("#hidden-name-truyen").val() + "/chap-" + e.ten_chap + "/" + e.id_chap);
        $("#id-Select-chapter").append(a), $("#hidden-select-chapter").append(i) }); var t = window.location.pathname;
    $("#id-Select-chapter").val(t).prop("selected", !0), $("#hidden-select-chapter").val(t).prop("selected", !0), document.querySelector(".reading-control .prev-link").classList.add("disabled"), document.querySelector(".hidden-control-mobile .prev-link").classList.add("disabled"), document.querySelector(".reading-control .next-link").classList.add("disabled"), document.querySelector(".hidden-control-mobile .next-link").classList.add("disabled"); var a = $("#id-Select-chapter option:selected"),
        i = a.prev(),
        r = a.next(),
        n = $("#hidden-select-chapter option:selected"),
        l = n.prev(),
        o = n.next();
    null != i && null != i.val() && (document.querySelector(".reading-control .prev-link").setAttribute("href", i.val()), document.querySelector(".reading-control .prev-link").classList.remove("disabled")), null != r && null != r.val() && (document.querySelector(".reading-control .next-link").setAttribute("href", r.val()), document.querySelector(".reading-control .next-link").classList.remove("disabled")), null != l && null != l.val() && (document.querySelector(".hidden-control-mobile .prev-link").setAttribute("href", l.val()), document.querySelector(".hidden-control-mobile .prev-link").classList.remove("disabled")), null != o && null != o.val() && (document.querySelector(".hidden-control-mobile .next-link").setAttribute("href", o.val()), document.querySelector(".hidden-control-mobile .next-link").classList.remove("disabled")) }
loadChapter.forEach(function(e, t) { e.addEventListener("click", function() { changeClass(this, loadChapter) }) }), document.querySelector("a.changeserver").addEventListener("click", function() { var e = document.querySelector("a.btn-success[data-server]").nextElementSibling;
    null == e || e.classList.contains("hidden") ? (btnSuccessFirst = document.querySelectorAll("a.loadchapter")[0], changeClass(btnSuccessFirst, loadChapter)) : changeClass(e, loadChapter) }), document.querySelector("a.change-server-mobile").addEventListener("click", function() { var e = document.querySelector("a.btn-success[data-server]").nextElementSibling;
    null == e || e.classList.contains("hidden") ? (btnSuccessFirst = document.querySelectorAll("a.change-server-mobile")[0], changeClass(btnSuccessFirst, loadChapter)) : changeClass(e, loadChapter) }), $(".btn-success").attrchange({ trackValues: !0, callback: function(e) { loadImageFromServer($(".btn-success").data("server")) } }), document.querySelector("img.img-truyen").addEventListener("error", function() { document.querySelector("a.changeserver").click() }), $(function() { $("#myFormSubmit").click(function(e) { e.preventDefault(), $.post("/truyen-tranh/error/" + $(".chapter-id").data("id"), $("#myForm").serialize(), function(e, t, a) { $("#myModal .close").click(), alert(e) }) }) }), $(window).on("load", function() { var e = $("#hidden-id-truyen").val(),
        t = [];
    $.ajax({ type: "post", data: { idTruyen: e }, dataType: "json", url: "/truyen-tranh/all-chapter", success: function(e) { 1 == e.success && (t = e.listChap, $("#id-Select-chapter").empty(), $("#hidden-select-chapter").empty(), loadListChapter(t)) } }) }), $("#id-Select-chapter").on("change", function() { window.location.href = this.value }), $("#hidden-select-chapter").on("change", function() { window.location.href = this.value });