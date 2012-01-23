/**
 * @file
 * Stuff a Wagnerguide link in holdings from alma.
 */

// Container object for all our availability stuff.
Drupal.dingWagnerguide = {};

$(document).ready(function() {
  // check if there is a container for ting-availability
  if ($("#ting-object .ting-availability").length > 0) {

    //find item id
    if (itemContainer = $('div').filter(function () {
      return this.id.match(/ting-item-[1-9].*/);
    }).get(0)) {
      Drupal.dingWagnerguide.itemId = itemContainer.id.match(/[1-9]+/);

      // get wagnerguide links
      if (Drupal.settings.trampolinePath) {
        var ajax_path = Drupal.settings.trampolinePath;
      } else {
        var ajax_path = Drupal.settings.basePath;
      }
    
      // until I can get trampoline to work...
      ajax_path = Drupal.settings.basePath;
    
      $.getJSON(ajax_path + 'ding/wagnerguide/item/' + Drupal.dingWagnerguide.itemId, {}, function(data) {
        Drupal.dingWagnerguide.data = data;
        var waitForContentTimer = window.setInterval(function() {
          if ($('.ting-availability p').length) {
            clearInterval(waitForContentTimer);
            Drupal.dingWagnerguide.populate();
          }
        }, 1000);
      });
    }
  }
});


Drupal.dingWagnerguide.populate = function() {
  var wagnerLinks = Drupal.dingWagnerguide.data[Drupal.dingWagnerguide.itemId];
  $('.ting-availability ul.library-list li').each(function(index){
    if (wagnerLinks[index]) {
      $(this).append(' <a style="display:inline" href="' + wagnerLinks[index] + '" target="_blank">[kort]</a>');
    }
  });

}
