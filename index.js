//Create references to the form inputs and button on the page
var $tbody = document.querySelector("tbody");
var $timeInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Sets button logic, fires function buttonClick
$searchBtn.addEventListener("click", buttonClick);

// Set filteredAddresses to dataSet
var filteredDataSet = dataSet;

// Renders dataset to the table tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredDataSet.length; i++) {

    // Get the current object and its fields
    var data = filteredDataSet[i];
    var fields = Object.keys(data);

    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {

      // For every field in the table object, create a new cell at set its inner text to be the current value at the current field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

function buttonClick() {

  // Normalizes searches by removing white space and lower case the query
  var filterDateTime = $timeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredDataSet to array of data matching the filter parameters
  filteredDataSet = dataSet.filter(function(data) {
    var dateTimeField = data.datetime.toLowerCase();
    var cityField = data.city.toLowerCase();
    var stateField = data.state.toLowerCase();
    var countryField = data.country.toLowerCase();
    var shapeField = data.shape.toLowerCase();

    var allFields = 
      (filterDateTime === "" || dateTimeField === filterDateTime) &&
      (filterCity === "" || cityField === filterCity) &&
      (filterCountry === "" || countryField === filterCountry) &&
      (filterState === "" || stateField === filterState) &&
      (filterShape === "" || shapeField === filterShape);
    return allFields;

  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();