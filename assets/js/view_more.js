$(function() {
  var view = $('#view_more');
  var button = $('#view_more_button');

  if (button.length) {
    button.click(function() {
      if (view.length && view.hasClass('hide')) {
        view.removeClass('hide');
        
        var post_slug = window.location.pathname;
        var post_title = $('#post_title').text();
        var post_action = button.data('action');
        
        mixpanel.track("View More", {
          "Page":     post_slug,
          "Article":  post_title,
          "Action":   post_action
        });
      }
      
      $(this).hide();
      
      return false;
    });
  }
});
