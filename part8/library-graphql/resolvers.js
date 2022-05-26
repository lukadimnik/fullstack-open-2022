require('dotenv').config();
const { UserInputError } = require('apollo-server');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const JWT_SECRET = process.env.SECRET_KEY;

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author');
      if (args.author && args.genre) {
        return books
          .filter((book) => book.author.name === args.author)
          .filter((book) => book.genres.includes(args.genre));
      }
      if (args.author) {
        return books.filter((book) => book.author.name === args.author);
      }
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }

      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const doesTitleExist = await Book.find({ title: args.title });
      if (doesTitleExist.length) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        });
      }
      const existingAuthor = await Author.findOne({ name: args.author });

      if (!existingAuthor) {
        author = new Author({ name: args.author });
        author.save();
      } else {
        author = existingAuthor;
      }
      const book = new Book({ ...args, author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', {
        bookAdded: book,
      });

      return book;
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      let author;
      try {
        author = Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      if (!author) {
        return null;
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      console.log('user logged in successfully');
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;
