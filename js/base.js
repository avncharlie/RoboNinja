// todo:
// top bar
// put on git
// fix bug of pulling resizer to very edge

var codeWidthPercentage = 40;
var columnWidthPx = 12;
var minLeftSidePercentage = 20;
var minRightSidePercentage = 20;

var codeWindow = document.getElementById("codeWindow");
var resizer = document.getElementById("resizer");
var display = document.getElementById("display");

// dynamically setting window width
document.addEventListener('DOMContentLoaded', function () {
  "use strict";
  updateWidths();
});

function updateWidths() {
  "use strict";
  var currentWidth = window.innerWidth;
  
  codeWindow.setAttribute("style", "width: calc(" + codeWidthPercentage + "% - " + columnWidthPx/2 + "px)");
  resizer.setAttribute("style", "width: " + columnWidthPx + "px");
  display.setAttribute("style", "width: calc(" + (100-codeWidthPercentage) + "% - " + columnWidthPx/2 + "px)");
}

// resizer stuff
var resizing = false;
var currPercentage = 0;

var cursor_x = -1;
var cursor_y = -1;

document.onmousemove = function(event) {
  cursor_x = event.pageX;
  cursor_y = event.pageY;
  
  var currSize = (window.innerWidth - columnWidthPx) - display.offsetWidth;
  
  if (resizing) {
    if (currSize <= 0 || codeWidthPercentage < minLeftSidePercentage) {
      codeWidthPercentage = minLeftSidePercentage;
      currPercentage = codeWidthPercentage / 100;
      updateWidths();
    } else if ((100-codeWidthPercentage) < minRightSidePercentage) {
      codeWidthPercentage = 100-minRightSidePercentage;
      currPercentage = codeWidthPercentage / 100;
      updateWidths();
    } else if (currSize > 0) {
      codeWidthPercentage = currPercentage * 100;
      if (codeWidthPercentage > minLeftSidePercentage && (100-codeWidthPercentage) > minRightSidePercentage) {
        updateWidths();
      }
      currPercentage = cursor_x / window.innerWidth;
    }
  }
}

resizer.addEventListener("mousedown", e => {
  currPercentage = cursor_x / window.innerWidth;
  resizing = true;
});

window.addEventListener('mouseup', e => {
  resizing = false;
});
