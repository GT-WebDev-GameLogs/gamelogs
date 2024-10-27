-- Drop all tables and structures
DROP TABLE IF EXISTS user_game_backlog;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS gl_user;
DROP TABLE IF EXISTS game_genre;
DROP TABLE IF EXISTS game;
DROP DOMAIN IF EXISTS valid_rating;

CREATE DOMAIN valid_rating AS INT
    CHECK (value >= 1 AND value <= 5)
;

CREATE TABLE game (
    game_id          INT,
    game_name        VARCHAR(50),
    creator          VARCHAR(50),
    publisher        VARCHAR(50),
    platform         VARCHAR(50),
    rating           REAL DEFAULT 0,
    game_description TEXT,
    PRIMARY KEY      (game_id),
    UNIQUE           (game_name)
);

CREATE TABLE game_genre (
    game_id     INT,
    genre       VARCHAR(50),
    PRIMARY KEY (game_id, genre),
    FOREIGN KEY (game_id) REFERENCES game(game_id)
);

CREATE TABLE gl_user (
    user_id          INT,
    user_name        VARCHAR(50),
    user_biography   TEXT,
    PRIMARY KEY      (user_id),
    UNIQUE           (user_name)
);

CREATE TABLE review (
    review_id            INT,
    user_id              INT,
    game_id              INT,
    rating               VALID_RATING,
    review_description   TEXT,
    PRIMARY KEY          (review_id),
    FOREIGN KEY          (user_id) REFERENCES gl_user(user_id),
    FOREIGN KEY          (game_id) REFERENCES game(game_id),
    UNIQUE               (user_id, game_id)
);

CREATE TABLE user_game_backlog (
    user_id      INT,
    game_id      INT,
    PRIMARY KEY  (user_id, game_id),
    FOREIGN KEY  (user_id) REFERENCES gl_user(user_id),
    FOREIGN KEY  (game_id) REFERENCES Game(game_id)
);

CREATE OR REPLACE PROCEDURE
update_game_rating (IN p_game_id INT) AS $$
DECLARE 
    avg_rating REAL;
BEGIN
    SELECT AVG(rating) INTO avg_rating
    FROM review r
    WHERE r.game_id = p_game_id;

    UPDATE game g
    SET rating = avg_rating
    WHERE g.game_id = p_game_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION after_insert_review() RETURNS TRIGGER AS $$
BEGIN
    CALL update_game_rating(NEW.game_id);
    return NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger to update game rating once a review is inserted
CREATE OR REPLACE TRIGGER after_insert_review_trigger
AFTER INSERT ON review
FOR EACH ROW
EXECUTE FUNCTION after_insert_review();
