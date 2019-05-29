/// Level 1: Automatic Table

// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the ufo data from data.js
console.log(data);

// Append new rows of ufo data
data.forEach((ufoReport) => {
  var row = tbody.append("tr");
  Object.entries(ufoReport).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});


// Level 2: Multiple Search Categories (Optional)
// I like vanilla javascript as it is and wrote this part with pure javascript. No need for d3.

// Event listener //
// Declare variables for a filter button and table data
var filterBtn = document.getElementById('filter-btn');
var tbodyRows = document.querySelectorAll('tbody tr');

// Add 'click' event to filter button
filterBtn.addEventListener('click', filter);

// Define filter function for the filter button
function filter(d){
  // Prevent default(submit) behavior of the filter button
  d.preventDefault();

  // Reference to input search terms
  const searchDate = document.getElementById('datetime').value;
  const searchCity = document.getElementById('city').value.toLowerCase();
  const searchState = document.getElementById('state').value.toLowerCase();
  const searchCountry = document.getElementById('country').value.toLowerCase();
  // Get selected value in dropdown list
  //https://stackoverflow.com/a/1085810
  const s = document.getElementById('shape');
  const searchShape = s.options[s.selectedIndex].text.toLowerCase();

  // Loop through table rows
  tbodyRows.forEach(tbodyRow => {
    // Declare column variables in each row
    let ufoDate = tbodyRow.children[0].textContent;
    let ufoCity = tbodyRow.children[1].textContent;
    let ufoState = tbodyRow.children[2].textContent;
    let ufoCountry = tbodyRow.children[3].textContent;
    let ufoShape = tbodyRow.children[4].textContent;

    // Declare boolean values for empty search terms. default true
    let dateFilter = true;
    let cityFilter = true;
    let stateFilter = true;
    let countryFilter = true;
    let shapeFilter = true;

    // Check whether search term exist and if it exists, match it with table row value and set it true or false accordingly.
    if (searchDate != '') {
      //console.log(`${searchDate}:${ufoDate}`);
      dateFilter = searchDate == ufoDate ? true:false;
      //console.log(dateFilter);
    }
    if (searchCity != '') {
      cityFilter = searchCity == ufoCity;
    }
    if (searchState != '') {
      stateFilter = searchState == ufoState;
    }
    if (searchCountry != '') {
      countryFilter = searchCountry == ufoCountry;
    }
    if (searchShape != 'choose...') { // 'choose...' is a placeholder
      shapeFilter = searchShape == ufoShape;
    }

    // Hide those with false boolean values
    if (dateFilter && cityFilter && stateFilter && countryFilter && shapeFilter) {
      tbodyRow.style.display = 'table-row';
    } else {
      tbodyRow.style.display = "none";
    }

  });
}
