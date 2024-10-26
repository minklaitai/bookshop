import { useBookContext } from "../hooks/useBookContext";

const BookDetail = ({ book }) => {
  const { dispatch } = useBookContext();

  const handleClick = async () => {
    const response = await fetch("/api/books/" + book._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: json });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-4 w-64">
        {/* Hình ảnh sách */}
        {Array.isArray(book.images) ? (
          book.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Book image ${index + 1}`}
              className="w-full h-auto mb-4"
            />
          ))
        ) : (
          <img
            src={book.images || "https://placehold.co/200x300"}
            alt={book.title}
            className="w-full h-auto mb-4"
          />
        )}

        {/* Tiêu đề sách */}
        <h2 className="text-lg font-semibold mb-2">{book.title}</h2>

        {/* Thông tin tác giả */}
        <p className="text-gray-600 mb-2">
          <strong>Tác giả:</strong> {book.author}
        </p>

    
        {/* Danh mục */}
        <p className="text-gray-600 mb-2">
          <strong>Danh mục:</strong> {book.categoryId?.nameCategory}
        </p>

        {/* Giá sách */}
        <div className="flex items-center mb-2">
          <span className="text-red-600 text-xl font-bold mr-2">
            {book.price ? `${book.price} đ` : "Chưa có giá"}
          </span>
        </div>

        {/* Nút xóa */}
        <button
          
          className="text-white bg-red-600 px-3 py-1 rounded"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
