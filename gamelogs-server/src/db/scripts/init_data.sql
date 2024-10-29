INSERT INTO game (game_id, game_name, rating, game_description) VALUES
    (1, 'Roblox', NULL, 'roblox is a game'),
    (2, 'The Legend of Zelda: Breath of the Wild', NULL, 'tloz botw is a game')
;

INSERT INTO gl_user (user_id, user_name, user_biography) VALUES
    (1, 'user1', 'some biography'),
    (2, 'user2', 'some other biography')
;

INSERT INTO review (review_id, user_id, game_id, rating, review_description) VALUES
    (1, 1, 1, 3, 'robux is not free'),
    (2, 2, 2, 5, 'wow'),
    (3, 1, 2, 4, 'lesser wow'),
    (4, 2, 1, 1, 'bad game')
    -- (5, 1, 1, 3, 'duplicate review, should fail')
;
