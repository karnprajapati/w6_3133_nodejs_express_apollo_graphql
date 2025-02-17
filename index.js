const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/userSchema');
const resolvers = require('./resolvers/userResolvers');

dotenv.config();

const app = express();
app.use(express.json());
app.use('*', cors());

const server = new ApolloServer({ typeDefs, resolvers });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Unable to connect to DB: ${error.message}`);
    }
};

server.start().then(() => {
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 8081;

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        connectDB();
    });
});