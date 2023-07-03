import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/books/")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handlePublicationYearChange = (e) => {
    setPublicationYear(e.target.value);
  };

  const handleAddBook = () => {
    const newBook = {
      title: title,
      author: author,
      publication_year: publicationYear,
    };

    fetch("http://localhost:8000/api/books/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks([...books, data]);
        setTitle("");
        setAuthor("");
        setPublicationYear("");
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDeleteBook = (id) => {
    fetch(`http://localhost:8000/api/books/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleRetrieveBook = (id) => {
    fetch(`http://localhost:8000/api/books/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setAuthor(data.author);
        setPublicationYear(data.publication_year);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateBook = (id) => {
    const updatedBook = {
      title: title,
      author: author,
      publication_year: publicationYear,
    };

    fetch(`http://localhost:8000/api/books/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBooks = books.map((book) => {
          if (book.id === id) {
            return {
              ...book,
              title: data.title,
              author: data.author,
              publication_year: data.publication_year,
            };
          }
          return book;
        });
        setBooks(updatedBooks);
        setTitle("");
        setAuthor("");
        setPublicationYear("");
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="main_container ">
      <h1>Book Collection</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publication_year}</td>
              <td>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
                <br />
                <button onClick={() => handleRetrieveBook(book.id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add /Edit Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={handleAuthorChange}
      />
      <input
        type="number"
        placeholder="Publication Year"
        value={publicationYear}
        onChange={handlePublicationYearChange}
      />
      <button onClick={handleAddBook}>Add Book</button>
      <button onClick={() => handleUpdateBook()}>Update Book</button>
    </div>
  );
}

export default App;
