import { Client } from 'pg';

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "userpassword",
    database: "node-js"
});

client.connect();

function makeQuery(queryText: string) {
    client.query(`${queryText}`, (err, res) => {
        if (!err) {
            res.rows.forEach((element: any) => {
                console.log(element);
            });

        } else {
            console.log(err.message);
        }
        client.end;
    });
}

const task1 = `SELECT users.id AS user_id, users.name AS user_name, users.avatar_url AS user_avatar, channels.photo_url AS channel_photo, channels.description AS channel_description, channels.created_at AS channel_creation_date
FROM users
LEFT JOIN channels ON users.id = channels.user_id
ORDER BY channels.created_at DESC;`;

const task2 = `SELECT v.id AS video_id, v.title, COUNT(*) AS likes_count
FROM likes l
JOIN videos v ON l.video_id = v.id
WHERE l.positive = true
GROUP BY v.id, v.title
ORDER BY likes_count DESC
LIMIT 5;`;

const task3 = `SELECT videos.id AS video_id, videos.title AS video_title, videos.preview_url AS video_preview,
videos.duration AS video_duration, videos.published_at AS video_publish_date
FROM videos
JOIN channels ON videos.channel_id = channels.id
JOIN subscriptions ON channels.id = subscriptions.channel_id
JOIN users ON channels.user_id = users.id
WHERE users.name = 'Stephanie Bulger'
ORDER BY videos.published_at DESC;`;

const task4 = `SELECT channels.*, COUNT(subscriptions.id) AS subscriber_count
FROM channels
LEFT JOIN subscriptions ON channels.id = subscriptions.channel_id
WHERE channels.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76'
GROUP BY channels.id;`;

const task5 = `SELECT video_id, COUNT(*) AS total_likes
FROM likes
WHERE positive = true AND created_at >= '2021-09-01'
GROUP BY video_id
HAVING COUNT(*) > 3
ORDER BY total_likes DESC
LIMIT 10;`;

const task6 = `SELECT u.name AS channel_name, u.avatar_url AS channel_avatar, c.photo_url AS channel_photo,
c.description AS channel_description, s.level AS subscription_level, s.subscribed_at AS subscription_date
FROM subscriptions s
JOIN channels c ON s.channel_id = c.id
JOIN users u ON c.user_id = u.id
JOIN users sub_user ON s.user_id = sub_user.id
WHERE sub_user.name = 'Ennis Haestier'
ORDER BY CASE s.level
    WHEN 'vip' THEN 1
    WHEN 'follower' THEN 2
    WHEN 'fan' THEN 3
    WHEN 'standard' THEN 4
END, s.subscribed_at DESC;`;

makeQuery(task1);
makeQuery(task2);
makeQuery(task3);
makeQuery(task4);
makeQuery(task5);
makeQuery(task6);
