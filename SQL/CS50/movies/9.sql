SELECT DISTINCT name FROM people, movies, stars WHERE
people.id = stars.person_id AND
stars.movie_id = movies.id AND
year = 2004 AND year IS NOT NULL
ORDER BY birth;
