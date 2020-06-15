
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