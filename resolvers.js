const Movie = require('./models/Movie');
const resolvers = {
    Query: {
      getMovies: () => movies,
      getMovieById: (_, { id }) => movies.find((movie) => movie.id === id),
    },
    Mutation: {
      addMovie: (_, { name, director_name, production_house, release_date, rating }) => {
        const newMovie = { id: uuidv4(), name, director_name, production_house, release_date, rating };
        movies.push(newMovie);
        return newMovie;
      },
      updateMovie: (_, { id, name, director_name, production_house, release_date, rating }) => {
        let movie = movies.find((movie) => movie.id === id);
        if (!movie) throw new Error("Movie not found");
        if (name) movie.name = name;
        if (director_name) movie.director_name = director_name;
        if (production_house) movie.production_house = production_house;
        if (release_date) movie.release_date = release_date;
        if (rating) movie.rating = rating;
        return movie;
      },
      deleteMovie: (_, { id }) => {
        movies = movies.filter((movie) => movie.id !== id);
        return `Movie with ID ${id} deleted.`;
      },
    },
  };