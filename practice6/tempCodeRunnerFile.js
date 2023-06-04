const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "userpassword",
    database: "node-js"
});

client.connect();

// client.query(`SELECT photo_url AS channel_photo, description AS channel_description, created_at AS channel_creation_date FROM channels`, (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     }
//     else {
//         console.log(err.message);
//     }
//     client.end;
// });

client.query(`SELECT users.id AS user_id, users.name AS user_name, users.avatar_url AS user_avatar, channels.photo_url AS channel_photo, channels.description AS channel_description, channels.created_at AS channel_creation_date
FROM users
LEFT JOIN channels ON users.id = channels.user_id
ORDER BY channels.created_at DESC;
`, (err, res) => {
    if (!err) {
        console.log(res.rows);
    }
    else {
        console.log(err.message);
    }
    client.end;
});