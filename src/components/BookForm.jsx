import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../features/bookSlice';

const BookForm = ({ bookToEdit, onCancel }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        price: '',
        quantity: '',
    })

    useEffect(() => {
        if (bookToEdit) {
            setBook(bookToEdit)
        }
    }, [bookToEdit])

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prev) => ({ ...prev, [name]: value }))
    };

    // add book
    const handleSubmit = (event) => {
        event.preventDefault();
        if (bookToEdit) {
            // update
            dispatch(updateBook(book))
        } else {
            dispatch(addBook({ ...book, id: nanoid() }));
        }
        setBook({
            title: '',
            author: '',
            price: '',
            quantity: '',
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='title' placeholder='Title' value={book.title} required onChange={handleChange} />
            <input type="text" name='author' placeholder='Author' value={book.author} required onChange={handleChange} /><br />
            <input type="number" name='price' placeholder='Price' value={book.price} required onChange={handleChange} />
            <input type="number" name='quantity' placeholder='Qunatity' value={book.quantity} required onChange={handleChange} />
            <br />
            <button type='submit'>{bookToEdit ? 'Update' : 'Add Book'}</button>
            {bookToEdit && <button onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default BookForm;