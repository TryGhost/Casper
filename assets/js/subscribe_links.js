$(function() {
  var link = $('#subscribe_link');
  var button = $('#subscribe_button');

  if (link.length && button.length) {
    button.removeClass('hide');
    button.attr('href', link.attr('href'));
  }
});
