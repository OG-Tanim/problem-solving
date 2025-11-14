-- Keep a log of any SQL queries you execute as you solve the mystery.
-- Getting the schema of the db to a temp file.
.schema
-- Gettign description of the event.
SELECT description FROM crime_scene_reports WHERE month = 7 AND day = 28 AND year = 2024 AND street = 'Humphrey Street';
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                       description                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery. Interviews were conducted today with three witnesses who were present at the time – each of their interview transcripts mentions the bakery. |
| Littering took place at 16:36. No known witnesses.                                                                                                                                                                       |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
--Getting the witness names and transcripts
SELECT name, transcript FROM interviews WHERE month = 7 AND day = 28 AND year = 2024 AND transcript LIKE '%bakery
%';
+---------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|  name   |                                                                                                                                                     transcript                                                                                                                                                      |
+---------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Ruth    | Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery parking lot and drive away. If you have security footage from the bakery parking lot, you might want to look for cars that left the parking lot in that time frame.                                                          |
| Eugene  | I don''t know the thief''s name, but it was someone I recognized. Earlier this morning, before I arrived at Emma''s bakery, I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.                                                                                                 |
| Raymond | As the thief was leaving the bakery, they called someone who talked to them for less than a minute. In the call, I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow. The thief then asked the person on the other end of the phone to purchase the flight ticket. |
+---------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-- Getting list of suspects who withdrew from atm at Legett Street on 28th July
SELECT name FROM people, bank_accounts WHERE bank_accounts.person_id = people.id AND account_number IN (SELECT account_number FROM atm_transactions WHERE year = 2024 AND month = 7 AND day = 28 AND atm_location = 'Leggett Street' AND transaction_type = 'withdraw');
+---------+
|  name   |
+---------+
| Bruce   |
| Diana   |
| Brooke  |
| Kenny   |
| Iman    |
| Luca    |
| Taylor  |
| Benista |
+---------+

-- Getting name of car owners who left the parking lot within ten minutes of theft
SELECT name FROM people WHERE license_plate IN (SELECT license_plate FROM bakery_security_logs WHERE year = 2024 AND day = 28 AND month = 7 AND hour = 10 AND minute BETWEEN 15 AND 25);
+---------+
|  name   |
+---------+
| Vanessa |
| Barry   |
| Iman    |
| Sofia   |
| Luca    |
| Diana   |
| Kelsey  |
| Bruce   |
+---------+

-- list of suspects from witness interviews - who withdrew money and left the parking lot
SELECT name FROM people, bank_accounts
WHERE bank_accounts.person_id = people.id
AND account_number IN (
    SELECT account_number
    FROM atm_transactions
    WHERE year = 2024
     AND month = 7
     AND day = 28
     AND atm_location = 'Leggett Street'
     AND transaction_type = 'withdraw'
)
AND people.license_plate IN (
    SELECT license_plate
    FROM bakery_security_logs
    WHERE year = 2024
     AND day = 28
     AND month = 7
     AND hour = 10
     AND minute BETWEEN 15 AND 25
    );
+-------+
| name  |
+-------+
| Bruce |
| Diana |
| Iman  |
| Luca  |
+-------+

--likely accomplice who received call from the thief
SELECT name FROM people WHERE phone_number IN (SELECT receiver FROM phone_calls WHERE year = 2024 AND day = 28 AND month = 7 AND duration < 60);
+------------+
|    name    |
+------------+
| James      |
| Larry      |
| Anna       |
| Jack       |
| Melissa    |
| Jacqueline |
| Philip     |
| Robin      |
| Doris      |
+------------+
-- Gettings the passengers on the earliest flight out of fiftyville on the next day of theft (29th July)
SELECT name
FROM people
WHERE passport_number IN (
    SELECT passport_number
    FROM passengers
    JOIN flights
    ON flights.id = passengers.flight_id
    WHERE flights.id = (
        SELECT id
        FROM flights
        WHERE year = 2024
        AND month = 7
        AND day = 29
        AND origin_airport_id = (
            SELECT DISTINCT airports.id
            FROM airports
            JOIN flights
            ON airports.id = flights.origin_airport_id
            WHERE airports.city = 'Fiftyville'
        )
        ORDER BY hour, minute LIMIT 1));
+--------+
|  name  |
+--------+
| Kenny  |
| Sofia  |
| Taylor |
| Luca   |
| Kelsey |
| Edward |
| Bruce  |
| Doris  |
+--------+
--Getting the person who received the call and was a passenger of the flight
SELECT name
FROM people
WHERE passport_number IN (
    SELECT passport_number
    FROM passengers
    JOIN flights ON flights.id = passengers.flight_id WHERE flights.id = (
        SELECT id FROM flights
        WHERE year = 2024
        AND month = 7
        AND day = 29
        AND origin_airport_id = (
            SELECT DISTINCT airports.id
            FROM airports
            JOIN flights
            ON airports.id = flights.origin_airport_id
            WHERE airports.city = 'Fiftyville'
        )
        ORDER BY hour, minute
        LIMIT 1
        )
    )
AND phone_number IN (
    SELECT receiver
    FROM phone_calls
    WHERE year = 2024 AND day = 28 AND month = 7 AND duration < 60
    );
+-------+
| name  |
+-------+
| Luca  |
| Doris |
+-------+

--Finally, catching the accomplice who was
-- 1. a passanger
-- 2. the receiver of a call
-- 3. was not in the list of suspected thieves

SELECT name
FROM people
WHERE passport_number IN (
    SELECT passengers.passport_number
    FROM passengers
    JOIN flights
        ON flights.id = passengers.flight_id
    WHERE flights.id = (
        SELECT id
        FROM flights
        WHERE year = 2024
          AND month = 7
          AND day = 29
          AND origin_airport_id = (
            SELECT DISTINCT airports.id
            FROM airports
            JOIN flights
            ON airports.id = flights.origin_airport_id
            WHERE airports.city = 'Fiftyville'
        )
        ORDER BY hour, minute
        LIMIT 1
    )
) -- this one pulls the passegers of the specific flight
AND phone_number IN (
    SELECT receiver
    FROM phone_calls
    WHERE year = 2024
      AND month = 7
      AND day = 28
      AND duration < 60
) -- this one just pulls out the receiver of calls on the specific time
AND name NOT IN (
    SELECT p.name
    FROM people p
    JOIN bank_accounts b
        ON b.person_id = p.id
    WHERE b.account_number IN (
        SELECT account_number
        FROM atm_transactions
        WHERE year = 2024
          AND month = 7
          AND day = 28
          AND atm_location = 'Leggett Street'
          AND transaction_type = 'withdraw'
    ) -- this use fetches the account holders who withdrew money on the specific date and locaiton
    AND p.license_plate IN (
        SELECT license_plate
        FROM bakery_security_logs
        WHERE year = 2024
          AND month = 7
          AND day = 28
          AND hour = 10
          AND minute BETWEEN 15 AND 25
    ) -- this one pulls the car drivers who left the parking lot in a specific time window on 28th July
);
+-------+
| name  |
+-------+
| Doris |
+-------+
-- Getting the destination of the earliest flight to figure out the city the thief escaped to
SELECT city
FROM airports
JOIN flights
ON flights.destination_airport_id = airports.id
WHERE flights.id = (
    SELECT id
    FROM flights
    WHERE year = 2024
    AND month = 7
    AND day = 29
    AND origin_airport_id = (
    SELECT DISTINCT airports.id
    FROM airports
    JOIN flights
    ON airports.id = flights.origin_airport_id
    WHERE airports.city = 'Fiftyville'
    )
    ORDER BY hour, minute
    LIMIT 1
);
+---------------+
|     city      |
+---------------+
| New York City |
+---------------+
-- GETTING callers on that day
SELECT name
FROM people
WHERE phone_number IN (
    SELECT caller
    FROM phone_calls
    WHERE year = 2024
    AND day = 28
    AND month = 7
    AND duration < 60
);
+---------+
|  name   |
+---------+
| Kenny   |
| Sofia   |
| Benista |
| Taylor  |
| Diana   |
| Kelsey  |
| Bruce   |
| Carina  |
+---------+
-- Catching our Thief who
-- 1. withdrew money from Legett Street,
-- 2. drove out of the parking lot,
-- 3. was the caller of a call less than 60s,
-- 4. was a passanger on the target flight
SELECT name
FROM people
JOIN bank_accounts
ON bank_accounts.person_id = people.id
AND account_number IN (
    SELECT account_number
    FROM atm_transactions
    WHERE year = 2024
     AND month = 7
     AND day = 28
     AND atm_location = 'Leggett Street'
     AND transaction_type = 'withdraw'
) -- people who withdrew money from Legett Street
AND people.license_plate IN (
    SELECT license_plate
    FROM bakery_security_logs
    WHERE year = 2024
     AND day = 28
     AND month = 7
     AND hour = 10
     AND minute BETWEEN 15 AND 25
) -- people who drove out of the parkinglot
AND name IN (
    SELECT name
    FROM people
    WHERE phone_number IN (
        SELECT caller
        FROM phone_calls
        WHERE year = 2024
        AND day = 28
        AND month = 7
        AND duration < 60
    ) -- people who were callers on that
) AND name IN (
    SELECT name
    FROM people
    WHERE passport_number IN (
        SELECT passport_number
        FROM passengers
        JOIN flights
        ON passengers.flight_id = flights.id
        WHERE flight_id = (
            SELECT id
            FROM flights
            WHERE year = 2024
            AND month = 7
            AND day = 29
            AND origin_airport_id = (
                SELECT DISTINCT airports.id
                FROM airports
                JOIN flights
                ON airports.id = flights.origin_airport_id
                WHERE airports.city = 'Fiftyville'
            )
            ORDER BY hour, minute
            LIMIT 1
        )
    )
); -- people who were passangers on that flight
+-------+
| name  |
+-------+
| Bruce |
+-------+


--UNFORTUNATELY I thought the accomplice also travelled with the theif as the witness interview stated "I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow". I was confused by the use of the word "they" in "they were panning to take the earliest flight out of Fiftyville tomorrow."

-- Catching the accomplice by getting who received Bruce's call on that day
SELECT name
FROM people
WHERE phone_number = (
    SELECT receiver
    FROM phone_calls
    WHERE year = 2024
    AND month = 7
    AND day = 28
    AND duration < 60
    AND caller = (
        SELECT DISTINCT phone_number
        FROM people
        WHERE name = 'Bruce'
    )
);
+-------+
| name  |
+-------+
| Robin |
+-------+
