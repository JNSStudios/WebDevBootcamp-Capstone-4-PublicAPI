// alert("connected!");

const currencies = {
    "AUD": { name: "Australian Dollar", symbol: "A$" },
    "BGN": { name: "Bulgarian Lev", symbol: "лв" },
    "BRL": { name: "Brazilian Real", symbol: "R$" },
    "CAD": { name: "Canadian Dollar", symbol: "C$" },
    "CHF": { name: "Swiss Franc", symbol: "CHF" },
    "CNY": { name: "Chinese Renminbi Yuan", symbol: "CN¥" },
    "CZK": { name: "Czech Koruna", symbol: "Kč" },
    "DKK": { name: "Danish Krone", symbol: "kr" },
    "EUR": { name: "Euro", symbol: "€" },
    "GBP": { name: "British Pound", symbol: "£" },
    "HKD": { name: "Hong Kong Dollar", symbol: "HK$" },
    "HUF": { name: "Hungarian Forint", symbol: "Ft" },
    "IDR": { name: "Indonesian Rupiah", symbol: "Rp" },
    "ILS": { name: "Israeli New Sheqel", symbol: "₪" },
    "INR": { name: "Indian Rupee", symbol: "₹" },
    "ISK": { name: "Icelandic Króna", symbol: "kr" },
    "JPY": { name: "Japanese Yen", symbol: "¥" },
    "KRW": { name: "South Korean Won", symbol: "₩" },
    "MXN": { name: "Mexican Peso", symbol: "Mex$" },
    "MYR": { name: "Malaysian Ringgit", symbol: "RM" },
    "NOK": { name: "Norwegian Krone", symbol: "kr" },
    "NZD": { name: "New Zealand Dollar", symbol: "NZ$" },
    "PHP": { name: "Philippine Peso", symbol: "₱" },
    "PLN": { name: "Polish Złoty", symbol: "zł" },
    "RON": { name: "Romanian Leu", symbol: "lei" },
    "SEK": { name: "Swedish Krona", symbol: "kr" },
    "SGD": { name: "Singapore Dollar", symbol: "S$" },
    "THB": { name: "Thai Baht", symbol: "฿" },
    "TRY": { name: "Turkish Lira", symbol: "₺" },
    "USD": { name: "United States Dollar", symbol: "$" },
    "ZAR": { name: "South African Rand", symbol: "R" }
};

let fromCurrency = "";
let toCurrency = "";

// returns a currency symbol based on the currency code, or a random one if blank
function getCurrencySymbol(currencyCode) {
    if (currencyCode === "") {
        const codes = Object.keys(currencies);
        const randomCode = codes[Math.floor(Math.random() * codes.length)];
        return currencies[randomCode].symbol;
    }
    return currencies[currencyCode] ? currencies[currencyCode].symbol : currencyCode;
}

// update the currency conversion animation once every 250ms
setInterval(() => {
    // console.log("Interval running...");

    // get the selected currencies from the dropdowns
    const fromSelect = document.getElementById("fromSelection");
    const toSelect = document.getElementById("toSelection");
    fromCurrency = fromSelect.options[fromSelect.selectedIndex].value;
    toCurrency = toSelect.options[toSelect.selectedIndex].value;
    

    const fromDisplay = getCurrencySymbol(fromCurrency);
    const toDisplay = getCurrencySymbol(toCurrency);
    const fromTextElements = document.getElementsByClassName("from-currency");
    const toTextElements = document.getElementsByClassName("to-currency");

    if (fromTextElements.length > 0) {
        fromTextElements[0].textContent = fromDisplay;
    }
    if (toTextElements.length > 0) {
        toTextElements[0].textContent = toDisplay;
    }
    
    // update direction symbol 
    const directionSymbol = document.getElementsByClassName("conv-direction")[0];
    const direction = document.getElementById("conversionDirection");
    if(direction.checked){
        directionSymbol.textContent = "⬅️";
    } else {
        directionSymbol.textContent = "➡️";
    }



    // ...existing setInterval code if needed...
    for (let i = 0; i < 4; i++) {
        console.log("Iteration", i + 1);
    }
}, 250);

// changing which currency box is active based on the conversion direction
document.getElementById("conversionDirection").addEventListener("change", function() {

    // get the currency input boxes
    let fromInput = document.getElementById("fromAmount");
    let toInput = document.getElementById("toAmount");

    if(!this.checked){

        // this means that conversion is from left to right (or "from" -> "to")

        // clear "to" input box and disable it
        toInput.value = "";
        toInput.disabled = true;

        // enable "from" input box
        fromInput.disabled = false;
        fromInput.focus();

    } else {

        // this means that conversion is from right to left (or "to" -> "from")

        // clear "from" input box and disable it
        fromInput.value = "";
        fromInput.disabled = true;

        // enable "to" input box
        toInput.disabled = false;
        toInput.focus();

    }


});