INSERT INTO gl_user (user_id, user_name, user_biography) VALUES
    (1, 'user1', 'some biography'),
    (2, 'user2', 'some other biography')
;

INSERT INTO review (review_id, user_id, game_id, rating, review_description, review_date) VALUES
    (1, 1, 201506, 4, 'good adaptation of the original web series. great liminal spaces vibe', TIMESTAMP '2024-11-12 19:15:00'),
    (2, 2, 201506, 1, 'i hate horror games, this sucks', TIMESTAMP '2024-11-13 19:15:00'),
    (3, 1, 160150, 5, 'fruit ninja in VR, how technology progresses...', TIMESTAMP '2024-11-14 19:15:00'),
    (4, 1, 312455, 3, 'incredible game for going through a drive thru if a drive thru in real life is not possible to drive thru', TIMESTAMP '2024-11-15 19:15:00')
    -- (5, 1, 1, 3, 'duplicate review, should fail')
;
