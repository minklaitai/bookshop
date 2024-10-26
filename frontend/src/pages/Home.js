import { useEffect } from "react";
import { useBookContext } from "../hooks/useBookContext";
import { fetchBook } from "../services/bookService";

//Component
import BookDetail from '../components/BookDetail';
import BookForm from "../components/BookForm";

const Home = () => {

    const { books, dispatch } = useBookContext();
    useEffect(() => {
        const getBooks = async () => {
            try{
                const bookData = await fetchBook();
                dispatch({ type: 'SET_BOOKS', payload: bookData })
            }
            catch(error){
                console.error('Error fetching books:', error); 
            }

        }
        getBooks()
    }, [dispatch])

    return (
        <div className="home">
            <div className="books">
                {books && books.map(book => (
                    <BookDetail key={book._id} book={book} />
                ))}
            </div>
            <BookForm />
        </div>
    );
}

export default Home;