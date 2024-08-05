/**
 * Problem: At non Black Cemeteries SEO pages, it is difficult to write a description showing which State, County & City someone is in.
 * Webflow does not allow me to directly reference this in the SEO settings to make idea tag names
 *
 * Solution: Extracting the State, County and City information from the existing Black Cemeteries SEO CMS list, then copying it to a <h1> tag
 * Ideally, h1 tags should naturally show up to search engine crawlers, that way, even if two pages have the same County/City name
 * the State *could* still be prioritized in the user's search results.
 *
 * This is done with hidden code-snippets with the class name: "location-desc" in the HTML but a Style Selector of "Invisible Location" in Webflow
 *
 * Location: before </body> in "City_cemeteries" and "County_cities" templates
 */

let currentState;
let currentCounty;
let currentCity;

function getLocationInfo(reverse = false) {
  //Get all cemeteries with appropriate class name
  const cemetery = document.querySelector(".location-desc");
  const idealText = cemetery.innerHTML; //Copy the first one's inner HTML
  console.log("idealText ", idealText);
  var textDisplay;

  locationInfo = idealText.split(", ");
  currentState = locationInfo[0];
  currentCounty = locationInfo[1];
  if ((locationInfo.length = 3)) {
    currentCity = locationInfo[2];
  }

  currentCounty = currentCounty += " County";

  if (reverse) {
    textDisplay = currentCity + ", " + currentCounty + ", " + currentState;
  } else {
    textDisplay = currentState + ", " + currentCounty + ", " + currentCity;
  }

  const elementToChange = document.querySelector(".seo-location-heading"); //Double check capitilization and spaces
  elementToChange.innerHTML = "Cemeteries in " + textDisplay; //Change code imbed HTML
}

function setBreadcrumbs() {
  //Finish when URLs are confirmed
}

//Run script when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  getLocationInfo(true);
  setBreadcrumbs();
});
