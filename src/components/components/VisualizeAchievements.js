import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const VisualizeAchievements = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/achievements/levels') // Ensure this matches your backend endpoint
      .then((response) => {
        const data = response.data;

        // Process data into labels and counts
        const labels = data.map((item) => item[0]);
        const counts = data.map((item) => item[1]);

        // Prepare chart data
        const chartData = {
          labels,
          datasets: [
            {
              data: counts,
              backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'],
              borderColor: '#fff',
              borderWidth: 2,
            },
          ],
        };

        setChartData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!chartData) return <div style={styles.noData}>No data available</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Overall Achievements Distribution</h2>
        <p style={styles.subtitle}>A visual representation of user achievement levels</p>
      </div>
      <div style={styles.chartWrapper}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,  // To allow flexibility in the size
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 14,
        },
        color: '#333',
      },
    },
    tooltip: {
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
    },
  },
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    backgroundColor: '#F1F5F8',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '30px auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1D2D50',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#5A6473',
  },
  chartWrapper: {
    width: '100%',
    maxWidth: '400px',  // Reduced maxWidth for a smaller chart
    height: '300px',    // Set a fixed height for the chart
    margin: '0 auto',
    borderRadius: '10px',
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  loading: {
    fontSize: '18px',
    color: '#FF5733',
  },
  noData: {
    fontSize: '18px',
    color: '#FF33A6',
  },
};

export default VisualizeAchievements;
