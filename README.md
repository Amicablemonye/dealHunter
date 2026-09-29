# CSCI 2170 Assignment 1

Fill in each section below as you work on your assignment. Replace every line in _italics_ with your own writing, and keep the headings as they are so we can find everything easily.

---

## About you

- **Full name:** AMICABLE MONYE
- **B00/B01 number:** B00987091
- **Dal email address:** AM877852@DAL.CA

## GitLab project link

_Paste the link to your GitLab a1 project folder here. This lets us verify your submission._

---

## Application type

**Theme I chose:** News

**API I'm using (full URL):** https://www.cheapshark.com/api/1.0/deals

**Why I chose this application:** I chose to build a game deals application because as a gamer, I regularly look for discounted games across different stores. Manually checking multiple storefronts can be quite tasking, so I wanted to create a single place where users can search for deals, compare prices, and save their favourites.

## Application name and description

**Name:** DealHunter

DealHunter is a web application that helps gamers find the best deals on PC games. Users can search for games by title, view current sale prices alongside original prices and savings percentages, click on a game to see its historical lowest price and and save favourite deals easy reference.

---

## Setting up and running the application

1. Clone or download the repository to your local machine.
2. Open the project folder in a code editor such as VS Code.
3. Confirm that `npm install` is on system i.e. install npm
4. Open `index.html` directly in a web browser, or use a local development server such as the VS Code Live Server extension.
5. The application loads with sample deal cards on the home page. Use the search bar to look up games by title via the CheapShark API.

## Features implemented

Mark each feature you've implemented with an `x`, like this: `[x]`.

- [x] Search for information, with a click-through view that shows more detail
- [x] Three distinct views: computer, tablet, and phone
- [x] Favourite search results, with a Favourites page to view and manage them
- [x] A visible error state shown on the page when a request fails
- [ ] (Optional) Favourites kept after a reload using sessionStorage or localStorage

## APIs used

1. **CheapShark Deals API** — `https://www.cheapshark.com/api/1.0/deals?title={searchTerm}` — searches for game deals by title.
2. **CheapShark Games API** — `https://www.cheapshark.com/api/1.0/games?id={gameId}` — retrieves detailed pricing info and deals across stores for a specific game.

## Citations

- _Full screen overlay menu with HTML,CSS,javascript - stack overflow. (n.d.). https://stackoverflow.com/questions/63740638/full-screen-overlay-menu-with-html-css-javascript_
- _JavaScript Fetch API. W3Schools. (n.d.). https://www.w3schools.com/js/js_api_fetch.asp_
- _Bootstrap 5 documentation; Bootstrap. (n.d.). https://getbootstrap.com/docs/5.3/_
- _heapShark API documentation; CheapShark API. (n.d.). https://apidocs.cheapshark.com/_

---

## Explain your code

Answer each of these in your own words, using your own code. Questions like these will appear on the test.

### 1. Where does your request happen?

Name the file and function where your `fetch()` call lives. Then walk through what happens, in order, from the moment someone submits a search to the moment results appear on the page.

The `fetch()` calls live inside `js/app.js`. The main request happens when a user clicks the search button, which triggers an event listener that calls the `getFetch()` function. `getFetch()` handles the API call and parses the response to JSON. It also handles any server-side errors — if the request is denied or was unsuccessful, If no game is found matching the specified title, the server still returns a successful response—specifically, it returns an array, albeit an empty one. In that case, the app displays "Cannot find game. Try again." If the website itself encounters a problem, we catch the error and respond to the user accordingly. Otherwise, if we successfully retrieve games for the specified title, If the website itself faces a problem, we catch the error and respond to the user accordingly. Otherwise, if we successfully got games from the title, `displayGames(games)` is executed, which replaces the static game list with game cards from the API. It runs a `forEach` on each game returned, creates a `div` for each one, and populates it with the desired data extracted by `getGameData()`. As long as the title matches, the game card with its `gameID` is appended to the game container. This handles the entire process from when a user inputs their desired game into the search bar to the results appearing on screen.

### 2. Where is a failure caught, and what does the user see?

Name the file and function where a failed request is handled. Then describe exactly what appears on the page when it fails.

Failures are caught in `js/app.js` inside the `getFetch()` function. If the server response is not `response.ok`, meaning the request failed, an error is thrown with the status code so we can identify what went wrong. If the response was successful but the returned array length is 0, meaning no game was found with a matching title, the app clears the game container and displays "Can not find game, Try again." If an unexpected error occurs from our end, such as a network failure: it is caught in the `catch` block, which console the error. In all failure cases, the user sees the previous results replaced with a clear text message telling them something went wrong.

### 3. Why there?

Explain why you handled the error in that spot rather than somewhere else in your code. Then say what someone using your app would experience if that error handling were removed.

I added the error handling inside `getFetch()` because it makes the most sense there. `getFetch()` is the single function responsible for making the API call, so wrapping it in a `try/catch` means every failure from that request is caught in one place. If the server response is not `response.ok`, we display the status code so we can identify what went wrong. If the response was successful but nothing is display meaning no game with that title was found, we handle that with an `if` check. And if an undesired error occurs from our end, it flows naturally into the `catch` block. It all flows down nicely in one function. For my second API call in `displayGameDetails()`, I also added a `try/catch` so that if the game details endpoint is not communicating back, the error is caught and logged. If all this error handling were removed, a failed request would result in an unhandled promise rejection and the user would see nothing happen, the old results would stay on screen, and they would have no way of knowing something went wrong.

---

## Additional notes

- The application uses Bootstrap 5 via CDN for base styles and Bootstrap Icons for UI icons. All custom styling is in `css/styles.css`.
- The detail overlay opens when clicking a game card and can be closed by clicking the X button or clicking outside the popup.

## Creative Curiosity Corner (optional)

_If you worked on the Creative Curiosity Corner, say so here. Your code and reflections go in the `creative-curiosity-corner` folder._
