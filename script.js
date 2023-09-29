// Define variables for DOM elements
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Function to populate currency options
function populateCurrencyOptions() {
  fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.rates);

      currencies.forEach((currency) => {
        // Create option elements for both fromCurrency and toCurrency
        const option1 = document.createElement("option");
        option1.text = currency;
        option1.value = currency;
        fromCurrency.add(option1);

        const option2 = document.createElement("option");
        option2.text = currency;
        option2.value = currency;
        toCurrency.add(option2);
      });
    })
    .catch((error) => {
      console.error("Error fetching currency data:", error);
    });
}

// Function to convert currency and display result
function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[to];
      if (rate !== undefined) {
        const convertedAmount = amountValue * rate;
        result.innerText = `Result: ${amountValue} ${from} = ${convertedAmount.toFixed(
          2
        )} ${to}`;
      } else {
        result.innerText =
          "Selected currencies are not available for conversion.";
      }
    })
    .catch((error) => {
      console.error("Error fetching conversion data:", error);
      result.innerText = "Error fetching data";
    });
}

// Populate currency options when the page loads
populateCurrencyOptions();
