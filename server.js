// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const XLSX = require('xlsx');
const app = express();
const PORT = 3000;
const FILE_PATH = 'form-submissions.xlsx';

app.use(cors());
app.use(express.json());

app.post('/api/form-submit', (req, res) => {
    const newEntry = {
        Name: req.body.name,
        Email: req.body.email,
        Phone: req.body.phone,
        Message: req.body.message,
        SubmittedAt: new Date().toLocaleString()
    };

    let workbook, worksheet, data = [];

    if (fs.existsSync(FILE_PATH)) {
        // Load existing file
        workbook = XLSX.readFile(FILE_PATH);
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(worksheet);
    } else {
        workbook = XLSX.utils.book_new();
    }

    data.push(newEntry); // Add the new entry

    const newSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, newSheet, 'Submissions', true);
    XLSX.writeFile(workbook, FILE_PATH);

    res.json({ message: '✅ Form submitted and saved to Excel!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
