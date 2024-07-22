//Filtering Code from Savion
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

function matchKeys(baseKey, testKey) {
  /**Allows approximate matches with specific keys to also appear in the search
   * Ex: a baseKey of "texas_gonzales_" will show matches for "texas_gonzales_" and "texas_gonzales_harwood"
   * The more specific a key is, the more specific the search
   * Exact matches with incomplete keys are no longer made.
   */

  // Escape any special characters in the baseKey for regex
  var escapedPattern = baseKey.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create a regex pattern that matches the baseKey followed by optional word characters and dashes
  var regex = new RegExp("^" + escapedPattern + "[\\w\\s_]*$");

  console.log(regex.test(testKey));

  // Test the testString against the regex
  return regex.test(testKey);
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

    //console.log("currentKey = ", currentKey);
    //console.log("cemeteryKey = ", cemeteryKey);

    if (matchKeys(currentKey, cemeteryKey) == false) {
      //console.log("Hiding cemetery with key:", cemeteryKey);
      cemetery.remove(); //Remove element from the DOM entirely
    } else {
      //cemtery is shown
    }
  }); //end of cemetery loop
}

//*MAIN*//
currentKey = getCurrentKey(); //Retrieve the key for the cemetery respective to the page

// Wait for the document to be fully loaded before running the filter function
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded, running filterCemeteriesByKey");
  filterCemeteriesByKey();
});
