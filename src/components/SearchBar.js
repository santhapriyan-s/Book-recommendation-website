import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    // Function to start voice recognition
    const startVoiceRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            console.log('Voice recognition activated. Try speaking into the microphone.');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript; // Get the recognized text
            setQuery(transcript); // Update the state with the recognized text
            onSearch(transcript); // Trigger the search with the recognized text
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error detected: ', event.error);
        };

        recognition.onend = () => {
            console.log('Voice recognition deactivated.');
        };

        recognition.start(); // Start the voice recognition
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value); // Update query state when typing
    };

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the default form submission
        onSearch(query); // Trigger search with current query
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for books..."
                />
                <button type="submit">Search</button>
                <button type="button" onClick={startVoiceRecognition}>🎤</button>
            </form>
        </div>
    );
};

export default SearchBar;
