/**
 * @file
 *
 * Stuff a WagnerGUIDe link in holdings from ALMA.
 */

// Container object for all our availability stuff.
Drupal.dingWagnerguide = {};

$(document).ready(function() {
  // Check if there is a container for ting-availability.
  if ($("#ting-object .ting-availability").length > 0) {

    // Find item ID.
    if (itemContainer = $('div').filter(function () {
      return this.id.match(/ting-item-[0-9].*/);
    }).get(0)) {
      Drupal.dingWagnerguide.itemId = itemContainer.id.match(/[0-9]+/);

      // Get WagnerGUIDE links.
      if (Drupal.settings.trampolinePath) {
        var ajax_path = Drupal.settings.trampolinePath;
      } else {
        var ajax_path = Drupal.settings.basePath;
      }

      // Hardcode the path until trampoline is working.
      ajax_path = Drupal.settings.basePath;

      // Get the links, and then...
      $.getJSON(ajax_path + 'ding/wagnerguide/item/' + Drupal.dingWagnerguide.itemId, {}, function(data) {
        Drupal.dingWagnerguide.data = data;
        // ...wait for the ting-availability module to write the holdings in the container.
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

  // Run through the printed holdings and insert links/popups.
  //   Hope that the lines are in the same order as our links as we have no id on the individual lines.
  $('.ting-availability ul.library-list li').each(function(index){
    if (wagnerLinks[index]) {

      if (wagnerLinks[index].popup) {
        var link = $(this).prepend(' <a>[kort]</a> ');
        var $dialog = $('<div></div>').html(wagnerLinks[index].popup).dialog({
          autoOpen: false,
          title: ''
        });
        link.click(function() {
          $dialog.dialog('open');
          return false;
        });

      } else if (wagnerLinks[index].href) {
        $(this).prepend('<a href="' + wagnerLinks[index].href + '" target="_blank">[kort]</a> ');
      }

      if (wagnerLinks[index].debug) {
        $(this).append('<!-- ' + wagnerLinks[index].debug + ' -->');
      }
    }
  });
}
