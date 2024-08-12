import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import friendRoutes from './routes/friends.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
console.log(process.env.MONGO_URL);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/users', friendRoutes);

/* Serve static files from the React app */
app.use(express.static(path.join(__dirname, '../client/build')));

/* GRAPHQL SETUP */
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
server.applyMiddleware({ app });


/* The catch-all handler: serves React's index.html for any request that doesn't match an API route */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

console.log(process.env.MONGO_URL);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/rev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
