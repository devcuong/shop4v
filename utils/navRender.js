function getNavRender(current, pages, route) {
    var nav = "";
    if (pages > 0) {
        nav += "<ul class='pagination text-center'>";
        if (current == 1) {
            nav += "<li class='page-item disabled'><a class='page-link'>ĐẦU</a></li>";
        } else {
            nav += "<li class='page-item'><a class='page-link' href='" + route + "/?page=1'>ĐẦU</a></li>";
        }
        var i = (Number(current) > 5 ? Number(current) - 4 : 1);
        if (i != 1) {
            nav += "<li class='page-item disabled'><a class='page-link'>...</a></li>";
        }
        for (; i <= (Number(current) + 4) && i <= pages; i++) {
            if (i == current) {
                nav += "<li class='page-item active'><a class='page-link'>" + i + "</a></li>";
            } else {
                nav += "<li class='page-item'><a class='page-link' href='" + route + "/?page=" + i + "'>" + i + "</a></li>";
            }
            if (i == Number(current) + 4 && i < pages) {
                nav += "<li class='page-item disabled'><a class='page-link'>...</a></li>";
            }
        }
        if (current != pages) {
            nav += "<li class='page-item'><a class='page-link' href='?page=" + pages + "'>CUỐI</a></li>";
        } else {
            nav += "<li class='page-item disabled'><a class='page-link'>CUỐI</a></li>";
        }
        nav += "</ul>";
    }

    return nav;

}
module.exports = {
    getNavRender
};