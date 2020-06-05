require_relative '../services/books_serializer'

class BooksController < ApplicationController

    def index
        books = Book.all
        render json: BooksSerializer.new(books).to_serialized_json
    end

    def show
        book = Book.find_by(id: params[:id])
        if book
            render json: BooksSerializer.new(book).to_serialized_json
        else
            render json: { message: 'No book found with that id' }
        end
    end

    def create

    end

end
