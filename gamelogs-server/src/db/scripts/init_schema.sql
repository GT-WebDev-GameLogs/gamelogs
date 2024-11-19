-- Drop all tables and structures
DROP TABLE IF EXISTS user_follower;
DROP TABLE IF EXISTS user_game_backlog;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS gl_user;
-- DROP TABLE IF EXISTS game_platform;
-- DROP TABLE IF EXISTS game_publisher;
-- DROP TABLE IF EXISTS game_developer;
-- DROP TABLE IF EXISTS involved_company;
-- DROP TABLE IF EXISTS game_theme;
-- DROP TABLE IF EXISTS game_keyword;
-- DROP TABLE IF EXISTS game_gamemode;
-- DROP TABLE IF EXISTS game_genre;
-- DROP TABLE IF EXISTS theme;
-- DROP TABLE IF EXISTS keyword;
-- DROP TABLE IF EXISTS gamemode;
-- DROP TABLE IF EXISTS genre;
-- DROP TABLE IF EXISTS game;
-- DROP TABLE IF EXISTS platform;
-- DROP DOMAIN IF EXISTS valid_rating;

CREATE DOMAIN valid_rating AS INT
    CHECK (value >= 1 AND value <= 5)
;

CREATE TABLE platform (
    platform_id     INT,
    platform_name   TEXT,
    PRIMARY KEY     (platform_id)
);

CREATE TABLE theme (
    theme_id        INT,
    theme_name      TEXT,
    PRIMARY KEY     (theme_id)
);

CREATE TABLE keyword (
    keyword_id     INT,
    keyword_name   TEXT,
    PRIMARY KEY    (keyword_id)
);

CREATE TABLE gamemode (
    gamemode_id    INT,
    gamemode_name  TEXT,
    PRIMARY KEY    (gamemode_id)
);

CREATE TABLE genre (
    genre_id       INT,
    genre_name     TEXT,
    PRIMARY KEY    (genre_id)
);

CREATE TABLE game (
    game_id             INT,
    game_name           TEXT,
    rating              REAL DEFAULT 0,
    game_description    TEXT,
    cover_image         TEXT,
    PRIMARY KEY         (game_id),
    UNIQUE              (game_name)
);

CREATE TABLE game_theme (
    game_id     INT,
    theme_id    INT,
    PRIMARY KEY (game_id, theme_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (theme_id) REFERENCES theme(theme_id)
);

CREATE TABLE game_keyword (
    game_id     INT,
    keyword_id  INT,
    PRIMARY KEY (game_id, keyword_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (keyword_id) REFERENCES keyword(keyword_id)
);

CREATE TABLE game_gamemode (
    game_id     INT,
    gamemode_id INT,
    PRIMARY KEY (game_id, gamemode_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (gamemode_id) REFERENCES gamemode(gamemode_id)
);

CREATE TABLE game_genre (
    game_id     INT,
    genre_id    INT,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE involved_company (
    company_id      INT,
    company_name    TEXT,
    developer       BOOLEAN,
    publisher       BOOLEAN,
    PRIMARY KEY (company_id)
);

CREATE TABLE game_developer (
    game_id         INT,
    developer_id    INT,
    PRIMARY KEY (game_id, developer_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (developer_id) REFERENCES involved_company(company_id)
);

CREATE TABLE game_publisher (
    game_id         INT,
    publisher_id    INT,
    PRIMARY KEY (game_id, publisher_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (publisher_id) REFERENCES involved_company(company_id)
);

CREATE TABLE game_platform (
    game_id     INT,
    platform_id INT,
    PRIMARY KEY (game_id, platform_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (platform_id) REFERENCES platform(platform_id)
);

CREATE TABLE gl_user (
    user_id          INT,
    user_name        TEXT,
    user_biography   TEXT,
    user_pfp_uri     TEXT,
    num_reviews      INT,
    num_followers    INT,
    num_following    INT,
    PRIMARY KEY      (user_id),
    UNIQUE           (user_name)
);

CREATE TABLE review (
    review_id            INT,
    user_id              INT,
    game_id              INT,
    rating               VALID_RATING,
    review_description   TEXT,
    review_date          TIMESTAMP,
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
    FOREIGN KEY  (game_id) REFERENCES game(game_id)
);

CREATE TABLE user_follower (
    user_id     INT,
    follower_id INT,
    PRIMARY KEY (user_id, follower_id),
    FOREIGN KEY (user_id) REFERENCES gl_user(user_id),
    FOREIGN KEY (follower_id) REFERENCES gl_user(user_id)
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

-- trigger to validate game publisher or developer reference
CREATE OR REPLACE FUNCTION validate_company_reference(IN company_id INT, IN company_type TEXT) RETURNS VOID AS $$
DECLARE
    query TEXT;
    query_res INT := 0;
BEGIN
    IF company_id IS NOT NULL THEN
        query := format('
            SELECT 1 FROM involved_company
            WHERE company_id = %L AND %I = TRUE
        ', company_id, company_type);

        EXECUTE query INTO query_res;

        IF query_res = 0 THEN
            RAISE EXCEPTION 'Invalid company reference with id: %, type: %', company_id, company_type;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION after_insert_game_company() RETURNS TRIGGER AS $$
DECLARE 
    company_type TEXT;
BEGIN
    company_type := TG_ARGV[0];
    CASE company_type
        WHEN 'publisher' THEN
            PERFORM validate_company_reference(NEW.publisher_id, company_type);
        WHEN 'developer' THEN
            PERFORM validate_company_reference(NEW.developer_id, company_type);
        ELSE
            RAISE EXCEPTION 'Invalid company type: %', company_type;
    END CASE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger to update game rating once a review is inserted
CREATE OR REPLACE TRIGGER after_insert_game_developer_trigger
BEFORE INSERT ON game_developer
FOR EACH ROW
EXECUTE FUNCTION after_insert_game_company('developer');

CREATE OR REPLACE TRIGGER after_insert_game_publisher_trigger
BEFORE INSERT ON game_publisher
FOR EACH ROW
EXECUTE FUNCTION after_insert_game_company('publisher');
