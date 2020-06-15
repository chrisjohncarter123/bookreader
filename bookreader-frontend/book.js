
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
  
    static createBook(application){
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
         // Book.BookFactory(object)
         Book.loadAllBooks(application)
         
  
        })
        
    }
  
    static loadAllBooks(application){
  
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
  
       
        
      })
      .then(function(object) {
        application.addAllBooks()
      })
  
    }
  
  }
  