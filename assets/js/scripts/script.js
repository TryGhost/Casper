//*****************
// Website scripts
//*****************

// Event DOM ready
var callback = function(){
  // trigger events on Dom ready.

  // =======
  // fitvids
  // =======
  fitvids();

  // ================
  // Lazy load images
  // ================
  lazyLoad = newLazyLoad();

  // ==============================
  // Fadein initially loaded images
  // ==============================
  var lazyloadEl = document.querySelectorAll('.js-fadein');
  for (var i=0; i < lazyloadEl.length; i++) {
    if ( isInViewport(lazyloadEl[i]) === true) {
      lazyloadEl[i].classList.add('is-in-view');
      lazyloadEl[i].classList.remove('js-fadein');
    };
  }

  // ========================================
  // Fadein images as they enter the viewport
  // ========================================
  window.addEventListener('scroll', function (event) {
    var lazyloadEl = document.querySelectorAll('.js-fadein');
    for (var i=0; i < lazyloadEl.length; i++) {
      if ( isInViewport(lazyloadEl[i]) === true) {
        lazyloadEl[i].classList.add('is-in-view');
        lazyloadEl[i].classList.remove('js-fadein');
      };
    }
  }, false);

  // =======================================
  // Load comments when it's in the viewport
  // =======================================
  var comments = document.getElementById('comments');

  if (comments) {
    var scroll = function(e) {
      if(isInViewport(comments) == true) {
        loadComments();
        document.removeEventListener('scroll', scroll, true);
      }
    };
    document.addEventListener('scroll', scroll, true);
  }

  // =================
  if (maxPages === 1) {
    var loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('btn--disabled');
  }

  // Search related actions
  var searchOpen = document.getElementById('search-open');
  var searchForm = document.getElementById('search-form');
  var searchClose = document.getElementById('search-close');
  var searchField = document.getElementById('search-field');
  var searchView = document.getElementById("search");
  var searchStyle = searchView.style;

  searchOpen.onclick = function () {
    searchView.classList.add('is-active');
    document.body.style.overflowY = "hidden";
    searchField.focus();
  };

  // When "escape" is pressed, clsoe search
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
      searchView.classList.remove('is-active');
      document.body.style.overflowY = "auto";
    }
  };

  searchClose.onclick = function () {
    searchView.classList.remove('is-active');
    document.body.style.overflowY = "auto";
  };

  searchField.onfocus = function () {
    searchForm.classList.add('focused');
  };

  searchField.onblur = function() {
    searchForm.classList.remove('focused');
  };

  // ===========
  // Blog search
  // ===========
  var infoTemplate = '<p class="search__result-amount">{{amount}} posts found</p>';
  var resultTemplate =  '<div class="search__result-post">' +
                          '<p class="search__result-date">{{pubDate}}</p>' +
                          '<h5 class="search__result-title"><a href="{{link}}">{{title}}</a></h5>' +
                        '</div>';

  var search = new GhostHunter(
    document.querySelector('#search-field')
  );

  search.init({
    results         : '#results',
    onKeyUp         : true,
    includepages    : false,
    onPageLoad      : true,
    info_template   : infoTemplate,
    result_template : resultTemplate
  });

  searchField.addEventListener("keyup" , function(){
    var sValue = searchField.value;
    if (sValue === '') {
      search.clear();
    }
  });
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

// ===============================
// Check if element is in viewport
// ===============================
function isInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

// =================
// Lazyload function
// =================
function newLazyLoad() {
  return new LazyLoad({
    elements_selector: ".lazyload",
    class_loading: "loading",
    class_loaded: "loaded",
    treshold: 100,
    callback_enter: function(el) {
      // addClass('.lazyload', 'loading');
      el.classList.add('loading');
    },
    callback_set: function(el) {
      el.classList.remove('loading');
      el.classList.add('loaded');
    }
  });
}

function updateLazyLoad(lazyLoad) {
  lazyLoad.update();
}

// ==================
// Add class function
// ==================
function addClass(selector, myClass) {
  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // add class to all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].classList.add(myClass);
  }
}

// =====================
// Remove class function
// =====================
function removeClass(selector, myClass) {
  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // remove class from all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].classList.remove(myClass);
  }
}

// =============
// Load Comments
// =============
function loadComments() {
  /**
  *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
  *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
  */
  var disqus_config = function () {
    this.page.url = '{{url absolute="true"}}';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = '{{comment_id}}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };

  (function () {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
}

// ==============
// Get Ghost data
// ==============
function getGhostData(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

// ===============
// Load more posts
// ===============
var currentPage = 1;

function loadMorePosts() {
  if (currentPage > maxPages) return;
  var pathname = window.location.pathname;
  var loadMoreBtn = document.getElementById('load-more-btn');

  currentPage += 1;

  var nextPage = pathname + 'page/' + currentPage + '/';
  getGhostData(nextPage, appendPosts);

  if ( currentPage === maxPages && loadMoreBtn) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('btn--disabled');
  }
}

function appendPosts(data) {
  var morePostsWrapper  = document.getElementsByClassName('more-posts-wrapper');
  var parse = document.createRange().createContextualFragment(data);
  var postsCards = parse.querySelectorAll('.post-card');
  var postsWrapper = parse.querySelectorAll('.post-wrapper');
  var posts;

  if (postsWrapper.length) {
    posts = postsWrapper;
  } else if (postsCards.length) {
    posts = postsCards;
  }

  if (posts.length) {
    for (var i = 0; i < posts.length; i++) {
      posts[i].classList.remove('post-card--latest');
      posts[i].classList.remove('reverse');
      if (i % 2 !== 0) {
        posts[i].classList.add('reverse');
      }
      morePostsWrapper[0].appendChild(posts[i]);
    }
    updateLazyLoad(lazyLoad);
  }
}
