for (var allTheLoai = theLoai.size, i = 0; i < allTheLoai; i++) {
    var a = $("<a>"),
        b = $("<div>").addClass("col-md-6");
    a.attr("href", "/tim-truyen/" + theLoai.get(i)[0]), a.attr("title", theLoai.get(i)[1]), a.text(theLoai.get(i)[1]), b.append(a), $(".list-cat .row").append(b)
}
var nodes = document.querySelectorAll(".needs_to_be_rendered");
timeago.render(nodes, "vi"), timeago.cancel();
var numberNodes = document.querySelectorAll(".needs_to_format");
for (i = 0; i < numberNodes.length; i++) numberNodes[i].innerHTML = numberNodes[i].innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// $(document).ready(function() {
//     var el = document.createElement('script');
//     el.type = 'application/ld+json';
//     el.text = JSON.stringify({ "@context": "http://schema.org", "@type": "Recipe", "name": "My recipe name" });

//     document.querySelector('head').appendChild(el);
// });