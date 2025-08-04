// const { Book } = require("./models/Book");
// const { books, authors } = require("./data");
// const { Author } = require("./models/Author");
// const conectToDB = require("./config/db");
// require("dotenv").config();

// // Connection To DB
// conectToDB();

// // Import Books
// const importBooks = async () => {
//   try {
//     await Book.insertMany(books);
//     console.log("Books Imported");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// // Import Authors
// const importAuthors = async () => {
//   try {
//     await Author.insertMany(authors);
//     console.log("Authors Imported");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// // Remove Books
// const removeBooks = async () => {
//   try {
//     await Book.deleteMany();
//     console.log("Books Removed!");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// // Remove Authors
// const removeAuthors = async () => {
//   try {
//     await Author.deleteMany();
//     console.log("Authors Removed");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === "-import") {
//   importBooks();
// } else if (process.argv[2] === "-remove") {
//   removeBooks();
// } else if (process.argv[2] === "-import-authors") {
//   importAuthors();
// } else if (process.argv[2] === "-remove-authors") {
//   removeAuthors();
// }
