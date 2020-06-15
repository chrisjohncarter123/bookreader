class Author{

  static allAuthors = []

  constructor(name){
   this.name = name
   Author.allAuthors.push(this)

  }

  static findOrCreateByName(authorName){
    let result = null
    Author.allAuthors.forEach((element) => {
      if(element.name == authorName){
        result = element
      }
    })
    if(result === null){
      result = new Author(authorName)
    }
    return result

  }

}
class Book{

  static allBooks = new Array()

  constructor(id, name, authorName, contents){
    

    this.id = id

    this.name = name

    this.author = Author.findOrCreateByName(authorName)
    
    this.contents = contents

    Book.allBooks.push(this)
  }

  static BookFactory(object){

    let newBook = Object.assign(new Book(), object)
    return newBook

  }

  static getBookByID(id){
    let result = null
    Book.allBooks.forEach((element) => {
      
      if(element.id == id){
        console.log(element)
        result = element
      }
    })

    return result
    

  }

  deleteBook(){
    console.log("delete " + this.id)
    let formData = {
      id: this.id
    };
    
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    
    fetch(`http://localhost:3002/books/${this.id}`, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object)
        //console.log(this.this.id);
        //remove from array

       // Book.allBooks = Book.allBooks.filter(function(ele){ return ele.id != this.id; })
        

      });
   
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

    Book.allBooks = new Array()

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
        Book.BookFactory(element)

        /*
        let b = new Book(
          element["id"],
          element["name"],
          element["author"]["name"],
          element["contents"]
        )
        */
      })
      
    });

  }

}

class Application{

  constructor(){
    
  }
  createBook(){
    Book.createBook()
  }

  clearBooks(){
    console.log("clear")
    const books = document.getElementById("books")
    books.innerHTML = ``
  }

  deleteBook(){
    let bookId = document.getElementById('delete_book_id').value
    let book = Book.getBookByID(bookId)
    book.deleteBook()
    
  }

  addBookById(book_id){
    console.log(book_id)
    console.log(Book.getBookByID(book_id))
    this.addBooks([Book.getBookByID(book_id)])

  }

  loadAllBooks(){
    Book.loadAllBooks()
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
          <h1>ID: ${element.id}</h1>
          <h1>Name: ${element.name}</h1>
          <h1>Contents: ${element.contents}</h1>
          <h1>Author ID: ${element.author_id}</h1>
          <h1>Author -> Name: ${element.author.name}</h1>
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
            document.getElementById(`contents_${element.id}`).innerHTML = `${object.contents}`
          })

        });

      })
    }


  AddEventsToButtons(){

    document.getElementById("load_all").addEventListener("click", (event) => {
      event.preventDefault()
      this.clearBooks()
      this.loadAllBooks()
    })

    document.getElementById("show_all").addEventListener("click", (event) => {
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

    document.getElementById("submit_delete").addEventListener("click", (event) => {
      event.preventDefault()
      this.deleteBook()
      this.clearBooks()
    })

    document.getElementById("submit").addEventListener('click', (event) => {
      event.preventDefault()
      let book_id = document.getElementById('book_id').value
      console.log(book_id)

      this.clearBooks()
      this.addBookById(book_id)
    });

  }
  


}





window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

     const a = new Application()

     a.AddEventsToButtons()
       

});


  



