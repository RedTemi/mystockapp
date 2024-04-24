import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Box, Card, Container, Paper } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const apiKey = process.env.REACT_APP_APIKEY;
const stockSymbol = "AAPL"; // Replace with the desired stock symbol
const query = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${stockSymbol}&apikey=${apiKey}`;
const tquery = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo`;
const balanceSheetQuery = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${stockSymbol}&apikey=${apiKey}`;
const tbalnceSheetQuery = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo`;

function App() {
  const isFirstRender = useRef(true);
  const [stockData, setStockData] = useState([]);
  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const [activeSymbol, setActiveSymbol] = useState("AAPL");
  const [queryResults, setQueryResults] = useState([]);
  // usually sentry would be used for error reporting but for this example we will just console log the error
  const search = (key) => {
    const tquery = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`;
    const query = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${key}&apikey=${apiKey}`;
    axios.get(tquery).then((response) => {
      setQueryResults(response.data.bestMatches);
    }).catch((error) => {
      console.error(error);
    });
  };
  useEffect(() => {
    axios.get(tquery).then((response) => {
      setStockData(response.data);
    }).catch((error) => {
      console.error(error);
    }
    );
    axios.get(tbalnceSheetQuery).then((response) => {
      setBalanceSheetData(response.data);
    }
    ).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    const query = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${activeSymbol}&apikey=${apiKey}`;
    const tquery = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo`;
    const balanceSheetQuery = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${stockSymbol}&apikey=${apiKey}`;
    const tbalnceSheetQuery = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo`;
    axios.get(tquery).then((response) => {
      setStockData(response.data);
    });
    axios.get(tbalnceSheetQuery).then((response) => {
      setBalanceSheetData(response.data);
    });
  }, [activeSymbol]);

  const layout = {
    title: "Quarterly Financial Data for $" + stockData.symbol,
    xaxis: { title: "Quarter" },
    yaxis: { title: "Amount (USD)" },
  };

  const handleChange = (event, value) => {
    search(value);
  };
  const handleSelect = (event, value) => {
    setTicker(event, value);
  };

  const setTicker = (event, value) => {
    setActiveSymbol(value);
  };

  const dates = stockData.quarterlyReports?.map(
    (quarter) => quarter.fiscalDateEnding
  );
  const netIncome = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.netIncome)
  );
  const totalRevenue = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.totalRevenue)
  );
  const grossProfit = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.grossProfit)
  );
  const costOfRevenue = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.costOfRevenue)
  );
  const operatingIncome = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.operatingIncome)
  );
  const researchAndDevelopment = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.researchAndDevelopment)
  );
  const operatingExpenses = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.operatingExpenses)
  );
  const incomeBeforeTax = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.incomeBeforeTax)
  );
  const incomeTaxExpense = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.incomeTaxExpense)
  );
  const netIncomeFromContinuingOperations = stockData.quarterlyReports?.map(
    (quarter) => parseFloat(quarter.netIncomeFromContinuingOperations)
  );
  const comprehensiveIncomeNetOfTax = stockData.quarterlyReports?.map(
    (quarter) => parseFloat(quarter.comprehensiveIncomeNetOfTax)
  );
  const ebit = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.ebit)
  );
  const ebitda = stockData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.ebitda)
  );
  const balanceSheetDates = balanceSheetData.quarterlyReports?.map(
    (quarter) => quarter.fiscalDateEnding
  );
  const totalAssets = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.totalAssets)
  );
  const totalCurrentAssets = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.totalCurrentAssets)
  );
  const cashAndCashEquivalentsAtCarryingValue = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.cashAndCashEquivalentsAtCarryingValue)
  );
  const cashAndShortTermInvestments = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.cashAndShortTermInvestments)
  );
  const inventory = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.inventory)
  );
  const currentNetReceivables = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.currentNetReceivables)
  );
  const totalNonCurrentAssets = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.totalNonCurrentAssets)
  );
  const propertyPlantEquipment = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.propertyPlantEquipment)
  );
  const accumulatedDepreciationAmortizationPPE = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.accumulatedDepreciationAmortizationPPE)
  );
  const intangibleAssets = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.intangibleAssets)
  );
  const intangibleAssetsExcludingGoodwill = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.intangibleAssetsExcludingGoodwill)
  );
  const goodwill = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.goodwill)
  );
  const investments = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.investments)
  );
  const longTermInvestments = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.longTermInvestments)
  );
  const shortTermInvestments = balanceSheetData.quarterlyReports?.map((quarter) =>
    parseFloat(quarter.shortTermInvestments)
  );
  // const otherCurrentAssets = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.otherCurrentAssets)
  // );
  // const otherNonCurrentAssets = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.otherNonCurrentAssets)
  // );
  // const totalLiabilities = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.totalLiabilities)
  // );
  // const totalCurrentLiabilities = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.totalCurrentLiabilities)
  // );
  // const currentAccountsPayable = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.currentAccountsPayable)
  // );
  // const deferredRevenue = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.deferredRevenue)
  // );
  // const currentDebt = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.currentDebt)
  // );
  // const shortTermDebt = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.shortTermDebt)
  // );
  // const totalNonCurrentLiabilities = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.totalNonCurrentLiabilities)
  // );
  // const capitalLeaseObligations = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.capitalLeaseObligations)
  // );
  // const longTermDebt = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.longTermDebt)
  // );
  // const currentLongTermDebt = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.currentLongTermDebt)
  // );
  // const longTermDebtNoncurrent = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.longTermDebtNoncurrent)
  // );
  // const shortLongTermDebtTotal = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.shortLongTermDebtTotal)
  // );
  // const otherCurrentLiabilities = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.otherCurrentLiabilities)
  // );
  // const otherNonCurrentLiabilities = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.otherNonCurrentLiabilities)
  // );
  // const totalShareholderEquity = balanceSheetData.quarterlyReports?.map((quarter) =>
  //   parseFloat(quarter.totalShareholderEquity)
  // );


  return (
    <Box sx={{width:'100%',height:"100%",display:'block',minHeight:'100vw'}}>
          <Card sx={{ marginX: "auto", overflow: "visible" }}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quarterly Income Statements ${activeSymbol}
            </Typography>
            <Autocomplete
              disablePortal
              autoComplete
              id="combo-box-demo"
              options={queryResults}
              getOptionLabel={(option) => option["1. symbol"]}
              sx={{ width: 300, overflow: "auto" }}
              // onChange={handleChange}
              popupIcon={<SearchIcon />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onInput={handleChange}
                  onChange={handleSelect}
                  label="Enter ticker.."
                />
              )}
            />
          </Toolbar>
        </AppBar>
      </Card>

      <h3 sx={{padding:'10px',margin:'5px'}}>Stock Symbol: ${stockData.symbol}</h3>
      <Box sx={{height:'100%'}}>
              <Paper
        sx={{ height: "700px", width: "100%", marginX: "auto", padding: "10px" }}
      >
        <Plot
          className="graph"
          data={[
            {
              x: dates,
              y: netIncome,
              type: "scatter",
              mode: "lines+markers",
              name: "Net Income",
            },
            {
              x: dates,
              y: totalRevenue,
              type: "scatter",
              mode: "lines+markers",
              name: "Total Revenue",
            },
            {
              x: dates,
              y: grossProfit,
              type: "scatter",
              mode: "lines+markers",
              name: "Gross Profit",
            },
            {
              x: dates,
              y: costOfRevenue,
              type: "scatter",
              mode: "lines+markers",
              name: "Cost of Revenue",
            },
            {
              x: dates,
              y: operatingIncome,
              type: "scatter",
              mode: "lines+markers",
              name: "Operating Income",
            },
            {
              x: dates,
              y: researchAndDevelopment,
              type: "scatter",
              mode: "lines+markers",
              name: "Research and Development",
            },
            {
              x: dates,
              y: operatingExpenses,
              type: "scatter",
              mode: "lines+markers",
              name: "Operating Expenses",
            },
            {
              x: dates,
              y: incomeBeforeTax,
              type: "scatter",
              mode: "lines+markers",
              name: "Income Before Tax",
            },
            {
              x: dates,
              y: incomeTaxExpense,
              type: "scatter",
              mode: "lines+markers",
              name: "Income Tax Expense",
            },
            {
              x: dates,
              y: netIncomeFromContinuingOperations,
              type: "scatter",
              mode: "lines+markers",
              name: "Net Income from Continuing Operations",
            },
            {
              x: dates,
              y: comprehensiveIncomeNetOfTax,
              type: "scatter",
              mode: "lines+markers",
              name: "Comprehensive Income Net of Tax",
            },
            {
              x: dates,
              y: ebit,
              type: "scatter",
              mode: "lines+markers",
              name: "EBIT",
            },
            {
              x: dates,
              y: ebitda,
              type: "scatter",
              mode: "lines+markers",
              name: "EBITDA",
            },
          ]}
          layout={layout}
        />
      </Paper>
      <Paper sx={{ height: "700px", width: "100%", marginX: "auto", padding: "10px" }}>
      <Plot
          className="graph"
          data={[
            {
              x: balanceSheetDates,
              y: totalAssets,
              type: "scatter",
              mode: "lines+markers",
              name: "Total Assets",
            },
            {
              x: balanceSheetDates,
              y: totalCurrentAssets,
              type: "scatter",
              mode: "lines+markers",
              name: "Total Current Assets",
            },
            {
              x: balanceSheetDates,
              y: cashAndCashEquivalentsAtCarryingValue,
              type: "scatter",
              mode: "lines+markers",
              name: "Cash and Cash Equivalents at Carrying Value",
            },
            {x: balanceSheetDates,
              y: cashAndShortTermInvestments,
              type: "scatter",
              mode: "lines+markers",
              name: "Cash and Short Term Investments",
            },
            {
              x: balanceSheetDates,
              y: inventory,
              type: "scatter",
              mode: "lines+markers",
              name: "Inventory",
            },
            {
              x: balanceSheetDates,
              y: currentNetReceivables,
              type: "scatter",
              mode: "lines+markers",
              name: "Current Net Receivables",
            },
            {
              x: balanceSheetDates,
              y: totalNonCurrentAssets,
              type: "scatter",
              mode: "lines+markers",
              name: "Total Non Current Assets",
            },
            {
              x: balanceSheetDates,
              y: propertyPlantEquipment,
              type: "scatter",
              mode: "lines+markers",
              name: "Property Plant Equipment",
            },
            {
              x: balanceSheetDates,
              y: accumulatedDepreciationAmortizationPPE,
              type: "scatter",
              mode: "lines+markers",
              name: "Accumulated Depreciation Amortization PPE",
            },
            {
              x: balanceSheetDates,
              y: intangibleAssets,
              type: "scatter",
              mode: "lines+markers",
              name: "Intangible Assets",
            },
            {
              x: balanceSheetDates,
              y: intangibleAssetsExcludingGoodwill,
              type: "scatter",
              mode: "lines+markers",
              name: "Intangible Assets Excluding Goodwill",
            },
            {
              x: balanceSheetDates,
              y: goodwill,
              type: "scatter",
              mode: "lines+markers",
              name: "Goodwill",
            },
            {
              x: balanceSheetDates,
              y: investments,
              type: "scatter",
              mode: "lines+markers",
              name: "Investments",
            },
            {
              x: balanceSheetDates,
              y: longTermInvestments,
              type: "scatter",
              mode: "lines+markers",
              name: "Long Term Investments",
            },
            {
              x: balanceSheetDates,
              y: shortTermInvestments,
              type: "scatter",
              mode: "lines+markers",
              name: "Short Term Investments",
            }
          ]}
          layout={layout}
        />
      </Paper>
    
      </Box>

    </Box>

  );
}

export default App;
