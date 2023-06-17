const calcCharts = () => {
  const charts = [10, 20, 30, 40];
    
  for (let i = charts.length - 1; i > 0; i--) {
    const change = Math.floor(Math.random() * 20 - 10);

    charts[i] += change;
    charts[i - 1] -= change;
  }

  return charts;
}

module.exports = calcCharts;

