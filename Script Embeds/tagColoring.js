// Used in individualCemetery.html and tagExplanations.html

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
        changeColor(tag, good);
        break;

      case "fair":
      case "inactive":
        changeColor(tag, yellow);
        break;

      case "neglected":
      case "closed":
        changeColor(tag, bad);
        break;

      case "unknown":
      case "disused":
        changeColor(tag, neutral);
        break;

      default:
        changeColor(tag, "#ffffff"); // Example default color (white)
        console.log("Status not recognized");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  applyTagColor();
});
