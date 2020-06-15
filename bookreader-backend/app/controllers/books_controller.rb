require_relative '../services/books_serializer'

class BooksController < ApplicationController

    def index
       # puts("index")
        books = Book.all

        render json: BooksSerializer.new(books).to_serialized_json
    end

    def show
        puts("show")
        book = Book.find_by(id: params[:id])
        if book
            render json: BooksSerializer.new(book).to_serialized_json
        else
            render json: { message: 'No book found with that id' }
        end
    end

    def create

        author = Author.find_or_create_by(name: params["author_name"])

        book = Book.new(
            name: params["name"],
            author_id: author.id,
            contents: params["contents"]
        )
        book.save

        
        render json: BooksSerializer.new(book).to_serialized_json

    end

    def destroy
        puts("delete")
        book = Book.find_by(id: params[:id])
        if book
            book.delete
            render json: { message: `Deleted book with id ${params[:id]}` }
        else
            render json: { message: 'No book found with that id' }
        end

    end

end
