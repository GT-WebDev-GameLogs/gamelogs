DROP TYPE IF EXISTS game_multivalue_data CASCADE;
CREATE TYPE game_multivalue_data AS (
    genre_id        INT,
    genre_name      VARCHAR(50),
    gamemode_id     INT,
    gamemode_name   VARCHAR(50),
    keyword_id      INT,
    keyword_name    VARCHAR(50),
    theme_id        INT,
    theme_name      VARCHAR(50),
    platform_id     INT,
    platform_name   VARCHAR(50),
    company_id      INT,
    company_name    VARCHAR(50),
    developer       BOOLEAN,
    publisher       BOOLEAN
);

CREATE OR REPLACE PROCEDURE
add_igdb_game_data(
    IN p_game_id          INT, 
    IN p_game_name        VARCHAR(50),
    IN p_rating           REAL,
    IN p_game_description TEXT,
    IN multi_data         game_multivalue_data[]
) AS $$
DECLARE
    gd game_multivalue_data;
BEGIN
    -- Insert to game table
    INSERT INTO game (game_id, game_name, rating, game_description)
    VALUES (p_game_id, p_game_name, p_rating, p_game_description)
    ON CONFLICT DO NOTHING; -- change to raise notice

    FOREACH gd IN ARRAY multi_data
    LOOP
        INSERT INTO genre (genre_id, genre_name)
        VALUES (gd.genre_id, gd.genre_name)
        ON CONFLICT DO NOTHING;

        INSERT INTO game_genre (game_id, genre_id)
        VALUES (gd.game_id, gd.genre_id)
        ON CONFLICT DO NOTHING;

        INSERT INTO gamemode (gamemode_id, gamemode_name)
        VALUES (gd.gamemode_id, gd.gamemode_name)
        ON CONFLICT DO NOTHING;

        INSERT INTO game_gamemode (game_id, gamemode_id)
        VALUES (gd.game_id, gd.gamemode_id)
        ON CONFLICT DO NOTHING;

        INSERT INTO keyword (keyword_id, keyword_name)
        VALUES (gd.keyword_id, gd.keyword_name)
        ON CONFLICT DO NOTHING;

        INSERT INTO game_keyword (game_id, keyword_id)
        VALUES (gd.game_id, gd.keyword_id)
        ON CONFLICT DO NOTHING;
        
        INSERT INTO theme (theme_id, theme_name)
        VALUES (gd.theme_id, gd.theme_name)
        ON CONFLICT DO NOTHING;

        INSERT INTO game_theme (game_id, theme_id)
        VALUES (gd.game_id, gd.theme_id)
        ON CONFLICT DO NOTHING;

        INSERT INTO platform (platform_id, platform_name)
        VALUES (gd.platform_id, gd.platform_name)
        ON CONFLICT DO NOTHING;

        INSERT INTO game_platform (game_id, platform_id)
        VALUES (gd.game_id, gd.platform_id)
        ON CONFLICT DO NOTHING;

        INSERT INTO involved_company (company_id, company_name, developer, publisher)
        VALUES (gd.company_id, gd.company_name, gd.developer, gd.publisher)
        ON CONFLICT DO NOTHING;

        IF gd.developer THEN
            INSERT INTO game_developer (game_id, developer_id)
            VALUES (gd.game_id, gd.company_id)
            ON CONFLICT DO NOTHING;
        END IF;

        IF gd.publisher THEN
            INSERT INTO game_publisher (game_id, publisher_id)
            VALUES (gd.game_id, gd.company_id)
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
