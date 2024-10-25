const AdmZip = require('adm-zip');
const path = require('path');

// Function to extract a ZIP file
function extractZipFile(zipFilePath, outputDir) {
  // Create an instance of AdmZip
  const zip = new AdmZip(zipFilePath);

  // Extract all contents to the output directory
  zip.extractAllTo(outputDir, true); // 'true' means overwrite existing files

  console.log(`ZIP file extracted successfully to: ${outputDir}`);
}

// Usage example
const zipFilePath = path.join(__dirname, 'titanic.csv.zip'); // Change 'your-file.zip' to your ZIP file name
const outputDirectory = path.join(__dirname, 'extracted-files'); // Specify your output directory

extractZipFile(zipFilePath, outputDirectory);
