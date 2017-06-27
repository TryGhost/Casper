// Code snippet inspired by https://github.com/douglasrodrigues5/ghost-blog-infinite-scroll
$(function ($) {
    var currentPage = 1,
        pathname = window.location.pathname,
        $window = $(window),
        $document = $(document),
        $result = $('.post-feed');

    function handleScroll () {
        // return if not scroll to the bottom
        if ($window.scrollTop() + $window.height() !== $document.height()) {
            return;
        }

        if (currentPage >= maxPages) {
            return $window.off('scroll', handleScroll);
        }

        // next page
        currentPage++;

        // Load more
        $.get((pathname + 'page/' + currentPage + '/'), function (content) {
            $result.append($(content).find('.post').hide().fadeIn(100));
        });
    }

    $window.on('scroll', handleScroll).trigger('scroll');
});
