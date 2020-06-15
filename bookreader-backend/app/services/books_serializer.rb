class BooksSerializer

    def initialize(book_object)
        @book = book_object
    end


    def to_serialized_json
        @book.to_json(
            :include => {
          :author => {:only => [:name]}
        }, :except => [:updated_at, :created_at])
    end

end