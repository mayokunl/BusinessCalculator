function calculateValuation() {
    // Get values and parse them as numbers
    const sales = [
      parseFloat(document.getElementById('2024-sales').value) || 0,
      parseFloat(document.getElementById('2023-sales').value) || 0,
      parseFloat(document.getElementById('2022-sales').value) || 0
    ];
    
    const Earnings = [
      parseFloat(document.getElementById('2024-oex').value) || 0,
      parseFloat(document.getElementById('2023-oex').value) || 0,
      parseFloat(document.getElementById('2022-oex').value) || 0
    ];

    // Calculate totals
    const total = Earnings.reduce((a, b) => a + b, 0);

    // Net Score
    const netScore = (total/3);
    const netBy2 = netScore * 2;
    const netBy3_6 = netScore * 3.6;
    // Display results

    const formatted2x = netBy2.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    const formatted3_6x = netBy3_6.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

    document.getElementById('results-section').style.display = 'block';
    document.getElementById('valuationMessage').textContent = ` Your company could be worth approximately ${formatted2x} to ${formatted3_6x}`;

    window._valuationResults = {
      valuation_range: `${formatted2x} to ${formatted3_6x}`,
      avg_earnings: netScore.toFixed(2)
    };

    const form = document.forms["userForm"];

    const parms = {
      name: form["name"].value,
      email: form["email"].value,
      phone: form["phone"].value,
      businessname: form["businessname"].value,
      message: form["message"].value,
      valuation_range: window._valuationResults?.valuation_range || 'N/A',
      avg_earnings: window._valuationResults?.avg_earnings || 'N/A'
    };

    emailjs.send('service_21pfc9q', 'template_hj3lccf', parms)
      .catch(error => {
        console.error("❌ Email send error:", error);
        
      });
  }

  