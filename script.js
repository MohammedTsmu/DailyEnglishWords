async function generateWords() {
  // Get today's date
  const today = new Date().toDateString();

  // Check if words were already generated today
  const storedDate = localStorage.getItem('wordsDate');
  const storedWord1 = localStorage.getItem('word1');
  const storedWord2 = localStorage.getItem('word2');

  if (storedDate === today && storedWord1 && storedWord2) {

    // Display stored words
    document.getElementById('word1').innerHTML = `<p> ${storedWord1.toUpperCase()}</p>`;
    document.getElementById('word2').innerHTML = `<p> ${storedWord2.toUpperCase()}</p>`;
  } else {
    let randomWord1, randomWord2;

    // Keep fetching two new words until they are not the same
    do {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=2');
      const words = await response.json();
      randomWord1 = words[0].toUpperCase();
      randomWord2 = words[1].toUpperCase();
    } while (randomWord1 === randomWord2);

    // Store words and date in local storage
    localStorage.setItem('word1', randomWord1);
    localStorage.setItem('word2', randomWord2);
    localStorage.setItem('wordsDate', today);

    // Display generated words
    document.getElementById('word1').innerHTML = randomWord1;
    document.getElementById('word2').innerHTML = randomWord2;
  }
}

// Call the function once when the page loads
generateWords();