function calculateValuation() {
    // Get values and parse them as numbers
    const sales = [
      parseFloat(document.getElementById('2024-sales').value) || 0,
      parseFloat(document.getElementById('2023-sales').value) || 0,
      parseFloat(document.getElementById('2022-sales').value) || 0
    ];
    
    const otherExpenses = [
      parseFloat(document.getElementById('2024-oex').value) || 0,
      parseFloat(document.getElementById('2023-oex').value) || 0,
      parseFloat(document.getElementById('2022-oex').value) || 0
    ];

    // Calculate totals
    const totalSales = sales.reduce((a, b) => a + b, 0);
    const totalExpenses = otherExpenses.reduce((a, b) => a + b, 0);

    // Net Score
    const netScore = (totalSales/3) - (totalExpenses/3);
    const netBy2 = netScore * 2;
    const netBy3_6 = netScore * 3.6;
    // Display results

    const formatted2x = netBy2.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    const formatted3_6x = netBy3_6.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

    document.getElementById('results-section').style.display = 'block';
    document.getElementById('valuationMessage').textContent = ` Your company could be worth approximately ${formatted2x} to ${formatted3_6x}`;
    

  }

  