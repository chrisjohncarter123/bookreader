class Application{

  constructor(){
    
  }
  createBook(){

    Book.createBook(this)

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
    debugger
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
      this.clearBooks()
      //this.loadAllBooks()
      //this.addAllBooks()
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
