# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Author.create([
    {name: "Bill Johnson"},
    {name: "Chris Carter"}

])

Book.create([
    {name: "A Way of Truth", author_id: 1, contents: "In the begining..."},
    {name: "A Way of Truth vol 2", author_id: 1, contents: "In the middle..."},
    {name: "A Way of Truth vol 3", author_id: 1, contents: "In the future..."}
    
])