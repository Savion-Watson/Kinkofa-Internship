//Script originally from Jordan
console.log("Script loaded and executed");

// Function to get the current cemetery's county
function getCurrentCounty() {
  const currentCountyElement = document.getElementById("current-county");
  if (currentCountyElement) {
    const county = currentCountyElement.textContent.trim();
    console.log("Current county:", county);
    return county;
  } else {
    console.error("Current county element not found");
    return null;
  }
}

// Function to fetch and filter cemeteries based on county
function filterCemeteriesByCounty() {
  console.log("Filtering cemeteries by county");
  const currentCounty = getCurrentCounty();
  if (!currentCounty) {
    console.error("Current county not found, skipping filtering");
    return;
  }
  const cemeteries = document.querySelectorAll(".cemetery-item");
  console.log("Total cemeteries found:", cemeteries.length);

  cemeteries.forEach((cemetery) => {
    const cemeteryCountyElement = cemetery.querySelector(".cemetery-county");
    if (cemeteryCountyElement) {
      const cemeteryCounty = cemeteryCountyElement.textContent.trim();
      console.log("Cemetery county:", cemeteryCounty);
      if (cemeteryCounty !== currentCounty) {
        cemetery.style.display = "none";
        console.log("Hiding cemetery with county:", cemeteryCounty);
      } else {
        cemetery.style.display = "block";
        console.log("Showing cemetery with county:", cemeteryCounty);
      }
    } else {
      console.error("Cemetery county element not found for a cemetery item");
    }
  });
}

// Wait for the document to be fully loaded before running the filter function
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded, running filterCemeteriesByCounty");
  filterCemeteriesByCounty();
});
