const fs = require('fs');

async function updateQuote() {
  try {
    const quotes = require('./quotes.json');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
  <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=1a1a1a&author_color=ffcc70&accent_color=00ffd0">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`.trim();

    const readmePath = './README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    const updatedContent = readmeContent.replace(
      /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/,
      cardDesign
    );

    if (updatedContent !== readmeContent) {
      fs.writeFileSync(readmePath, updatedContent);
      console.log('README actualizado con nueva cita.');
    } else {
      console.log('La cita ya está actualizada. No se realizaron cambios.');
    }
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
  }
}

updateQuote();

