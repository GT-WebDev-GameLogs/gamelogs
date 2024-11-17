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

CREATE OR REPLACE PROCEDURE
add_review(IN p_user_id INT, IN p_game_id INT, IN p_rating INT, IN p_review_description TEXT, IN p_review_date TIMESTAMP) AS $$

$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
add_user() AS $$

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION
get_game_reviews(IN p_game_id INT, IN p_offset INT, IN p_limit INT)
RETURNS SETOF review
AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM review r
    WHERE r.game_id = p_game_id
    ORDER BY r.review_date DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION
get_user_reviews(IN p_user_id INT, IN p_offset INT, IN p_limit INT)
RETURNS SETOF review
AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM review r
    WHERE r.user_id = p_user_id
    ORDER BY r.review_date DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;
