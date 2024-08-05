function countCemeteries(truncate = true) {
  const cemeteries = document.querySelectorAll(".cemetery-item");
  let cemeteriesCount = cemeteries.length;
  let numDisplay;
  console.log("number of cemeteries:", cemeteriesCount);
  if (truncate) {
    numDisplay = Number(cemeteriesCount.toFixed(2)).toLocaleString("en-US"); //Round to hundredths and add commas
  } else {
    numDisplay = cemeteriesCount;
  }

  textToChange = document.getElementById("cemeteries-count");
  textToChange.innerHTML = `${numDisplay}`;
}
