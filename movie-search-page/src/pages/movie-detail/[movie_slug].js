import Link from "next/link";

const Index = ({movieData}) =>{
    console.log(movieData)
    return(
        <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 className="text-3xl mb-2 bg-green-800 rounded-lg text-white">{movieData?.Title} ({movieData?.Year})</h1>
      <img className="mx-auto" src={movieData?.Poster !== "N/A" ? movieData?.Poster : "/no-image.jpg"} alt={movieData?.Title} width="200" />
      
      <table
      className="mt-4"
  style={{
    width: "100%",
    borderCollapse: "collapse",
    border: "2px solid black",
  }}
>
  <tbody>
    {[
      { label: "Genre", value: movieData?.Genre },
      { label: "Director", value: movieData?.Director },
      { label: "Actors", value: movieData?.Actors },
      { label: "Plot", value: movieData?.Plot },
      { label: "IMDB Rating", value: movieData?.imdbRating },
    ].map((row, index) => (
      <tr key={index}>
        <td
          style={{
            padding: "10px",
            fontWeight: "bold",
            border: "2px solid black",
          }}
        >
          {row.label}:
        </td>
        <td
          style={{
            padding: "10px",
            border: "2px solid black",
          }}
        >
          {row.value}
        </td>
      </tr>
    ))}
  </tbody>
</table>

<div className="bg-red-600 text-white mt-3 ">
      <Link href="/" style={{ textDecoration: "none", fontSize: "24px", color: "white" }}>
        🔙 Back to Search
      </Link>
</div>
    </div>
    );
};

export default Index;

export const getServerSideProps = async (ctx) => {
    try {
      const {movie_slug} = ctx.params;
      let splitSt = movie_slug.split('-');
      let movieId = splitSt?.[splitSt?.length-1];
      const API_KEY = "d14447ee";
      const res = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`);
      const data = await res.json();

      
      console.log("data", data)
      return {
        props: { movieData: data}, // will be passed to the page component as props
      };
    } catch (error) {
      console.log(error);
  
      return {
        props: { movieData: null}, // pass null if there's an error
      };
    }
};