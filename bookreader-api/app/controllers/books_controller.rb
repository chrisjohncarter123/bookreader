class BooksController < ApplicationController
    def index
        books = Book.all
        render json: books, include: [:title]
    end

end
