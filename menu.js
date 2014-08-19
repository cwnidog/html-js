$(function () {
  $('ul').hide();
  $('.racer-menu').on('mouseenter', function () {
    $(this).children('ul').fadeIn(200);
  });
  $('.racer-menu').on('mouseleave', function () {
    $(this).children('ul').fadeOut(200);
  });

  $('li').on('click', function () {
    var text = String($(this).text());
    var labelText = $(this).parents('div').children('p').text();
    if (String(labelText).indexOf("Top") > -1) {
      if (text.match("Hare")) {
        animal1type = "Rabbit";
      } else if (text.match("Tortoise")) {
        animal1type = "Turtle";
      } else if (text.match("Mouse")) {
        animal1type = "Mouse";
      }
      $(this).parents('div').children('p').text("Top Racer: " + text);
    } else {
      if (text.match("Hare")) {
        animal2type = "Rabbit";
      } else if (text.match("Tortoise")) {
        animal2type = "Turtle";
      } else if (text.match("Mouse")) {
        animal2type = "Mouse";
      }
      $(this).parents('div').children('p').text("Bottom Racer: " + text);
    }
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
  });
});
