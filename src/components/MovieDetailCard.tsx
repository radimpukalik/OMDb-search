import { useParams } from "react-router-dom";
import noPoster from "../assets/no_poster.jpg";
import BackButton from "../components/BackButton";
import GenreRectangle from "../components/GenreRectangle";
import useMovie from "../hooks/useMovie";
import "../styles/components/MovieDetailCard.css";

const MovieDetailCard = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useMovie(id!);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || Object.entries(data)[0][1] === "False")
    return <p>Movie not found</p>;

  const items = [
    { label: "Release date", value: data.Released },
    { label: "Director", value: data.Director },
    { label: "Writer", value: data.Writer },
    { label: "Actors", value: data.Actors },
    { label: "Total seasons", value: data.totalSeasons },
  ];

  return (
    <main className="movie-detail-container">
      <section key={data.imdbID}>
        <div className="left-section">
          <img
            src={data.Poster !== "N/A" ? data.Poster : noPoster}
            alt="poster-detail-menu"
          />
        </div>

        <div className="right-section">
          <h2>
            {data.Title} ({data.Year})
          </h2>
          <p>
            {data.Country}, {data.Runtime}{" "}
          </p>
          <p>Rating - {data.imdbRating * 10}%</p>

          <GenreRectangle genre={data.Genre} />

          <h2>Overview</h2>
          <p>{data.Plot}</p>

          <dl>
            {items.map(
              (item) =>
                item.value && (
                  <div key={item.label}>
                    <dt>{item.label}:</dt>
                    <dd>{item.value}</dd>
                  </div>
                )
            )}
          </dl>
        </div>
      </section>

      <BackButton />
    </main>
  );
};

export default MovieDetailCard;
