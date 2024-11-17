INSERT INTO gl_user (user_id, user_name, user_biography, user_pfp_uri, num_reviews, num_followers, num_following) VALUES
    (1328, 'Zechariah Frierson', 'descriptions are cool. if they get too long they start to disappear', 'https://yt3.googleusercontent.com/xjLBdnHzQcr5SQyxwjAPJD6r6Z-pANaqnWJCJQ9sT9rY48hOv0F3EjmH9rQHJ392jC8QCbkU=s900-c-k-c0x00ffffff-no-rj', 10, 200, 132),
    (9922, 'Timothy Sung', 'hello I play games', 'https://lh3.googleusercontent.com/a/ACg8ocLybiK4NbW0G1_NIkAdVtsS0Uf1gSsMCaDnl40ZciCmMabAImE=s96-c', 3, 20, 24)
;

INSERT INTO review (review_id, user_id, game_id, rating, review_description, review_date) VALUES
    (1, 9922, 201506, 4, 'good adaptation of the original web series. great liminal spaces vibe', TIMESTAMP '2024-11-12 19:15:00'),
    (2, 1, 201506, 1, 'i hate horror games, this sucks', TIMESTAMP '2024-11-13 19:15:00'),
    (3, 9922, 160150, 5, 'fruit ninja in VR, how technology progresses...', TIMESTAMP '2024-11-14 19:15:00'),
    (4, 9922, 312455, 3, 'incredible game for going through a drive thru if a drive thru in real life is not possible to drive thru', TIMESTAMP '2024-11-15 19:15:00'),
    (5, 1328, 2684, 1, 'sample review', TIMESTAMP '2024-11-16 17:00:00'),
    (6, 1328, 7585, 1, 'sample review', TIMESTAMP '2024-11-16 18:00:00'),
    (7, 1328, 9114, 1, 'sample review', TIMESTAMP '2024-11-16 19:00:00'),
    (8, 1328, 10177, 1, 'sample review', TIMESTAMP '2024-11-16 20:00:00'),
    (9, 1328, 14369, 1, 'sample review', TIMESTAMP '2024-11-16 21:00:00'),
    (10, 1328, 15836, 1, 'sample review', TIMESTAMP '2024-11-16 22:00:00')
;
