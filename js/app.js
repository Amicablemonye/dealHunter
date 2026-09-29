/**
 * Your JavaScript for Assignment 1 goes here.
 */

/* Header/Nav */
const homeBtn = document.getElementById("home-btn");
const profileBtn = document.getElementById("profile-btn");
const searchInput = document.getElementById("search-input");
const searchbtn = document.getElementById("search-btn");
const activityList = document.getElementById("profile-activity-list");

// UI Elements for container
const gameContainer = document.getElementById("game-container");
const homePage = document.getElementById("page1");
const profilePage = document.getElementById("page2");

/* Fetch function for API */
async function getFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed. Server status: ${response.status}`);
    }

    const data = await response.json();
    const games = getGameData(data);

    if (games.length === 0) {
      gameContainer.replaceChildren();
      gameContainer.textContent = "Can not find game, Try again";
      return;
    }

    displayGames(games);
  } catch (error) {
    console.error(
      "Sorry we Can not process your request right now, Please Try again later. Error:",
      error,
    );
  }
}

function getGameData(data) {
  return data.map((game) => ({
    gameID: game.gameID,
    title: game.title,
    salePrice: game.salePrice,
    normalPrice: game.normalPrice,
    savings: game.savings,
    dealRating: game.dealRating,
    thumb: game.thumb,
  }));
}

function displayGames(games) {
  gameContainer.replaceChildren();

  games.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("deal-card");
    gameCard.dataset.gameId = game.gameID;

    const thumb = document.createElement("img");
    thumb.classList.add("deal-thumb");
    thumb.src = game.thumb;
    thumb.alt = `${game.title} thumbnail`;

    const header = document.createElement("div");
    header.classList.add("deal-header");

    const savings = document.createElement("span");
    // Calcate the percent savings
    const sale = parseFloat(game.salePrice);
    const normal = parseFloat(game.normalPrice);

    const calculatedSavings = ((1 - sale / normal) * 100).toFixed(0);

    savings.classList.add("deal-savings");
    savings.textContent = `${calculatedSavings}%`;

    header.appendChild(savings);

    const favBtn = document.createElement("button");
    favBtn.classList.add("fav-btn");
    const favIcon = document.createElement("i");
    favIcon.classList.add("bi", "bi-heart");
    favBtn.appendChild(favIcon);

    header.appendChild(favBtn);

    const title = document.createElement("h3");
    title.classList.add("deal-title");
    title.textContent = game.title;

    const pricing = document.createElement("div");
    pricing.classList.add("deal-pricing");

    const normalPrice = document.createElement("span");
    normalPrice.classList.add("deal-original");
    normalPrice.textContent = `$${game.normalPrice}`;

    pricing.appendChild(normalPrice);

    const salePrice = document.createElement("span");
    salePrice.classList.add("deal-sale");
    salePrice.textContent = `$${game.salePrice}`;

    pricing.appendChild(salePrice);

    const dealRating = document.createElement("div");
    dealRating.classList.add("deal-rating");
    dealRating.textContent = `Rating: ${game.dealRating}`;

    gameCard.appendChild(thumb);
    gameCard.appendChild(header);
    gameCard.appendChild(title);
    gameCard.appendChild(pricing);
    gameCard.appendChild(dealRating);

    gameContainer.appendChild(gameCard);
  });
}

/* Simple UI functions */
const detailsOverlay = document.getElementById("details-overlay");

function closeOverlay() {
  detailsOverlay.classList.add("hidden");
  detailsOverlay.replaceChildren();
}

detailsOverlay.addEventListener("click", (e) => {
  if (e.target === detailsOverlay) {
    closeOverlay();
  }
});

async function displayGameDetails(gameId) {
  try {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${gameId}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed. Server status: ${response.status}`);
    }

    detailsOverlay.replaceChildren();

    const detailsCard = document.createElement("div");
    detailsCard.classList.add("preview-popover");

    const headerRow = document.createElement("div");
    headerRow.classList.add("preview-header");

    const title = document.createElement("h3");
    title.classList.add("preview-title");
    title.textContent = data.info.title;
    headerRow.appendChild(title);

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("preview-close");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", closeOverlay);
    headerRow.appendChild(closeBtn);

    detailsCard.appendChild(headerRow);

    const cheapestPrice = document.createElement("div");
    cheapestPrice.classList.add("preview-status-row");

    const previewLabel = document.createElement("span");
    previewLabel.classList.add("preview-label");
    previewLabel.textContent = "Historical Low:";
    cheapestPrice.appendChild(previewLabel);

    const value = document.createElement("span");
    value.classList.add("preview-value");
    value.textContent = `$${data.cheapestPriceEver.price}`;
    cheapestPrice.appendChild(value);

    detailsCard.appendChild(cheapestPrice);

    const dealList = document.createElement("div");
    dealList.classList.add("preview-deals-list");

    data.deals.forEach((deal) => {
      const row = document.createElement("div");
      row.classList.add("preview-deal-row");

      const priceLabel = document.createElement("span");
      priceLabel.classList.add("preview-label");
      priceLabel.textContent = "Price:";
      row.appendChild(priceLabel);

      const priceValue = document.createElement("span");
      priceValue.classList.add("preview-value");
      priceValue.textContent = `$${deal.price}`;
      row.appendChild(priceValue);

      const retailLabel = document.createElement("span");
      retailLabel.classList.add("preview-label");
      retailLabel.textContent = "Retail:";
      row.appendChild(retailLabel);

      const retailPrice = document.createElement("span");
      retailPrice.classList.add("preview-value");
      retailPrice.textContent = `$${deal.retailPrice}`;
      row.appendChild(retailPrice);

      const savingLabel = document.createElement("span");
      savingLabel.classList.add("preview-label");
      savingLabel.textContent = "Saving:";
      row.appendChild(savingLabel);

      const savingPrice = document.createElement("span");
      savingPrice.classList.add("preview-value");
      const savingPercent = parseFloat(deal.savings).toFixed(0);
      savingPrice.textContent = `${savingPercent}%`;
      row.appendChild(savingPrice);

      dealList.appendChild(row);
    });

    detailsCard.appendChild(dealList);

    detailsOverlay.appendChild(detailsCard);
    detailsOverlay.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching or displaying game details:", error);
  }
}

function updateTabs(event) {
  const activeItem = document.querySelector(".nav-link.active");
  if (activeItem) {
    activeItem.classList.remove("active");
  }
  event.target.classList.add("active");
}

function switchTabs(pageToShow, pageToHide) {
  pageToHide.classList.add("hidden");
  pageToShow.classList.remove("hidden");
}

function saveToFavorite(btn, gameID) {
  btn.classList.toggle("favourite");
  const existing = activityList.querySelector(`.saved-${gameID}`);

  if (existing) {
    existing.remove();
  } else {
    const card = btn.closest(".deal-card");

    if (card) {
      const cardClone = card.cloneNode(true);

      const item = document.createElement("li");
      item.classList.add(`saved-${gameID}`);

      item.appendChild(cardClone);
      activityList.appendChild(item);
    }
  }
}

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  const url = `https://www.cheapshark.com/api/1.0/deals?title=${searchTerm}`;

  getFetch(url);
});

homeBtn.addEventListener("click", (e) => {
  updateTabs(e);
  switchTabs(homePage, profilePage);
});

profileBtn.addEventListener("click", (e) => {
  updateTabs(e);
  switchTabs(profilePage, homePage);
});

gameContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".fav-btn");
  const gameCard = e.target.closest(".deal-card");

  if (!gameCard) {
    return;
  } else if (btn) {
    saveToFavorite(btn, gameCard.dataset.gameId);
  } else {
    displayGameDetails(gameCard.dataset.gameId);
  }
});
