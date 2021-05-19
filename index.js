const state = {
  breweries: [
    {
      address_2: null,
      address_3: null,
      brewery_type: "large",
      city: "San Diego",
      country: "United States",
      county_province: null,
      created_at: "2018-07-24T00:00:00.000Z",
      id: 8041,
      latitude: "32.714813",
      longitude: "-117.129593",
      name: "10 Barrel Brewing Co",
      obdb_id: "10-barrel-brewing-co-san-diego",
      phone: "6195782311",
      postal_code: "92101-6618",
      state: "California",
      street: "1501 E St",
      updated_at: "2018-08-23T00:00:00.000Z",
      website_url: "http://10barrel.com",
    },
    {
      address_2: null,
      address_3: null,
      brewery_type: "large",
      city: "San Diego",
      country: "United States",
      county_province: null,
      created_at: "2018-07-24T00:00:00.000Z",
      id: 8041,
      latitude: "32.714813",
      longitude: "-117.129593",
      name: "10 Barrel Brewing Co",
      obdb_id: "10-barrel-brewing-co-san-diego",
      phone: "6195782311",
      postal_code: "92101-6618",
      state: "California",
      street: "1501 E St",
      updated_at: "2018-08-23T00:00:00.000Z",
      website_url: "http://10barrel.com",
    },
  ],

  // add in later on

  // filter: [{

  // }]
};

// - Think about which request type to use
// - Create a state object ✅
// - Create action functions that update state
// - Create render functions that read from state
// - Create a fetch function to get data

// - A user can enter a US state and view a list of breweries in that state
//     - The list has a maximum of 10 breweries in it
//     - The list has three types of breweries that offer brewery tours:
//         - Micro
//         - Regional
//         - Brewpub
//     - Do not show the other types of breweries
// - From the list of breweries, a user can view the following details about each brewery:
//     - Name
//     - Type of brewery
//     - Address
//     - Phone Number
// - From the list of breweries, a user can visit the website of a brewery
// - From the 'filter by type of brewery' section, a user can filter by type of brewery
// - From the 'filter by city' section, a user can filter by city, the location of the brewery
// - From the 'filter by city' section, a user can clear all filters
// - From the 'search' section, a user can search for breweries by:
//     - Name
//     - City

const mainBody = document.querySelector(".main-body");

/// function making main

function renderFilterSection() {
  const asideEl = document.createElement("aside");
  asideEl.setAttribute("class", "filters-section");
  mainBody.append(asideEl);

  const h2El = document.createElement("h2");
  h2El.innerText = "Filter By:";

  asideEl.append(h2El, filterByTypeForm, filterByCity, filterByCityForm);
}

function renderFilterByTypeForm() {
  const formEl = document.createElement("form");
  formEl.setAttribute("id", "filter-by-type-form");
  formEl.setAttribute("autocompete", "off");

  const labelEl = document.createElement("label");
  labelEl.setAttribute("for", "filter-by-type");

  const h3El = document.createElement("h3");
  h3El.innerText = "Type of Brewery";

  const selectEl = document.createElement("select");
  selectEl.setAttribute("name", "filter-by-type");
  selectEl.setAttribute("id", "filter-by-type");

  const optionEl = document.createElement("option");
  optionEl.setAttribute("value", " ");
  optionEl.innerText = "Select a type...";

  const option1 = document.createElement("option");
  option1.setAttribute("value", "micro");
  option1.innerText = "Micro";

  const option2 = document.createElement("option");
  option2.setAttribute("value", "regional");
  option2.innerText = "Regional";

  const option3 = document.createElement("option");
  option3.setAttribute("value", "brewpub");
  option3.innerText = "Brewpub";

  formEl.append(labelEl, selectEl);
  selectEl.append(optionEl, option1, option2, option3);
  labelEl.append(h3El);

  console.log(labelEl);
  console.log(selectEl);
  console.log(formEl);

  return formEl;
}

function renderFilterByCity() {
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "filter-by-city-heading");

  const h3El = document.createElement("h3");
  h3El.innerText = "Cities";

  const buttonClear = document.createElement("button");
  buttonClear.setAttribute("class", "clear-all-btn");
  buttonClear.innerText = "clear all";

  divEl.append(h3El, buttonClear);

  return divEl;
}

function renderFilterByCityForm() {
  const formEl = document.createElement("form");
  formEl.setAttribute("id", "filter-by-city-form");

  const inputCityCheckbox = document.createElement("input");
  inputCityCheckbox.setAttribute("type", "checkbox");
  inputCityCheckbox.setAttribute("name", "chardon");
  inputCityCheckbox.setAttribute("value", "chardon");

  const inputCityLabel = document.createElement("label");
  inputCityLabel.setAttribute("for", "Chardon");
  inputCityLabel.innerText = "Chardon";

  formEl.append(inputCityCheckbox, inputCityLabel);

  return formEl;
}

const filterByTypeForm = renderFilterByTypeForm();
const filterByCity = renderFilterByCity();
const filterByCityForm = renderFilterByCityForm();

// function list of breweries section

// const h1TitleEl = documemt.createElement("h1")
// h1TitleEl.innerText = "List of Breweries"

// const headerEl = document.createElement("header")
// headerEl.setAttribute("class", "search-bar")

// const searchFormEl = document.createElement("form")
// searchFormEl.setAttribute("id", "search-breweries-form")
// searchFormEl.setAttribute("autocomplete", "off")

// const searchLabelEl = document.createElement("label")
// searchLabelEl.setAttribute("for", "search-breweries")

// const h2El = document.createElement("h2")
// h2El.innerText = "Search breweries:"

// const searchInputEl = document.createElement("input")
// searchInputEl.setAttribute("id", "search-breweries")
// searchInputEl.setAttribute("name", "search-breweries")
// searchInputEl.setAttribute("type", "text")

// const articleEl = document.createElement("article")

// const breweriesListEl = document.createElement("ul")
// breweriesListEl.setAttribute("class", "breweries-list")

// const breweryLiEL = document.createElement("li")

// const h2El

{
  /* <h1>List of Breweries</h1>
<header class="search-bar">
  <form id="search-breweries-form" autocomplete="off">
    <label for="search-breweries"><h2>Search breweries:</h2></label>
    <input id="search-breweries" name="search-breweries" type="text" />
  </form>
</header>
<article>
  <ul class="breweries-list">
    <li>
      <h2>Snow Belt Brew</h2>
      <div class="type">micro</div>
      <section class="address">
        <h3>Address:</h3>
        <p>9511 Kile Rd</p>
        <p><strong>Chardon, 44024</strong></p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>N/A</p>
      </section>
      <section class="link">
        <a href="null" target="_blank">Visit Website</a>
      </section>
    </li>
    // More list elements
  </ul>
</article> */
}

// calling functions

renderFilterSection();
