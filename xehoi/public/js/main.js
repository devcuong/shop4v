$(document).ready(function() {
    var syncedSecondary = true;
    $("#product-uytin").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        navText: [
            '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 2.5
            },
            600: {
                items: 2.5
            },
            1000: {
                items: 3.5
            }
        }
    });
    $("#slide-product").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: [
            '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 2.5
            },
            600: {
                items: 2.5
            },
            1000: {
                items: 3.5
            }
        }
    });
    $("#big").owlCarousel({
        loop: true,
        responsiveClass: true,
        items: 1,
        nav: true,
        dots: true,
        responsiveRefreshRate: 200,
        navText: [
            '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
    });

});