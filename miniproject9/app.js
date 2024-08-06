import { countries } from "./countries.js";

const main_head = document.getElementById("main-head");
const total_country = document.getElementById("total-country");
const word_info = document.getElementById("word-info");
const one_btn = document.getElementById("one-btn");
const word_btn = document.getElementById("word-btn");
const cntry_sort = document.getElementById("cntry-sort");
const search_input = document.getElementById("search-input");
const result = document.getElementById("result");

let wrd_any = false;
let one_wrd = false;

//total country count
total_country.innerHTML = `Their are ${countries.length} countries.`;

//initially show all the countries
function showAllCountries(data) {
  result.innerHTML = ``;
  data.forEach(function (d) {
    const div = document.createElement("div");
    div.textContent = d;
    div.id = "cntry-data";
    div.style.color = "red";
    div.style.border = "2px solid black";
    div.style.width = "100px";
    div.style.height = "50px";
    div.style.borderRadius = "5px";
    div.style.alignItems = "center";
    result.appendChild(div);
  });
}
showAllCountries(countries);

//start with button logic
cntry_sort.addEventListener("click", function (e) {
  const cntry_data = document.querySelectorAll("#cntry-data");
  // console.log(cntry_data);
  const data = [];
  cntry_data.forEach(function (c) {
    data.push(c.textContent);
  });
  const sortedData = data.sort();
  showAllCountries(sortedData);
});

function wordFindStart(cntry_data, w) {
  const wrd = w.slice(0, 1).toLowerCase();
  return countries.filter((c) => c.toLocaleLowerCase().startsWith(wrd));
}

///only one value is allowed in the input search
one_btn.addEventListener("click", function () {
  // one_btn.style.backgroundColor = "red";
  // one_wrd = true;
  // search_input.value = search_input.value.slice(0, 1);
  // const event = new Event("input", {
  //   bubbles: true,
  //   cancelable: true,
  // });
  // search_input.dispatchEvent(event);

  one_wrd = !one_wrd;
  // if (wrd_any) wrd_any = false;
  one_btn.style.backgroundColor = `${one_wrd ? "red" : "grey"}`;
  //input value sort
  if (one_wrd) {
    search_input.addEventListener("input", function (e) {
      const filteredCountries = wordFindStart(countries, e.target.value);
      showAllCountries(filteredCountries);
    });
  }
});

//search with any where
function searchwihWord(country_data, w) {
  const wrd = w.toLowerCase();
  const cntry_data = country_data.filter((c) => c.toLowerCase().includes(wrd));
  // console.log(cntry_data);
  return cntry_data;
}

//search with any word
word_btn.addEventListener("click", function () {
  wrd_any = !wrd_any;
  // if (one_wrd) one_wrd = false;
  word_btn.style.backgroundColor = `${wrd_any ? "red" : "grey"}`;
  if (wrd_any) {
    search_input.addEventListener("input", function (e) {
      const data = searchwihWord(countries, e.target.value);
      showAllCountries(data);
    });
  }
});

if (!wrd_any && !one_wrd) {
  search_input.addEventListener("input", function (e) {
    const wrd_in = e.target.value.toLowerCase();
    const srch_cntries = countries.filter(function (c) {
      return c.toLowerCase().startsWith(wrd_in);
    });
    showAllCountries(srch_cntries);
  });
}
