import React from "react";

const BookCard = ({ book }) => {
    const { title, authors, description, imageLinks } = book.volumeInfo;

    return (
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", maxWidth: "250px", textAlign: "center", margin: "0 auto" }}>
            {/* Display book image */}
            {imageLinks?.thumbnail ? (
                <img
                    src={imageLinks.thumbnail}
                    alt={`${title} cover`}
                    style={{
                        width: "100%", // Adjust width as needed
                        height: "auto", // Maintain aspect ratio
                        maxHeight: "500px", // Set a maximum height
                        objectFit: "cover", // Cover the area
                        marginBottom: "15px",
                        display: "block", // Ensure the image is treated as a block element
                        marginLeft: "auto", // Center the image horizontally
                        marginRight: "auto" // Center the image horizontally
                    }}
                />
            ) : (
                <div style={{ height: "300px", width: "100%", backgroundColor: "#f0f0f0", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    No Image Available
                </div>
            )}
            <h3>{title}</h3>
            <h4>{authors ? authors.join(", ") : "Unknown Author"}</h4>
            <p>{description}</p>
        </div>
    );
};

export default BookCard;
