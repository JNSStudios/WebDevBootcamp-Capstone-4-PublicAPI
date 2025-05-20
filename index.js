// IMPORTS
import express from 'express';
import axios from "axios";


const app = express();
const port = 3000;
const API_URL = "https://api.frankfurter.dev/v1/latest";

app.use(express.urlencoded({ extended: true })); // form submissions
app.use(express.json()); // JSON payloads
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs", {
      fromSelection: "", 
      fromAmount: "",
      conversionDirection: "",
      toSelection: "", 
      toAmount: ""
    });
});


// currency conversion
app.post("/convert", async (req, res) => {
    console.log("Received conversion request");
    console.log(req.body);
    let { fromSelection, fromAmount, conversionDirection, toSelection, toAmount } = req.body;

    fromAmount = parseFloat(fromAmount);
    toAmount = parseFloat(toAmount);
    
    // Determine currency conversion direction based on the swap checkbox
    if (conversionDirection === "swap") {
      let temp = fromSelection;
      fromSelection = toSelection;
      toSelection = temp;

      fromAmount = toAmount;
    }
    
    // Fetch exchange rates from the API
    try {
        let apirequest = `${API_URL}?base=${fromSelection}&symbols=${toSelection}`;
        const response = await axios.get(apirequest);
        const data = response.data;
        // console.log("API response:", data);
        const rate = data.rates[toSelection];

        // Perform the conversion
        toAmount = fromAmount * rate;

        // get currency symbols
        const fromCurrency = currencies[fromSelection].symbol;
        const toCurrency = currencies[toSelection].symbol;


        // Format the result
        var resultString = `${fromCurrency}${fromAmount} ➡️ ${toCurrency}${toAmount.toFixed(2)}`;

        // reload the page with the result
        res.render("index.ejs", {
            result: resultString,
            conversionRate: rate, 
            fromSelection: fromSelection, 
            fromAmount: fromAmount,
            conversionDirection: conversionDirection,
            toSelection: toSelection, 
            toAmount: toAmount
        });

      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        res.status(500).json({ success: false, error: "Failed to fetch exchange rates" });
    }
    


});





// port listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

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
