import React from "react";

const BookList = ({ books }) => {
    return (
        <div>
            {books.length > 0 ? (
                books.map((book) => (
                    <div key={book.id} style={{ margin: "20px 0", border: "1px solid #ddd", borderRadius: "8px", padding: "15px", display: "flex", alignItems: "flex-start" }}>
                        {/* Display book image */}
                        {book.volumeInfo?.imageLinks?.thumbnail ? (
                            <img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={`${book.volumeInfo.title} cover`}
                                style={{
                                    maxWidth: "150px",  // Maximum width of the image
                                    maxHeight: "250px", // Maximum height of the image
                                    height: "auto",     // Keep the aspect ratio
                                    width: "auto",      // Keep the aspect ratio
                                    marginRight: "15px",
                                    borderRadius: "4px",
                                    objectFit: "cover", // Ensures the image covers the allocated space
                                }}
                            />
                        ) : (
                            <div style={{ width: "150px", height: "250px", backgroundColor: "#f0f0f0", marginRight: "15px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "4px" }}>
                                <p>No Image</p>
                            </div>
                        )}
                        <div style={{ flex: 1 }}> {/* Allows the text container to take the remaining space */}
                            <h3 style={{
                                margin: "0 0 10px 0",
                                maxWidth: "calc(100% - 20px)", // Ensures the title fits within the container
                                overflow: "hidden", // Hides overflow text
                                textOverflow: "ellipsis", // Adds ellipsis for overflow text
                                whiteSpace: "nowrap", // Prevents the title from wrapping to the next line
                                color: "red" // Set title color to red
                            }}>
                                {book.volumeInfo?.title || "No Title Available"}
                            </h3>
                            <p style={{ margin: "0 0 10px 0" }}>{book.volumeInfo?.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}</p>
                            <p style={{ margin: "0 0 10px 0" }}>{book.volumeInfo?.description || "No description available."}</p>
                            <h4 style={{ margin: "0 0 10px 0" }}>Publish date: {book.volumeInfo?.publishedDate || "Not available"}</h4>
                            {book.saleInfo?.buyLink ? (
                                <h4 style={{ margin: "0" }}>
                                    Buy Link: <a href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">Purchase here</a>
                                </h4>
                            ) : (
                                <h4 style={{ margin: "0" }}>Buy Link: Not available</h4>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};

export default BookList;
