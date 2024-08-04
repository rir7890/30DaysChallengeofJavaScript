import { countries_data } from "./country.js";
const subtitle = document.getElementById("subtitle");
const ctx = document.getElementById("myChart");
const pop_btn = document.getElementById("population");
const languages = document.getElementById("languages");
const grph_title = document.getElementById("graph-title");
let chartInstance = null;
// console.log(subtitle);

//subtitle added
subtitle.innerHTML = `Currently , We Have ${countries_data.length} countries`;
grph_title.innerHTML = `Please Select the button to show the data given below`;

//population sorted bt descring order
function PopDesc(data, num = 0) {
  const arr = data.sort(function (a, b) {
    return b.population - a.population;
  });
  return arr.slice(0, num - 1);
}

//world population count
function WorldPopCount(data) {
  const pop = data.reduce(function (total, val) {
    return total + val.population;
  }, 0);
  return pop;
}

//Most Popular languages
function MostPopularLanguages(data, num = 0) {
  const mp = new Map();
  data.forEach(function (item) {
    item.languages.forEach(function (v) {
      if (mp.has(v)) {
        mp.set(v, mp.get(v) + 1);
      } else {
        mp.set(v, 1);
      }
    });
  });
  const sortedLanguages = Array.from(mp.entries())
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .slice(0, num);
  return sortedLanguages;
}

function createChart(type, labels, data, describe) {
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: describe,
          data: data,
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//population button
pop_btn.addEventListener("click", function (e) {
  grph_title.innerHTML = `10 Most Populated countries in the World`;
  const chartData = PopDesc(countries_data, 10);
  const [labelData, numData] = [
    chartData.map(function (v) {
      return v.name;
    }),
    chartData.map(function (v) {
      return v.population;
    }),
  ];
  //   console.log(labelData, numData);
  createChart(
    "bar",
    ["World", ...labelData],
    [WorldPopCount(countries_data), ...numData],
    "Populations"
  );
});

//languages button
languages.addEventListener("click", function (e) {
  grph_title.innerHTML = `10 Most Popular languages in the World`;
  const languageData = MostPopularLanguages(countries_data, 10);
  const [languages, count] = [
    languageData.map(function (v) {
      return v[0];
    }),
    languageData.map(function (v) {
      return v[1];
    }),
  ];
  createChart("bar", languages, count, "Popular languages");
});
