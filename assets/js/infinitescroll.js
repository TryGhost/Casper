// ----------------------------------------------
// Infinite Scroll
// By Thomas Vaeth @thomasvaeth
// ---------------------------------------------- 
var InfiniteScroll = (function() {
  var s;

  return {
    settings() {
      return {
        container: document.querySelector('.post-feed'),
        windowHeight: window.innerHeight,
        documentHeight: document.body.scrollHeight,
        scrollPosition: window.scrollY,
        currentPage: 1,
        pathname: window.location.pathname.replace(/#(.*)$/g, '').replace('//g', '/'),
        isLoading: false,
        isTicking: false,
        buffer: 100
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      window.addEventListener('scroll', this.onScroll, {passive: true});
      window.addEventListener('resize', this.onResize);

      this.requestPosts();
    },

    onScroll() {
      s.scrollPosition = window.scrollY;

      InfiniteScroll.requestTick();
    },

    onResize() {
      s.indowHeight = window.innerHeight;
      s.documentHeight = document.body.scrollHeight;

      InfiniteScroll.requestTick();
    },

    requestTick() {
      if (!s.isTicking) {
        requestAnimationFrame(this.requestPosts)
      }
      
      s.isTicking = true;
    },

    requestPosts() {
      if (s.isLoading || s.currentPage === maxPages) {
        return;
      }

      if (s.scrollPosition + s.windowHeight <= s.documentHeight - s.buffer) {
        s.isTicking = false;
        return;
      }

      s.isLoading = true;
      s.currentPage++;

      var request = new XMLHttpRequest();
      var nextPage = s.pathname + 'page/' + s.currentPage + '/';

      request.open('GET', nextPage, true);
      request.send();

      request.onreadystatechange = function() {
        if (request.readyState < 4) {
          // Do Nothing
        } else if (request.readyState === 4 && request.status === 200) {
          var parse = document.createRange().createContextualFragment(request.response);
          var posts = parse.querySelectorAll('.post');

          if (posts.length) {
            function fadeIn(el) {
              el.style.opacity = 0;

              (function fade() {
                var val = parseFloat(el.style.opacity);

                if (!((val += 0.1) > 1)) {
                  el.style.opacity = val;
                  requestAnimationFrame(fade);
                }
              })();
            }

            [].forEach.call(posts, function(post) {
              post.style.opacity = 0;
              s.container.appendChild(post);
              fadeIn(post);
            });
          }
        } else {
          window.removeEventListener('scroll', this.onScroll, {passive: true});
          window.removeEventListener('resize', this.onResize);

          console.error(request.status + '–' + request.statusText);
        }
      }

      s.documentHeight = document.body.scrollHeight;
      s.isLoading = false;
      s.isTicking = false;
    }
  };
})();

// ----------------------------------------------
// Init
// ----------------------------------------------
document.addEventListener('DOMContentLoaded', function() {

  // Inits
  InfiniteScroll.init();

});
