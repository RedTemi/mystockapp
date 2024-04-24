import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Card } from '@mui/material';
const apiKey = process.env.REACT_APP_APIKEY;
const stockSymbol = 'AAPL'; // Replace with the desired stock symbol
const query= `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${stockSymbol}&apikey=${apiKey}`;

function App() {
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    // Fetch data from Alpha Vantage API
    axios.get(query).then((response) => {
      // Process the data and set it to stockData state
      setStockData(response.data);
    });
  }, []);

  const layout = {
    title: 'Quarterly Financial Data',
    xaxis: { title: 'Quarter' },
    yaxis: { title: 'Amount (USD)' },
  };

  const dates = stockData.quarterlyReports?.map((quarter) => quarter.fiscalDateEnding);
  const netIncome = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.netIncome));
  const totalRevenue = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.totalRevenue));
  const grossProfit = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.grossProfit));
  const costOfRevenue = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.costOfRevenue));
  const operatingIncome = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.operatingIncome));
  const researchAndDevelopment = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.researchAndDevelopment));
  const operatingExpenses = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.operatingExpenses));
  const incomeBeforeTax = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.incomeBeforeTax));
  const incomeTaxExpense = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.incomeTaxExpense));
  const netIncomeFromContinuingOperations = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.netIncomeFromContinuingOperations));
  const comprehensiveIncomeNetOfTax = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.comprehensiveIncomeNetOfTax));
  const ebit = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.ebit));
  const ebitda = stockData.quarterlyReports?.map((quarter) => parseFloat(quarter.ebitda));



  return (

      <Card >
        <h3>Stock Symbol: {stockData.symbol}</h3>
      <Plot
        data={[
          {
            x: dates,
            y: netIncome,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Net Income',
          },
          {
            x: dates,
            y: totalRevenue,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Total Revenue',
          },
          {
            x: dates,
            y: grossProfit,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Gross Profit',
          },
          {
            x: dates,
            y: costOfRevenue,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Cost of Revenue',
          },
          {
            x: dates,
            y: operatingIncome,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Operating Income',
          },
          {
            x: dates,
            y: researchAndDevelopment,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Research and Development',
          },
          {
            x: dates,
            y: operatingExpenses,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Operating Expenses',
          },
          {
            x: dates,
            y: incomeBeforeTax,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Income Before Tax',
          },
          {
            x: dates,
            y: incomeTaxExpense,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Income Tax Expense',
          },
          {
            x: dates,
            y: netIncomeFromContinuingOperations,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Net Income from Continuing Operations',
          },
          {
            x: dates,
            y: comprehensiveIncomeNetOfTax,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Comprehensive Income Net of Tax',
          },
          {
            x: dates,
            y: ebit,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'EBIT',
          },
          {
            x: dates,
            y: ebitda,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'EBITDA',
          }
        ]}
        layout={layout}
      />
      </Card>
  );
}

export default App;
