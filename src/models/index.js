const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Movie.hasMany(Actor);
Actor.belongsTo(Movie);

Movie.hasMany(Director);
Director.belongsTo(Movie);

Movie.belongsToMany(Genre, {through: "MoviesGenres"});
Genre.belongsToMany(Movie, {through: "MoviesGenres"});