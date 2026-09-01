function lightbox(trigger) {
    var getItem = function (image) {
        var width = image.getAttribute('width');
        var height = image.getAttribute('height');

        // Images without dimensions in the markup, like feature images, are
        // measured from the source the browser picked out of the srcset
        var src = width && height ? image.getAttribute('src') : (image.currentSrc || image.getAttribute('src'));

        return {
            src: src,
            msrc: src,
            w: width || image.naturalWidth,
            h: height || image.naturalHeight,
            el: image,
        };
    };

    var onThumbnailsClick = function (e) {
        e.preventDefault();

        var pswpElement = document.querySelectorAll('.pswp')[0];
        if (!pswpElement) return false;

        var items = [];
        var index = 0;

        // Feature images live outside the content, so they open on their own
        var card = e.target.closest('.kg-card');

        if (card) {
            var prevSibling = card.previousElementSibling;

            while (prevSibling && (prevSibling.classList.contains('kg-image-card') || prevSibling.classList.contains('kg-gallery-card'))) {
                var prevItems = [];

                prevSibling.querySelectorAll('img').forEach(function (item) {
                    prevItems.push(getItem(item));

                    index += 1;
                });
                prevSibling = prevSibling.previousElementSibling;

                items = prevItems.concat(items);
            }
        }

        if (!card || e.target.classList.contains('kg-image')) {
            items.push(getItem(e.target));
        } else {
            var reachedCurrentItem = false;

            e.target.closest('.kg-gallery-card').querySelectorAll('img').forEach(function (item) {
                items.push(getItem(item));

                if (!reachedCurrentItem && item !== e.target) {
                    index += 1;
                } else {
                    reachedCurrentItem = true;
                }
            });
        }

        if (card) {
            var nextSibling = card.nextElementSibling;

            while (nextSibling && (nextSibling.classList.contains('kg-image-card') || nextSibling.classList.contains('kg-gallery-card'))) {
                nextSibling.querySelectorAll('img').forEach(function (item) {
                    items.push(getItem(item));
                });
                nextSibling = nextSibling.nextElementSibling;
            }
        }

        var options = {
            bgOpacity: 0.9,
            closeOnScroll: true,
            fullscreenEl: false,
            history: false,
            index: index,
            shareEl: false,
            zoomEl: false,
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el,
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }
        }

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        // An image can be clicked before it has finished decoding, in which case
        // there's nothing to measure yet — load it and correct the size after
        gallery.listen('gettingData', function (i, item) {
            if (item.w > 0 && item.h > 0) return;

            var image = new Image();
            image.onload = function () {
                item.w = this.naturalWidth;
                item.h = this.naturalHeight;
                gallery.invalidateCurrItems();
                gallery.updateSize(true);
            };
            image.src = item.src;
        });

        gallery.init();

        return false;
    };

    var triggers = document.querySelectorAll(trigger);
    triggers.forEach(function (trig) {
        trig.addEventListener('click', function (e) {
            onThumbnailsClick(e);
        });
    });
}

(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img, .gh-feature-image'
    );
})();