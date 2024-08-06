// Used in individualCemetery.html and tagExplanations.html

//Script should be placed in <head> tag so body elements can find it
function changeColor(givenElement, color) {
  //Webflow embeds are nested within existing HTML for the element
  givenElement.parentElement.style.backgroundColor = `${color}`;
}

function applyTagColor() {
  var good = "#C0E0DA";
  var moderate = "#FEF0D4";
  var bad = "#fdb3b3";
  var neutral = "#d0d0d0";

  // Get all elements in the document
  const allElements = document.querySelectorAll("*");

  // Regular expression to match the "tag-[word]" convention for IDs
  const idConvention = /^tag-\w+$/;

  // Filter elements that match the convention
  const tagElements = Array.from(allElements).filter((element) => {
    return idConvention.test(element.id);
  });

  console.log(tagElements);

  tagElements.forEach((tag) => {
    var value = tag.innerHTML.toLowerCase().trim();
    console.log(value);
    switch (value) {
      case "well-maintained":
      case "active":
      case "restored":
        changeColor(tag, good);
        break;

      case "fair":
      case "inactive":
      case "vandalized":
      case "overgrown":
      case "under development":
        changeColor(tag, moderate);
        break;

      case "neglected":
      case "closed":
      case "threatened":
      case "lost":
      case "damaged":
      case "under threat":
        changeColor(tag, bad);
        break;

      default:
        changeColor(tag, neutral);
    }
  });
}

function Main() {
  // Wait for the document to be fully loaded before running functions
  document.addEventListener("DOMContentLoaded", function () {
    applyTagColor();
  });
}

Main();
