import { useNavigate } from "react-router-dom";
import "../styles/MovieDetails.css";

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate("/");
  };

  return (
    <div className="movie-detail-go-back" onClick={goBack}>
      Back
    </div>
  );
};

export default BackButton;
