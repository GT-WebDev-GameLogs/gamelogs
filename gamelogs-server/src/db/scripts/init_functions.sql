CREATE OR REPLACE FUNCTION
get_user_info(IN p_user_id INT)
RETURNS SETOF gl_user
AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM gl_user u
    WHERE u.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION
get_game_info(IN p_game_id INT)
RETURNS SETOF game
AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM game g
    WHERE g.game_id = p_game_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION
get_game_multivalue_info(IN p_game_id INT)
RETURNS TABLE (game_id INT, value_name TEXT, multivalue_type TEXT)
AS $$
BEGIN
    RETURN QUERY
    SELECT gt.game_id, t.theme_name AS value_name, 'theme' AS multivalue_type
    FROM game_theme gt
    INNER JOIN theme t
    ON gt.theme_id = t.theme_id
    WHERE gt.game_id = p_game_id
        UNION
    SELECT gk.game_id, k.keyword_name AS value_name, 'keyword' AS multivalue_type
    FROM game_keyword gk
    INNER JOIN keyword k
    ON gk.keyword_id = k.keyword_id
    WHERE gk.game_id = p_game_id
        UNION
    SELECT gm.game_id, m.gamemode_name AS value_name, 'gamemode' AS multivalue_type
    FROM game_gamemode gm
    INNER JOIN gamemode m
    ON gm.gamemode_id = m.gamemode_id
    WHERE gm.game_id = p_game_id
        UNION
    SELECT gg.game_id, g.genre_name AS value_name, 'genre' AS multivalue_type
    FROM game_genre gg
    INNER JOIN genre g
    ON gg.genre_id = g.genre_id
    WHERE gg.game_id = p_game_id
        UNION
    SELECT gp.game_id, p.platform_name AS value_name, 'platform' AS multivalue_type
    FROM game_platform gp
    INNER JOIN platform p
    ON gp.platform_id = p.platform_id
    WHERE gp.game_id = p_game_id
        UNION
    SELECT gp.game_id, ic.company_name AS value_name, 'publisher' AS multivalue_type
    FROM game_publisher gp
    INNER JOIN involved_company ic
    ON gp.publisher_id = ic.company_id
    WHERE gp.game_id = p_game_id
        UNION
    SELECT gd.game_id, ic.company_name AS value_name, 'developer' AS multivalue_type
    FROM game_developer gd
    INNER JOIN involved_company ic
    ON gd.developer_id = ic.company_id
    WHERE gd.game_id = p_game_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
add_review(IN p_user_id INT, IN p_game_id INT, IN p_rating INT, IN p_review_description TEXT, IN p_review_date TIMESTAMP) AS $$

$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
add_user() AS $$

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION
get_game_reviews(IN p_game_id INT, IN p_offset INT, IN p_limit INT)
RETURNS TABLE(
    review_id            INT,
    user_id              INT,
    game_id              INT,
    rating               VALID_RATING,
    review_description   TEXT,
    review_date          TIMESTAMP,
    user_name            TEXT,
    user_pfp_uri         TEXT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT r.*, u.user_name, u.user_pfp_uri
    FROM review r
    INNER JOIN gl_user u
    ON u.user_id = r.user_id
    WHERE r.game_id = p_game_id
    ORDER BY r.review_date DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION
get_user_reviews(IN p_user_id INT, IN p_offset INT, IN p_limit INT)
RETURNS TABLE(
    review_id            INT,
    user_id              INT,
    game_id              INT,
    rating               VALID_RATING,
    review_description   TEXT,
    review_date          TIMESTAMP,
    user_name            TEXT,
    game_name            TEXT,
    cover_image          TEXT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT r.*, u.user_name, g.game_name, g.cover_image
    FROM review r
    INNER JOIN gl_user u
    ON u.user_id = r.user_id
    INNER JOIN game g
    ON g.game_id = r.game_id
    WHERE r.user_id = p_user_id
    ORDER BY r.review_date DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION
search_games(IN p_search TEXT, IN p_genre TEXT, IN p_platform TEXT, IN p_release_year TEXT, IN p_publisher TEXT)
RETURNS TABLE (
    game_id INT,
    game_name TEXT,
    cover_image TEXT,
    rating REAL
)
AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT g.game_id, g.game_name, g.cover_image, g.rating
    FROM game g
    INNER JOIN game_genre gg ON gg.game_id = g.game_id
    INNER JOIN genre gr ON gg.genre_id = gr.genre_id
    INNER JOIN game_platform gp ON gp.game_id = g.game_id
    INNER JOIN platform p ON gp.platform_id = p.platform_id
    INNER JOIN game_publisher gpu ON gpu.game_id = g.game_id
    INNER JOIN involved_company ic ON gpu.publisher_id = ic.company_id
    WHERE g.game_name ILIKE CONCAT('%', p_search, '%') AND
        gr.genre_name ILIKE CONCAT('%', p_genre, '%') AND
        p.platform_name ILIKE CONCAT('%', p_platform, '%') AND
        ic.company_name ILIKE CONCAT('%', p_publisher, '%');
END;
$$ LANGUAGE plpgsql;
