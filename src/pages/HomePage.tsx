import { FaFilm } from "react-icons/fa6";
import "../styles/MovieList.css";

const HomePage = () => {
  return (
    <div className="empty-movie-list-container">
      <div className="empty-mobie-list-icon">
        <FaFilm size={200} color="grey" />
      </div>
      <p className="empty-movie-list-text">Start Exploring!</p>
    </div>
  );
};

export default HomePage;
