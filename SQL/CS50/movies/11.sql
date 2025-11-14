SELECT title
FROM movies, ratings, stars, people
WHERE ratings.movie_id = movies.id
AND stars.movie_id = movies.id
AND stars.person_id = people.id
AND name = 'Chadwick Boseman'
ORDER BY rating DESC
LIMIT 5;

-- SELECT title
-- FROM movies
-- JOIN ratings ON ratings.movie_id = movies.id
-- JOIN stars ON stars.movie_id = movies.id
-- JOIN people ON people.id = stars.person_id
-- WHERE people.name = "Chadwick Boseman"
-- ORDER BY ratings.rating DESC;
