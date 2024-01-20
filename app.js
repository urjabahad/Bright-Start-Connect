const express = require('express');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/get.html');
});

app.post('/generatePdf', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const studentName = 'Ria Ambadan';
    const awardDate = 'January 25, 2024';
    
    // Assuming your EJS template is in the 'public' directory
    const templatePath = path.join(__dirname, 'public', 'certificate.ejs');
    
    // Read the content of the EJS template
    const templateContent = await ejs.renderFile(templatePath, { studentName, awardDate });
    
    // Set HTML content to the page
    await page.setContent(templateContent, { waitUntil: 'networkidle2' });

    // Wait for the page to render
    await page.waitForSelector('body');

    // Generate PDF
    const pdfBuffer = await page.pdf({
        printBackground: true,
        height: '6in', 
        width: '12in',    
      });
    
    // Close the browser
    await browser.close();

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=downloaded_certificate.pdf');
    
    // Send PDF buffer as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
