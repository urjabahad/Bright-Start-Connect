const express = require('express');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/getletter.html');
});

app.post('/generatePdf', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const studentName = 'John';
    const awardDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    
    // Assuming your EJS template is in the 'public' directory
    const templatePath = path.join(__dirname, 'public', 'LoR.ejs');
    
    // Read the content of the EJS template
    const templateContent = await ejs.renderFile(templatePath, { studentName, awardDate });
    
    // Set HTML content to the page
    await page.setContent(templateContent, { waitUntil: 'networkidle2' });

    // Wait for the page to render
    await page.waitForSelector('body');

    // Generate PDF
    const pdfBuffer = await page.pdf({
        printBackground: true,
        height: '10in', 
        width: '8in',    
      });
    
    // Close the browser
    await browser.close();

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=downloaded_LoR.pdf');
    
    // Send PDF buffer as the response
    res.send(pdfBuffer);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
