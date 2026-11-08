$(document).ready(function () {
    $(".faq-question").on("click", function () {
        const answer = $(this).closest(".faq-item").find(".faq-answer");

        answer.slideToggle(300);
        $(this).toggleClass("active");

        const expanded = $(this).attr("aria-expanded") === "true";
        $(this).attr("aria-expanded", String(!expanded));
    });

    $(".help-toggle").on("click", function () {
        $(".help-content").slideToggle(300);

        const expanded = $(this).attr("aria-expanded") === "true";
        $(this).attr("aria-expanded", String(!expanded));
    });

    $(".contact-info").on("mouseenter", function () {
        $(this).fadeTo(200, 0.8);
    });

    $(".contact-info").on("mouseleave", function () {
        $(this).fadeTo(200, 1);
    });
});