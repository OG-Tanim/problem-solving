SELECT AVG(rating) from ratings, movies WHERE
ratings.movie_id = movies.id AND
year = 2012;
