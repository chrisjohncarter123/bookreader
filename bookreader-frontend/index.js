function clearBooks(){
  console.log("clear")
  const books = document.getElementById("books")
  books.innerHTML = ``
}

function addBooks(books){

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

}
function addAllBooks(){

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
    addBooks(object)

  });

}


function addBookById(id){

}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

      document.getElementById("view_all").addEventListener("click", () => {
        clearBooks()
        addAllBooks()
      })

      document.getElementById("submit").addEventListener('click', (event) => {

        let book_id = document.getElementById("book_id").value
        //let contents = document.getElementById("contents").value
        //let author_name = document.getElementById("author_name").value
      
        console.log(book_id)
      
         
        let configObj = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        };
         
        fetch(`http://localhost:3002/books/${book_id}`, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            console.log(object);
          });
      
      });
       
     

  });





