import { FaFilm } from "react-icons/fa6";
import "../styles/pages/HomePage.css";

const HomePage = () => {
  return (
    <main className="homepage">
      <div>
        <FaFilm size={200} color="grey" />
      </div>
      <h1>Start Exploring!</h1>
    </main>
  );
};

export default HomePage;
