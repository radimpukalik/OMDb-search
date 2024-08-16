import { FC } from "react";
import "../styles/MovieDetails.css";

interface Props {
  genre: string | undefined;
}

const GenreRectangle: FC<Props> = ({ genre }) => {
  if (!genre) {
    return null;
  }

  const genreArray = genre.split(", ");

  return (
    <div className="movie-details-genre-container">
      {genreArray.map((genre, index) => (
        <p key={index} className="movie-details-genre">
          {genre}
        </p>
      ))}
    </div>
  );
};
export default GenreRectangle;
