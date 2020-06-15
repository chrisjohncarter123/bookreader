//import { Application } from './application.js'
//const Application = require('./application.js').default

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






window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

     const a = new Application()

     a.AddEventsToButtons(a)
       

});


  



