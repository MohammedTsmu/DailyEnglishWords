async function generateWords() {
  // Get today's date
  const today = new Date().toDateString();

  // Check if words were already generated today
  const storedDate = localStorage.getItem('wordsDate');
  const storedWord1 = localStorage.getItem('word1');
  const storedWord2 = localStorage.getItem('word2');

  if (storedDate === today && storedWord1 && storedWord2) {

    // Display stored words
    document.getElementById('word1').innerHTML = storedWord1.toUpperCase();
    document.getElementById('word2').innerHTML = storedWord2.toUpperCase();
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









// //Generate two words every new day
// // Get the current date
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0');
// var yyyy = today.getFullYear();
// var currentDate = yyyy + '-' + mm + '-' + dd;

// // Check if the words were already generated today
// if (localStorage.getItem('wordsDate') === currentDate) {
//   // The words were already generated today, so display them
//   document.getElementById('word1').textContent = localStorage.getItem('word1');
//   document.getElementById('word2').textContent = localStorage.getItem('word2');
// } else {
//   // Generate two new words and store them in local storage
//   var word1 = words[Math.floor(Math.random() * words.length)];
//   var word2 = words[Math.floor(Math.random() * words.length)];
//   while (word2 === word1) {
//     word2 = words[Math.floor(Math.random() * words.length)];
//   }
//   document.getElementById('word1').textContent = word1;
//   document.getElementById('word2').textContent = word2;
//   localStorage.setItem('word1', word1);
//   localStorage.setItem('word2', word2);
//   localStorage.setItem('wordsDate', currentDate);
// }
