# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Author.create([
    {full_name: "Chris Carter"},
    {full_name: "qwerty williams"},
    {full_name: "Bill Johnson"}

])

Book.create([
    {title: "A Walk of Truth", author_id: 1},
    {title: "A Walk of Truth vol 2", author_id: 1},
    {title: "Typing Master", author_id: 2}

])


User.create([
    {email: "test@test.com"},
    {email: "test2@test.com"},
    {email: "test3@test.com"}

])

BookPurchase.create([
    {book_id: 1, user_id: 1},
    {book_id: 2, user_id: 1},
    {book_id: 3, user_id: 1},

])