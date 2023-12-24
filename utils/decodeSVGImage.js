const fs = require('fs');
const path = require('path');

// Your base64-encoded SVG data
const base64SvgData = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=";

// Decode the base64 SVG data into a Buffer
const decodedSvgBuffer = Buffer.from(base64SvgData, 'base64');

// Specify the path where you want to save the SVG file
const svgFilePath = path.join(__dirname, 'decodedImage.svg');

// Write the decoded SVG data to a file
fs.writeFileSync(svgFilePath, decodedSvgBuffer);

console.log('SVG image saved successfully:', svgFilePath);
