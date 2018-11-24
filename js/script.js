$(document).ready(function () {
    // Add class to <html> based on mobile device
    var deviceAgent = navigator.userAgent.toLowerCase();

    if (deviceAgent.match(/(iphone|ipod|ipad|android|blackberry|symbianos|^sonyericsson|^nokia|^samsung|^lg)/)) {
        $("html").addClass("mobile");
    }
    // END Add class to <html> based on mobile device

    var popupsCollection = [];
    var openedPopup;

    $.each($(".js-popup"), function (i, el) {
        popupsCollection.push($(el).data("popup"));
    });

    $.each(popupsCollection, function (i, el) {
        $("[data-popup=" + el + "]").click(function () {
            $(".services-popup").fadeIn();
            $(".modal-overlay").fadeIn();
            $("." + el).show();
            openedPopup = el;
        });
    });

    $(".services-popup-next ").click(function () {
        var nextPopup =
            popupsCollection[
                ($.inArray(openedPopup, popupsCollection) + 1) % popupsCollection.length
            ];
        $("." + openedPopup).fadeOut();
        $("." + nextPopup).fadeIn();
        openedPopup = nextPopup;
    });

    $(".services-popup-back ").click(function () {
        var prevPopup =
            popupsCollection[
                ($.inArray(openedPopup, popupsCollection) +
                    popupsCollection.length -
                    1) %
                popupsCollection.length
            ];
        $("." + openedPopup).fadeOut();
        $("." + prevPopup).fadeIn();
        openedPopup = prevPopup;
    });

    function closePopup() {
        $(".services-popup, .modal-overlay, .services-popup-item").fadeOut();
    }

    $(".modal-overlay, .popup-close").click(function () {
        closePopup();
    });

    $(".btn-mobile-navigation").click(function () {
        $(".main-navigation-right").fadeIn();
    });

    $(".btn-menu-close").click(function () {
        $(".main-navigation-right").fadeOut();
    });

    $(
        '.site-navigation-item:not(".site-navigation-item-services"), .btn-info, .btn-services-popup'
    ).click(function () {
        var elementToScroll = $(this).attr("href");

        if ($("html").hasClass("mobile")) {
            $(".main-navigation-right").hide();
        }

        $("html, body").animate({
                scrollTop: $(elementToScroll).offset().top
            },
            500
        );
    });

    $(".mobile .site-navigation-item").on("click touch", function (e) {
        e.preventDefault();
        $(".services-submenu").slideToggle();
    });

    $(".feedback-form").submit(function () {
        var formData =
            "companyName=" +
            $("[name=company-name]").val() +
            "&productName=" +
            $("[name=product-name]").val() +
            "&productType=" +
            $("[name=product-type]").val() +
            "&url=" +
            $("[name=url]").val() +
            "&email=" +
            $("[name=email]").val() +
            "&otherContacts=" +
            $("[name=other-contacts]").val() +
            "&otherInfo=" +
            $("[name=other-info]").val();
        return (
            $.ajax({
                type: "POST",
                url: "../form.php",
                data: formData,
                success: function (msg) {
                    if (msg === "success") {
                        $(".feedback-form-popup-fail").fadeOut();
                        $(
                            ".feedback-form-popup, .feedback-form-popup-success, .modal-overlay"
                        ).fadeIn();
                    } else {
                        console.log(msg);
                        $(".feedback-form-popup-success").fadeOut();
                        $(
                            ".feedback-form-popup, .feedback-form-popup-fail, .modal-overlay"
                        ).fadeIn();
                        setTimeout(function () {
                            $(
                                ".feedback-form-popup-fail, .feedback-form-popup, .modal-overlay"
                            ).fadeOut();
                        }, 3000);
                    }
                }
            }),
            !1
        );
    });

    $(".popup-close").click(function () {
        $(".feedback-form-popup, .feedback-form-popup-content").fadeOut();
    });
});