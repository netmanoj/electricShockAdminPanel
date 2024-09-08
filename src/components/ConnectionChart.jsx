import React, { useContext, useEffect, useState } from 'react';
import { TableContext } from '../context/tableContext';
import csvFile from '../electricity.csv';
import { csvParse } from 'd3-dsv';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Import Chart.js and its components explicitly
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Import the Bar chart specifically
import { Bar } from 'react-chartjs-2';

// Register the required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ConnectionChart = () => {
  const { setData } = useContext(TableContext); // Context for setting the table data
  const [parsedData, setParsedData] = useState([]); // State to hold parsed CSV data
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch the CSV file and parse it using d3.csvParse
  useEffect(() => {
    fetch(csvFile)
      .then(response => response.text())
      .then(data => {
        const parsed = csvParse(data); // Parse the CSV file
        setParsedData(parsed); // Update the state with parsed data
        setData(parsed); // Optionally set this data in context
      })
      .catch(error => console.error('Error loading CSV:', error));
  }, [setData]);

  // Chart data configuration
  const chartData = {
    labels: parsedData.map(row => row.Date_of_Application),
    datasets: [
      {
        label: 'Load Applied (KV)',
        data: parsedData.map(row => row.Load_Applied), // Y-axis data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
          <h2>Electric Shock ⚡</h2>
      {/* Button to navigate back to the homepage */}
      <button className='toggle-button2' onClick={() => navigate('/')}>
      ⬅️ Go Back
      </button>
      
      <h3>Electricity Connection Data</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ConnectionChart;
