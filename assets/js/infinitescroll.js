// Code snippet inspired by https://github.com/douglasrodrigues5/ghost-blog-infinite-scroll
$().ready(function () {
    var page = 2,
        blogUrl = window.location,
        $result = $('.post-feed');

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            if (page <= maxPages) {
                $.get((blogUrl + '/page/' + page),
                function (content) {
                    $result.append($(content).find('.post').hide().fadeIn(100));
                    page = page + 1;
                });
            }
        }
    });
});
