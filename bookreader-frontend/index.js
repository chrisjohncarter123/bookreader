window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const books = document.getElementById("books")

    console.log(books)

    fetch('http://api.open-notify.org/astros.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json)
      });

      fetch('http://localhost:3000/books/index')
      .then(response => response.text())
      .then(text => console.log(text))

    books.innerHTML += "<h1>hi</h1>"

  });