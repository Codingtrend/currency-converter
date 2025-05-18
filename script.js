// Get all DOM elements
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
const swapBtn = document.getElementById('swapBtn');

// List of supported currencies
const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CNY', 'SGD', 'ZAR'];

// Populate dropdowns only once on page load
function populateDropdowns() {
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

// Call once
populateDropdowns();

// Conversion function
function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt) || amt <= 0) {
    result.textContent = 'Please enter a valid amount';
    return;
  }

  result.textContent = 'Converting... ⏳';

  const apiURL = `https://api.exchangerate-api.com/v4/latest/${from}`;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      if (!rate) {
        result.textContent = `Conversion rate not available for ${to}`;
        return;
      }
      const converted = (amt * rate).toFixed(2);
      result.textContent = `${amt} ${from} = ${converted} ${to}`;
    })
    .catch(error => {
      result.textContent = 'Error fetching exchange rates. Try again later.';
      console.error(error);
    });
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);
amount.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Swap button swaps only values, no repopulation
swapBtn.addEventListener('click', () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // Trigger conversion after swap
  convertCurrency();
});
