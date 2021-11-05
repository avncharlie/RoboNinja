// todo:
// top bar

var leftPanelPercentage = 40;
var columnWidthPx = 12;

var minLeftPanelPercentage = 20;
var minRightPanelPercentage = 20;

var leftPanel = document.getElementById("leftPanel");
var rightPanel = document.getElementById("rightPanel");
var resizer = document.getElementById("resizer");

// dynamically setting window width
document.addEventListener('DOMContentLoaded', function () {
  "use strict";
  updateWidths();
});

function updateWidths() {
  "use strict";
  var currentWidth = window.innerWidth;
  
  leftPanel.setAttribute("style", "width: calc(" + leftPanelPercentage + "% - " + columnWidthPx/2 + "px)");
  resizer.setAttribute("style", "width: " + columnWidthPx + "px");
  rightPanel.setAttribute("style", "width: calc(" + (100-leftPanelPercentage) + "% - " + columnWidthPx/2 + "px)");
}

// resizer stuff
var resizing = false;
var currPercentage = 0;

var cursor_x = -1;
var cursor_y = -1;

document.onmousemove = function(event) {
  cursor_x = event.pageX;
  cursor_y = event.pageY;
  
  var currSize = (window.innerWidth - columnWidthPx) - rightPanel.offsetWidth;
  
  if (resizing) {
    if (currSize <= 0 || leftPanelPercentage < minLeftPanelPercentage) {
      leftPanelPercentage = minLeftPanelPercentage;
      currPercentage = leftPanelPercentage / 100;
      updateWidths();
    } else if ((100-leftPanelPercentage) < minRightPanelPercentage) {
      leftPanelPercentage = 100-minRightPanelPercentage;
      currPercentage = leftPanelPercentage / 100;
      updateWidths();
    } else if (currSize > 0) {
      leftPanelPercentage = currPercentage * 100;
      if (leftPanelPercentage > minLeftPanelPercentage && (100-leftPanelPercentage) > minRightPanelPercentage) {
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
