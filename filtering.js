//Code from Savion

let currentState;
let currentCounty; //GLOBAL level
let currentCity;
let currentKey;

// Function to get the current cemetery's key
//Key format: class in the name "[State]_[County]_[City]" (All lowercase)
function getCurrentKey() {
  const currentCemeteryElement = document.getElementById("current-key");
  if (currentCemeteryElement) {
    const key = currentCemeteryElement.className.trim().toLowerCase();
    console.log("Current Cemetery Key:", key);
    return key;
  } else {
    console.error("Current cemetery key not found");
    return null;
  }
}

function translateKey() {
  let parsedKey = currentKey.split("_");
  if (parsedKey == "__") {
    console.error("current key is contains no information:", parsedKey);
    return;
  }
  currentState = parsedKey[0];
  currentCounty = parsedKey[1];
  currentCity = parsedKey[2];
}

/**Only shows cemeteries as close to key as possible
Filters from State, then County, then City
If one part of the key was missing, filtering will NOT continue
Remember: State contains County, which contains city. Keys with just "-County-City" or "State--City" wouldn't reasonably exist.
Being strict also accounts for States whose names equal cities  **/

function filterCemeteriesByKey() {
  console.log("Filtering cemeteries by key");
  if (!currentKey) {
    console.error("Current key not found, cannot filter");
    return;
  }
  const cemeteries = document.querySelectorAll(".cemetery-item");
  console.log("Total cemeteries found:", cemeteries.length);

  cemeteries.forEach((cemetery) => {
    let cemeteryKey;
    // Select all div elements within the parent element
    let allDivs = cemetery.querySelectorAll("div");

    // Filter the divs to get only those whose class name starts with "key"
    let keyDiv = Array.from(allDivs).filter((div) => {
      return Array.from(div.classList).some((className) =>
        className.startsWith("key")
      );
    }); //end of key loop

    cemeteryKey = keyDiv[0].className.trim().toLowerCase(); //Store the key (className of the needed Div)
    console.log("cemeteryKey", cemeteryKey);

    if (cemeteryKey !== currentKey) {
      cemetery.style.display = "none";
      console.log("Hiding cemetery with key:", cemeteryKey);
    } else {
      cemetery.style.display = "block";
      console.log("Showing cemetery with county:", cemeteryKey);
    }
  }); //end of cemetery loop
}

//*MAIN*//

currentKey = getCurrentKey();

translateKey(); //Get key representing cemetery information

// Wait for the document to be fully loaded before running the filter function
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded, running filterCemeteriesByKey");
  filterCemeteriesByKey();
});
