class Author{

  static allAuthors = []

  constructor(name){
   this.name = name
   Author.allAuthors.push(this)

  }

  static find_or_create_by(name){

  }

}
class Book{

  static allBooks = new Array()

  constructor(name, author, contents){
    this.name = name
    this.author = author
    this.contents = contents

    Book.allBooks.push(this)
  }

  static createBook(){
    let formData = {
      name: document.getElementById('book_name').value,
      author_name: document.getElementById('author_name').value,
      contents: document.getElementById('book_contents').value,
    };
    
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    
    fetch("http://localhost:3002/books", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object);
      });
  }

  static loadAllBooks(){

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
      object.forEach(element => {
        let b = new Book(
          element["name"],
          new Author("New Author Name"),
          element["contents"]
        )
      })
    });

  }

}

class application{

  constructor(){
    
  }

  clearBooks(){
    console.log("clear")
    const books = document.getElementById("books")
    books.innerHTML = ``
  }

  addAllBooks(){
    console.log(Book.allBooks)
    this.addBooks(Book.allBooks)
  }

  addBooks(object){

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

        let configObj = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        };

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


  AddEventsToButtons(){

    document.getElementById("view_all").addEventListener("click", (event) => {
      event.preventDefault()
      this.clearBooks()
      this.addAllBooks()
    })

    document.getElementById("clear").addEventListener("click", (event) => {
      event.preventDefault()
      this.clearBooks()
    })

    document.getElementById("create_book").addEventListener("click", (event) => {
      event.preventDefault()
      this.createBook()
    })

    document.getElementById("submit").addEventListener('click', (event) => {
      event.preventDefault()
      let book_id = document.getElementById('book_id').value
      console.log(book_id)

      this.clearBooks()
      addBookById(book_id)
    });

  }
  




/*
 addBookById(book_id){

  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  console.log(`http://localhost:3002/books/${book_id}`)
   
  fetch(`http://localhost:3002/books/${book_id}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      addBooks([object])
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }
  */

}





window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

     let a = new application()

     Book.loadAllBooks()

     a.AddEventsToButtons()
       

});


  



