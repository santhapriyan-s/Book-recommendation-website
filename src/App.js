import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import Signup from "./components/Signup";
import Login from "./components/Login";
const App = () => {
    const [books, setBooks] = useState([]);
    const [genre, setGenre] = useState("all");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
    const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Default books based on mood
    const defaultMoodBooks = {
        
            happy: [
                { id: 1, volumeInfo: { title: "பொன்னியின் செல்வன் (Ponniyin Selvan)", authors: ["கல்கி கிருஷ்ணமூர்த்தி (Kalki Krishnamurthy)"], description: "A historical epic about the Chola dynasty.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1950" } },
                { id: 2, volumeInfo: { title: "சிவகாமியின் சபதம் (Sivagamiyin Sabatham)", authors: ["கல்கி கிருஷ்ணமூர்த்தி (Kalki Krishnamurthy)"], description: "An engaging tale of love and war in ancient Tamil Nadu.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1944" } },
                { id: 3, volumeInfo: { title: "The Alchemist", authors: ["Paulo Coelho"], description: "A story about following dreams.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1988" } },
                { id: 4, volumeInfo: { title: "Pride and Prejudice", authors: ["Jane Austen"], description: "A classic novel of manners and marriage.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1813" } },
                { id: 5, volumeInfo: { title: "Life of Pi", authors: ["Yann Martel"], description: "An adventurous tale of survival.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2001" } },
                { id: 6, volumeInfo: { title: "Eat, Pray, Love", authors: ["Elizabeth Gilbert"], description: "A memoir of self-discovery.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2006" } },
                { id: 7, volumeInfo: { title: "Harry Potter and the Philosopher's Stone", authors: ["J.K. Rowling"], description: "Magical adventures at Hogwarts.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1997" } },
                { id: 8, volumeInfo: { title: "அப்பா (Appa)", authors: ["சுஜாதா (Sujatha)"], description: "A warm family story.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1985" } },
                { id: 9, volumeInfo: { title: "The Little Prince", authors: ["Antoine de Saint-Exupéry"], description: "A whimsical tale of a young prince exploring the world.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1943" } },
                { id: 10, volumeInfo: { title: "Winnie-the-Pooh", authors: ["A.A. Milne"], description: "Adventures of Pooh and friends.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1926" } }
            ],
            sad: [
                { id: 11, volumeInfo: { title: "The Fault in Our Stars", authors: ["John Green"], description: "A story of young love amid illness.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2012" } },
                { id: 12, volumeInfo: { title: "நவீன பூமி (Naveena Bhoomi)", authors: ["சா. ஆ. பெரியசாமி (Sa. A. Periyasamy)"], description: "A reflective tale of separation and loss.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1974" } },
                { id: 13, volumeInfo: { title: "A Little Life", authors: ["Hanya Yanagihara"], description: "An emotional tale of friendship and trauma.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2015" } },
                { id: 14, volumeInfo: { title: "1984", authors: ["George Orwell"], description: "A dystopian classic.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1949" } },
                { id: 15, volumeInfo: { title: "ஏழைகள் (Ezhaiyargal)", authors: ["அவvaiyar (Avvaiyar)"], description: "Poems exploring suffering and resilience.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2nd century BCE" } },
                { id: 16, volumeInfo: { title: "To Kill a Mockingbird", authors: ["Harper Lee"], description: "A young girl’s look at racial inequality.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1960" } },
                { id: 17, volumeInfo: { title: "Memoirs of a Geisha", authors: ["Arthur Golden"], description: "The story of a young geisha in Japan.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1997" } },
                { id: 18, volumeInfo: { title: "பசும்பொன் (Pasumpon)", authors: ["அகிலன் (Akilan)"], description: "A heart-touching Tamil novel.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1966" } },
                { id: 19, volumeInfo: { title: "The Book Thief", authors: ["Markus Zusak"], description: "A girl’s story during WWII.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2005" } },
                { id: 20, volumeInfo: { title: "ஏழைகள் குரல் (Ezhaiyargal Kural)", authors: ["தொல்காப்பியர் (Tholkappiyar)"], description: "Reflections on the downtrodden in poetic form.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "300 BCE" } }
            ],
            exciting: [
                { id: 21, volumeInfo: { title: "The Da Vinci Code", authors: ["Dan Brown"], description: "A suspenseful quest through art history.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2003" } },
                { id: 22, volumeInfo: { title: "Jurassic Park", authors: ["Michael Crichton"], description: "A thrilling tale of dinosaurs come to life.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1990" } },
                { id: 23, volumeInfo: { title: "வேங்கை (Vengai)", authors: ["வையலூர் சீனி. வசந்தன் (Vaiyalu Seeni. Vasanthan)"], description: "An action-packed thriller set in Tamil Nadu.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1992" } },
                { id: 24, volumeInfo: { title: "பயண கதை (Payan Kadhai)", authors: ["சிவசங்கரி (Sivasankari)"], description: "A thrilling journey story.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1997" } },
                { id: 25, volumeInfo: { title: "Angels & Demons", authors: ["Dan Brown"], description: "Another gripping story featuring Robert Langdon.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2000" } },
                { id: 26, volumeInfo: { title: "பொன் விலங்கு (Pon Vilangu)", authors: ["ஜெயகாந்தன் (Jayakanthan)"], description: "A mystery novel.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1965" } },
                { id: 27, volumeInfo: { title: "Sherlock Holmes", authors: ["Arthur Conan Doyle"], description: "Iconic detective mysteries.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1892" } },
                { id: 28, volumeInfo: { title: "அறம் (Aram)", authors: ["சு.ஜி (Su.G)"], description: "Mystery and intrigue in Tamil Nadu.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2002" } },
                { id: 29, volumeInfo: { title: "The Girl with the Dragon Tattoo", authors: ["Stieg Larsson"], description: "A dark mystery novel.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2005" } },
                { id: 30, volumeInfo: { title: "The Hunger Games", authors: ["Suzanne Collins"], description: "A dystopian action novel.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2008" } }
            ],
            relaxing: [
                { id: 31, volumeInfo: { title: "திருக்குறள் (Thirukkural)", authors: ["திருவள்ளுவர் (Thiruvalluvar)"], description: "Classic Tamil literature with timeless wisdom.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "5th century" } },
                { id: 32, volumeInfo: { title: "குறுந்தொகை (Kurunthogai)", authors: ["அகவல் வள்ளுவர் (Aghaval Valluvan)"], description: "Ancient Tamil poems on nature and life.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "300 BCE" } },
                { id: 33, volumeInfo: { title: "Walden", authors: ["Henry David Thoreau"], description: "Reflections on simple living in natural surroundings.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1854" } },
                { id: 34, volumeInfo: { title: "The Wind in the Willows", authors: ["Kenneth Grahame"], description: "A cozy, nature-focused story of friendship.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1908" } },
                { id: 35, volumeInfo: { title: "Poems of Love and Nature", authors: ["செல்வி (Selvi)"], description: "Calming Tamil poetry.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "2000" } },
                { id: 36, volumeInfo: { title: "Meditations", authors: ["Marcus Aurelius"], description: "Stoic reflections for peace of mind.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "180 AD" } },
                { id: 37, volumeInfo: { title: "Peace Is Every Step", authors: ["Thich Nhat Hanh"], description: "Mindfulness practices for daily life.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1992" } },
                { id: 38, volumeInfo: { title: "சுவாசம் (Swasam)", authors: ["நாஞ்சில் (Nanjil)"], description: "Thoughtful Tamil reflections on life.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1980" } },
                { id: 39, volumeInfo: { title: "The Art of Happiness", authors: ["Dalai Lama"], description: "Guidelines for a happy, meaningful life.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1998" } },
                { id: 40, volumeInfo: { title: "The Prophet", authors: ["Kahlil Gibran"], description: "Spiritual reflections on life and love.", imageLinks: { thumbnail: "Default Image" }, publishedDate: "1923" } }
            ]
        };
        
        
        
           
           
        

    const handleSearch = async (query) => {
        try {
            const response = await axios.get("http://localhost:5000/api/books", {
                params: { query, genre },
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const fetchMoodSuggestions = async (mood) => {
        try {
            const response = await axios.get("http://localhost:5000/api/mood-suggestions", {
                params: { mood },
            });
            setBooks(response.data.length ? response.data : defaultMoodBooks[mood]);
        } catch (error) {
            console.error("Error fetching mood suggestions:", error);
            setBooks(defaultMoodBooks[mood]);
        }
    };


    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            console.log("Login response:", response.data); // Log the entire response
    
            // Check if token and userId exist in the response
            if (response.data.token && response.data.userId) {
                setIsLoggedIn(true);
                localStorage.setItem("token", response.data.token); // Store token
                console.log("Logged in successfully!");
            } else {
                alert("Login failed! Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            alert("An error occurred during login. Please try again.");
        }
    };
    
    
    
    
    

    const handleSignup=()=>{
        setIsSignup(true);
    }
    // Handle signup
   

    const handleShowSignup = () => {
        setIsSignup(true); // Show the signup form
    };

    const handleBackToLogin = () => {
        setIsSignup(false); // Go back to login form
    };

    return (
        <div>
            {isLoggedIn ?(<>
            <SearchBar onSearch={handleSearch} />
            <select onChange={(e) => setGenre(e.target.value)}>
            <option value="all">All Genres</option>
    <option value="fiction">Fiction</option>
    <option value="nonfiction">Non-Fiction</option>
    <option value="adventure">Adventure</option>
    <option value="mystery">Mystery</option>
    <option value="fantasy">Fantasy</option>
    <option value="scienceFiction">Science Fiction</option>
    <option value="historical">Historical</option>
    <option value="romance">Romance</option>
    <option value="thriller">Thriller</option>
    <option value="horror">Horror</option>
    <option value="biography">Biography</option>
    <option value="selfHelp">Self-Help</option>
    <option value="poetry">Poetry</option>
    <option value="philosophy">Philosophy</option>
    <option value="psychology">Psychology</option>
    <option value="children">Children's Books</option>
    <option value="youngAdult">Young Adult</option>
    <option value="graphicNovels">Graphic Novels</option>
    <option value="comics">Comics</option>
    <option value="travel">Travel</option>
    <option value="health">Health & Wellness</option>
    <option value="business">Business</option>
    <option value="cookbooks">Cookbooks</option>
    <option value="trueCrime">True Crime</option>
    <option value="spirituality">Spirituality</option>
    <option value="classics">Classics</option>
</select>
            
            <div>
                <button onClick={() => fetchMoodSuggestions("happy")}> Happy Books</button>
                <button onClick={() => fetchMoodSuggestions("sad")}> Sad Books</button>
                <button onClick={() => fetchMoodSuggestions("exciting")}> Exciting Books</button>
                <button onClick={() => fetchMoodSuggestions("relaxing")}> Relaxing Books</button>
            </div>
            <BookList books={books} />

            </>

            ):
            (
                isSignup ? (
                    <Signup onSignup={handleSignup} onBackToLogin={handleBackToLogin} />
                ) : (
                    <Login 
                        email={email} 
                        setEmail={setEmail} 
                        password={password} 
                        setPassword={setPassword} 
                        onLogin={handleLogin} 
                        onShowSignup={handleShowSignup} 
                    />
                )
            )}
        </div>
    );
};

export default App;