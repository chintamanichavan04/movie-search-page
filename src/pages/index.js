import { useState } from "react";

const Index = () =>{
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "d14447ee"; // Replace with your OMDB API Key

  const searchMovies = async () => {

    if (!searchTerm) return;
    setLoading(true);
    
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]); // Empty array if no results
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 className="text-3xl mb-2 bg-green-800 rounded-lg text-white">🎬 Movie Search</h1>
      
      <form 
  onSubmit={(e) => {
    e.preventDefault(); // Prevents page reload
    searchMovies();
  }}
  className="flex items-center"
>
  <input
    type="text"
    placeholder="Search for a movie..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="p-2 w-[60%] mr-2 border border-black rounded-xl"
  />
  
  <button 
    type="submit" 
    className="p-2 text-white rounded-xl" 
    style={{ background: "blue" }}
  >
    Search
  </button>
</form>

      {loading && <p>Loading...</p>}

      {movies.length > 0 && (
        <table style={{ width: "80%", margin: "20px auto", borderCollapse: "collapse" }} border="1">
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th style={{ padding: "10px" }}>Poster</th>
              <th style={{ padding: "10px" }}>Title</th>
              <th style={{ padding: "10px" }}>Year</th>
              <th style={{ padding: "10px" }}>More Info</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.imdbID}>
                <td style={{ padding: "10px" }}>
                  <img src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"} alt={movie.Title} width="50" />
                </td>
                <td style={{ padding: "10px" }}>{movie.Title}</td>
                <td style={{ padding: "10px" }}>{movie.Year}</td>
                <td style={{ padding: "10px" }}>
                  <a href={`/movie-detail/${movie?.Title?.toLowerCase()?.replace(/[^a-zA-Z0-9 ]/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-')?.replace(/-$/, '')?.replace(/-$/, '')+"-"+movie?.imdbID}`}>
                  <img
                  src="/assets/img/link.svg"
                  className="w-5 h-5"
                  />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Index;


export const getServerSideProps = async (ctx) => {
  try {

    return {
      props: {
        data:""
       }, // will be passed to the page component as props
    };


  } catch (error) {
    console.log(error);

    return {
      props: { playerData: null, newslist:[],}, // pass null if there's an error
    };
  }
};