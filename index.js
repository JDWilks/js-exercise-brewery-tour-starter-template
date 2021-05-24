const state = {
  breweries: [],
  filters: {
    type: "",
    cities: [],
  },
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

// input: nothing
// action: create and append the filter section
// output: nothing
function renderFilterBySection() {
  const asideEl = document.createElement("aside");
  asideEl.setAttribute("class", "filters-section");

  const h2El = document.createElement("h2");
  h2El.innerText = "Filter By:";

  const filterByTypeForm = renderDropDownMenuSelect();
  const filterByCity = renderFilterByCityHeader();
  const filterByCityForm = renderFilterByCityCheckBoxes();

  asideEl.append(h2El, filterByTypeForm, filterByCity, filterByCityForm);

  mainBody.append(asideEl);
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

  // we want to change the article (breweries) to be 1 of 4 things (none, micro, regional, brewpub) which is chosen from drop down menu.
  // event listener - change to be used.
  // that updates the state.
  // value of select needs to populate state with that value filter.
  // "Mirco" value if selected needs to look at all breweries.brewery_type and filter them.
  // then that creates a new copy of the filtered breweries to be rendered on the page.

  selectEl.addEventListener("change", function () {
    console.log("you are a winner");
    //  run state and render artcle
  });

  // console.log("within renderFilterByTypeForm: ", formEl);

  return formEl;
}

// input: nothing
// action: create a city header element
// output: the city header element
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

// OLD
// function renderFilterByCityCheckBoxes() {
//   const formEl = document.createElement("form");
//   formEl.setAttribute("id", "filter-by-city-form");

//   const inputCityCheckbox = document.createElement("input");
//   inputCityCheckbox.setAttribute("type", "checkbox");
//   inputCityCheckbox.setAttribute("name", "chardon");
//   inputCityCheckbox.setAttribute("value", "chardon");

//   const inputCityLabel = document.createElement("label");
//   inputCityLabel.setAttribute("for", "Chardon");
//   inputCityLabel.innerText = "Chardon";

//   formEl.append(inputCityCheckbox, inputCityLabel);

//   // console.log("within renderFilterByCityForm :", formEl);

//   return formEl;
// }

// ------------------here
function renderFilterByCityCheckBoxes() {
  const formEl = document.createElement("form");
  formEl.setAttribute("id", "filter-by-city-form");
  // Nico was here...
  const cities = state.breweries.map(function (brewery) {
    return brewery.city;
  });

  // this produces an object and sorts it
  let setOfCities = new Set(cities);
  // This makes a new array
  arrayOfCities = [...setOfCities];
  arrayOfCities.sort();

  for (const city of arrayOfCities) {
    const inputCityCheckbox = document.createElement("input");
    inputCityCheckbox.setAttribute("type", "checkbox");
    inputCityCheckbox.setAttribute("name", city);
    inputCityCheckbox.setAttribute("value", city);

    const inputCityLabel = document.createElement("label");
    inputCityLabel.setAttribute("for", city);
    inputCityLabel.innerText = city;

    formEl.append(inputCityCheckbox, inputCityLabel);
  }

  console.log("form:", formEl);
  // console.log("checking main:", asideEl);
  console.log("checking main:", mainBody);

  return formEl;
}

// -----------------to here

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

// dependencies:
function renderAllBreweriesList() {
  const articleEl = document.createElement("article");

  const breweriesListUlEl = document.createElement("ul");
  breweriesListUlEl.setAttribute("class", "breweries-list");

  const headerSearchbar = renderHeaderSearchBar();

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
  listenToSelectStateFrom();
  console.log("render counter 313");
}

clearAndRenderMain();
