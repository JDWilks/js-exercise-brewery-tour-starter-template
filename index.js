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

// const state = {
//   breweries: [
//     {
//       address_2: null,
//       address_3: null,
//       brewery_type: "large",
//       city: "San Diego",
//       country: "United States",
//       county_province: null,
//       created_at: "2018-07-24T00:00:00.000Z",
//       id: 8041,
//       latitude: "32.714813",
//       longitude: "-117.129593",
//       name: "10 Barrel Brewing Co",
//       obdb_id: "10-barrel-brewing-co-san-diego",
//       phone: "6195782311",
//       postal_code: "92101-6618",
//       state: "California",
//       street: "1501 E St",
//       updated_at: "2018-08-23T00:00:00.000Z",
//       website_url: "http://10barrel.com",
//     },
//   ],

const state = {
  breweries: [],
};

function getBreweriesByState(state) {
  return fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=50`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (finalArray) {
      console.log("second dot then resonse: ", finalArray);
      return finalArray;
    });
}

function listenToSelectStateFrom() {
  const formEl = document.querySelector("#select-state-form");
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    const USState = formEl["select-state"].value;
    console.log("USState", USState);

    getBreweriesByState(USState).then(function (breweriesFromServer) {
      const filteredBreweries = breweriesFromServer.filter(function (brewery) {
        return (
          brewery.brewery_type === "brewpub" ||
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional"
        );
      });
      console.log("from listentoSelectStateForm :", filteredBreweries);

      state.breweries = filteredBreweries;

      clearAndRenderMain();
    });
  });
}

// const slicedBreweries = filteredBreweries.slice(0, 10);

/// we start again here making the form dynamic and rendering brewery list on the page

const mainBody = document.querySelector(".main-body");

function renderFilterBySection() {
  const asideEl = document.createElement("aside");
  asideEl.setAttribute("class", "filters-section");
  mainBody.append(asideEl);

  const h2El = document.createElement("h2");
  h2El.innerText = "Filter By:";

  asideEl.append(h2El, filterByTypeForm, filterByCity, filterByCityForm);
}

function renderDropDownMenuSelect() {
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

  // console.log("within renderFilterByTypeForm: ", formEl);

  return formEl;
}

function renderFilterByCityHeader() {
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "filter-by-city-heading");

  const h3El = document.createElement("h3");
  h3El.innerText = "Cities";

  const buttonClear = document.createElement("button");
  buttonClear.setAttribute("class", "clear-all-btn");
  buttonClear.innerText = "clear all";

  divEl.append(h3El, buttonClear);

  // console.log("within renderFilterByCity: ", divEl);

  return divEl;
}

function renderFilterByCityCheckBoxes() {
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

  // console.log("within renderFilterByCityForm :", formEl);

  return formEl;
}

const h1TitleEl = document.createElement("h1");
h1TitleEl.innerText = "List of Breweries";

function renderHeaderSearchBar() {
  const headerEl = document.createElement("header");
  headerEl.setAttribute("class", "search-bar");

  const searchFormEl = document.createElement("form");
  searchFormEl.setAttribute("id", "search-breweries-form");
  searchFormEl.setAttribute("autocomplete", "off");

  const searchLabelEl = document.createElement("label");
  searchLabelEl.setAttribute("for", "search-breweries");

  const h2El = document.createElement("h2");
  h2El.innerText = "Search breweries:";

  const searchInputEl = document.createElement("input");
  searchInputEl.setAttribute("id", "search-breweries");
  searchInputEl.setAttribute("name", "search-breweries");
  searchInputEl.setAttribute("type", "text");

  searchLabelEl.append(h2El);
  searchFormEl.append(searchLabelEl, searchInputEl);
  headerEl.append(searchFormEl);

  // console.log("within renderHeaderSearchBar", headerEl);

  return headerEl;
}

function renderBreweriesListItem(brewery) {
  const breweryLiEL = document.createElement("li");

  const h2El = document.createElement("h2");
  h2El.innerText = brewery.name;

  const typeDiv = document.createElement("div");
  typeDiv.setAttribute("class", "type");
  typeDiv.innerText = brewery.brewery_type;

  function renderAddressSection() {
    const addressSect = document.createElement("section");
    addressSect.setAttribute("class", "address");

    const h3El = document.createElement("h3");
    h3El.innerText = "Address:";

    const pAdd1El = document.createElement("p");
    pAdd1El.innerHTML = brewery.street;

    const pAdd2El = document.createElement("p");
    // pAdd2El.setAttribute("class", "strong");
    (pAdd2El.innerHTML = brewery.address_2),
      brewery.address_3,
      brewery.postal_code;

    addressSect.append(h3El, pAdd1El, pAdd2El);

    return addressSect;
  }

  function renderPhoneSection() {
    const phoneSectEl = document.createElement("section");
    phoneSectEl.setAttribute("class", "phone");
    const h3El = document.createElement("h3");
    h3El.innerText = "phone:";
    const pEl = document.createElement("p");
    pEl.innerText = brewery.phone;

    phoneSectEl.append(h3El, pEl);

    return phoneSectEl;
  }

  function renderLinkSection() {
    const linkSectEl = document.createElement("section");
    linkSectEl.setAttribute("class", "link");
    const hrefEl = document.createElement("a");
    hrefEl.setAttribute("href", brewery.website_url);
    hrefEl.setAttribute("target", "blank");
    hrefEl.innerText = "Visit Website";

    linkSectEl.append(hrefEl);

    return linkSectEl;
  }

  const addressSection = renderAddressSection();
  const phoneSection = renderPhoneSection();
  const linkSection = renderLinkSection();

  // console.log(headerSearchbar);

  breweryLiEL.append(h2El, typeDiv, addressSection, phoneSection, linkSection);

  renderAddressSection();
  renderPhoneSection();
  renderLinkSection();

  return breweryLiEL;
}

function renderAllBreweriesList() {
  const articleEl = document.createElement("article");

  const breweriesListUlEl = document.createElement("ul");
  breweriesListUlEl.setAttribute("class", "breweries-list");

  mainBody.append(h1TitleEl, headerSearchbar, articleEl);
  articleEl.append(breweriesListUlEl);

  for (const brewery of state.breweries) {
    const liEl = renderBreweriesListItem(brewery);
    console.log("for loop:", brewery);
    breweriesListUlEl.append(liEl);
  }
}

function clearAndRenderMain() {
  mainBody.innerHTML = "";
  renderFilterBySection();
  renderAllBreweriesList();
}

// calling functions

const filterByTypeForm = renderDropDownMenuSelect();
const filterByCity = renderFilterByCityHeader();
const filterByCityForm = renderFilterByCityCheckBoxes();

const headerSearchbar = renderHeaderSearchBar();

// renderBreweriesListItem();

renderFilterBySection();

listenToSelectStateFrom();
