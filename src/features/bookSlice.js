import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [
        { id: 1, title: 'X', author: 'Aa', price: 100, quantity: 12 },
        { id: 2, title: 'Y', author: 'Bb', price: 47, quantity: 7 },
    ]
}

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        // delete operation
        deleteBook: (state, action) => {
            const id = action.payload;
            state.books = state.books.filter((book) => book.id !== id)
        },
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        updateBook: (state, action) => {
            const { id, title, author, price, quantity } = action.payload
            const existingBook = state.books.find((book) => book.id === id)
            if (existingBook) {
                existingBook.title = title
                existingBook.price = price
                existingBook.quantity = quantity
                existingBook.author = author
            }
        }
    }
})

export const { deleteBook, addBook, updateBook } = bookSlice.actions
export default bookSlice.reducer