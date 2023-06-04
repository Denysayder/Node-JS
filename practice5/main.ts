import * as express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    name?: string;
}

let users: User[] = [];
let nextUserId = 1;

const app = express();
app.use(express.json());

// Отримання списку користувачів (id + username + name)
app.get('/users/list', (req: Request, res: Response) => {
    const userList = users.map((user) => ({
        id: user.id,
        username: user.username,
        name: user.name,
    }));
    res.json(userList);
});

// Отримання користувача за його id
app.get('/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Створення користувача
app.post('/users', (req: Request, res: Response) => {
    const { username, name } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    const newUser: User = {
        id: nextUserId,
        username,
        name,
    };
    users.push(newUser);
    nextUserId++;
    res.status(201).json(newUser);
});

// Оновлення даних користувача за його id
app.put('/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { username, name } = req.body;
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.username = username || user.username;
    user.name = name || user.name;
    res.json(user);
});

// Видалення користувача за його id
app.delete('/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const deletedUser = users.splice(index, 1)[0];
    res.json(deletedUser);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




const addUser = async () => {
    try {
        const userData = {
            username: 'john_doe',
            name: 'John Doe',
        };

        const response = await axios.post('http://localhost:3000/users', userData);
        console.log('User added:', response.data);
    } catch (error) {
        console.error('Error adding user:', error.response.data);
    }
};

addUser();