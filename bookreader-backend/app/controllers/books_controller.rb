require_relative '../services/books_serializer'

class BooksController < ApplicationController

    def index
        puts("index")
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
        puts ("params:::")
        puts (params)

        book = Book.find_by(id: params[:id])
        if book
            render json: BooksSerializer.new(book).to_serialized_json
        else
            render json: { message: 'No book found with that id' }
        end

    end

end
