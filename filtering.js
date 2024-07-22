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

function readForm() {
  var form = document.getElementById("myForm");
  var inputs = form.getElementsByTagName("input");
  var hashTable = {};

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.type !== "button") {
      // Ignore the button input
      var id = input.id;
      var value = input.value;
      hashTable[id] = value;
    }
  }

  console.log(hashTable); // For demonstration, log the hash table to the console
}

/**Only shows cemeteries as close to key as possible
Filters from State, then County, then City
If one part of the key was missing, filtering will NOT display the cemetery
Remember: State contains County, which contains City. Keys with just "_County_City" or "State__City" wouldn't reasonably exist.
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

    let keyDivs = Array.from(allDivs).filter((div) => {
      return Array.from(div.classList).some((className) =>
        className.startsWith("key-")
      );
    });

    // Filter the div to get only those whose class name starts with "key-"
    //CMS collection list items have "key-" in their class names in order to collect all keys, AND not make unique id values with keys.
    cemeteryKey = keyDivs[0].className.trim().toLowerCase().slice(4);

    console.log("currentKey = ", currentKey);
    console.log("cemeteryKey = ", cemeteryKey);

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
