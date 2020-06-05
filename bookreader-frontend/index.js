window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const books = document.getElementById("books")
      

      let configObj = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
       
      fetch("http://localhost:3002/books", configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          console.log(object)
          let booksList = ``
          object.forEach(element => {
            books.innerHTML +=
            `
            <p>
              <h1>Title: ${element.name}</h1>
              <h1>Author: ${element.author.name}</h1>
            </p>

            <p id=more_information_${element.id}>
              View Contents
            </p>

            <div id=contents_${element.id}>
            </div>
            `
            
            books.innerHTML += `<hr/>`

          });

          object.forEach(element => {

            document.getElementById(`more_information_${element.id}`).addEventListener('click', (event) => {
              console.log(`click ${element.id}`)

              fetch(`http://localhost:3002/books/${element.id}`, configObj)
              .then(function(response) {
                return response.json();
              })
              .then(function(object) {
                console.log(object)
                document.getElementById(`contents_${element.id}`).innerHTML += `${object.contents}`
              })

            });

          })
          
          
        });

  });


document.getElementById("submit").addEventListener('click', (event) => {

   
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
   
  fetch("http://localhost:3002/books/1", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    });

});


