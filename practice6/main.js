"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var client = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "userpassword",
    database: "node-js"
});
client.connect();
function makeQuery(queryText) {
    client.query("".concat(queryText), function (err, res) {
        if (!err) {
            res.rows.forEach(function (element) {
                console.log(element);
            });
        }
        else {
            console.log(err.message);
        }
        client.end;
    });
}
var task1 = "SELECT users.id AS user_id, users.name AS user_name, users.avatar_url AS user_avatar, channels.photo_url AS channel_photo, channels.description AS channel_description, channels.created_at AS channel_creation_date\nFROM users\nLEFT JOIN channels ON users.id = channels.user_id\nORDER BY channels.created_at DESC;";
var task2 = "SELECT v.id AS video_id, v.title, COUNT(*) AS likes_count\nFROM likes l\nJOIN videos v ON l.video_id = v.id\nWHERE l.positive = true\nGROUP BY v.id, v.title\nORDER BY likes_count DESC\nLIMIT 5;";
var task3 = "SELECT videos.id AS video_id, videos.title AS video_title, videos.preview_url AS video_preview,\nvideos.duration AS video_duration, videos.published_at AS video_publish_date\nFROM videos\nJOIN channels ON videos.channel_id = channels.id\nJOIN subscriptions ON channels.id = subscriptions.channel_id\nJOIN users ON channels.user_id = users.id\nWHERE users.name = 'Stephanie Bulger'\nORDER BY videos.published_at DESC;";
var task4 = "SELECT channels.*, COUNT(subscriptions.id) AS subscriber_count\nFROM channels\nLEFT JOIN subscriptions ON channels.id = subscriptions.channel_id\nWHERE channels.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76'\nGROUP BY channels.id;";
var task5 = "SELECT video_id, COUNT(*) AS total_likes\nFROM likes\nWHERE positive = true AND created_at >= '2021-09-01'\nGROUP BY video_id\nHAVING COUNT(*) > 3\nORDER BY total_likes DESC\nLIMIT 10;";
var task6 = "SELECT u.name AS channel_name, u.avatar_url AS channel_avatar, c.photo_url AS channel_photo,\nc.description AS channel_description, s.level AS subscription_level, s.subscribed_at AS subscription_date\nFROM subscriptions s\nJOIN channels c ON s.channel_id = c.id\nJOIN users u ON c.user_id = u.id\nJOIN users sub_user ON s.user_id = sub_user.id\nWHERE sub_user.name = 'Ennis Haestier'\nORDER BY CASE s.level\n    WHEN 'vip' THEN 1\n    WHEN 'follower' THEN 2\n    WHEN 'fan' THEN 3\n    WHEN 'standard' THEN 4\nEND, s.subscribed_at DESC;";
makeQuery(task1);
// makeQuery(task2);
// makeQuery(task3);
// makeQuery(task4);
// makeQuery(task5);
// makeQuery(task6);
