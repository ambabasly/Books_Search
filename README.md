# creating a webapp with a simple search engine for books[Open Library API](https://openlibrary.org/developers/api) 

# Getting Started with Create React App

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Since the node_modules is deleted, all you need do is run 

- npm install 

### In the project directory, you can run:

- `npm start`

## Technical requirements

- Code should be written in TypeScript and React should be used as the frontend framework. Feel free to use [Create React app](https://github.com/facebook/create-react-app) or any other tool to scaffold your project.
- You can freely choose how you want to style your application
- The project should be delivered as a .zip file. DO NOT include the `node_modules` folder or the `.git` folder (if you are using version control) in the zipped archive.
- The project must include a README.md file that explains how to run the project locally.

## Functional requirements

- The user shall be presented with an input where they can search for book titles.
- Once the user has searched for books, they should be presented with a list of the books matching the query.
- If the user clicks on a book in the list of books, they should be presented with a more detailed view of the book, revealing information that is not displayed in the list view.

## A good solution...

- ...uses modern React features to reduce the cognitive complexity
- ...gives feedback to the user when an action is taking time to perform, such as indicating when a search is loading data
- ...displays only key information about a book in the list view, and shows a user-friendly view of the book details in the detailed view.
- ...handles most cases of search results, e.g. when the result returns no matches or when the search times out.
- ...has logical boundaries between components to encourage component reuse in a larger application.
- ...clearly separates concerns, splitting presentation of data from the logic underneath