(function () {
    const content = document.querySelector('.gh-content');
    if (!content) return;

    content.querySelectorAll('ul li, ol li').forEach(function (item) {
        if (item.querySelector('ul, ol')) {
            item.classList.add('kg-nested-list-item');
        }
    });
})();
