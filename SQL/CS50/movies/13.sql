SELECT DISTINCT name FROM people, stars, movies
WHERE movies.id = stars.movie_id
AND stars.person_id = people.id
AND movies.id IN
(
SELECT movies.id FROM movies, stars, people
WHERE movies.id = stars.movie_id
AND people.id = stars.person_id
AND name = 'Kevin Bacon'
AND birth = 1958
)
AND name != 'Kevin Bacon';
