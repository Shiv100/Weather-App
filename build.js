const fs = require('fs');
const path = require('path');

// Read the current script.js file
const scriptPath = path.join(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Replace the API key with environment variable
const apiKey = process.env.VITE_WEATHER_API_KEY;
if (apiKey) {
  scriptContent = scriptContent.replace(
    /const API_KEY = '.*';/,
    `const API_KEY = '${apiKey}';`
  );
  console.log('API key injected successfully');
} else {
  console.log('No API key found in environment variables');
}

// Write the updated content back
fs.writeFileSync(scriptPath, scriptContent);
