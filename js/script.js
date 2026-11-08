const menuItems = [
    { id: 1, name: "Bruschetta", category: "Appetizers", description: "Toasted bread with tomatoes, basil, and olive oil.", price: 8, tags: ["tomato", "vegetarian"] },
    { id: 2, name: "Creamy Mushroom Soup", category: "Appetizers", description: "A warm soup made with mushrooms and fresh herbs.", price: 9, tags: ["mushroom", "vegetarian"] },
    { id: 3, name: "Grilled Chicken", category: "Main Dishes", description: "Juicy grilled chicken served with seasonal vegetables.", price: 18, tags: ["chicken", "grill"] },
    { id: 4, name: "Beef Steak", category: "Main Dishes", description: "Tender beef steak with a house-made sauce.", price: 24, tags: ["beef", "grill"] },
    { id: 5, name: "Pasta Alfredo", category: "Main Dishes", description: "Creamy pasta with parmesan and herbs.", price: 16, tags: ["pasta", "vegetarian"] },
    { id: 6, name: "Chocolate Cake", category: "Desserts", description: "Rich chocolate cake served with a light cream.", price: 7, tags: ["chocolate", "sweet"] },
    { id: 7, name: "Cheesecake", category: "Desserts", description: "Classic cheesecake with a berry topping.", price: 8, tags: ["berry", "sweet"] },
    { id: 8, name: "Fresh Lemonade", category: "Drinks", description: "Fresh lemon juice, mint, and sparkling water.", price: 5, tags: ["lemon", "cold"] }
];

const restaurantHighlights = [
    { title: "Fresh ingredients", description: "We prepare our dishes with carefully selected ingredients." },
    { title: "Warm atmosphere", description: "Enjoy a comfortable place for family and friends." },
    { title: "Made with care", description: "Our team pays attention to every detail." }
];

function getSavedFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem("restaurantFavorites") || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

let favoriteIds = getSavedFavorites();

function saveFavorites() {
    localStorage.setItem("restaurantFavorites", JSON.stringify(favoriteIds));
}

function createMenuCard(item, isFavorite) {
    const card = document.createElement("article");
    card.className = "menu-card";
    card.dataset.itemId = item.id;

    const title = document.createElement("h3");
    title.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.description;

    const category = document.createElement("small");
    category.className = "dish-category";
    category.textContent = item.category;

    const price = document.createElement("span");
    price.className = "dish-price";
    price.textContent = `$${item.price}`;

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.className = `favorite-button${isFavorite ? " is-favorite" : ""}`;
    favoriteButton.dataset.favoriteId = item.id;
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.setAttribute("aria-label", `${isFavorite ? "Remove" : "Add"} ${item.name} ${isFavorite ? "from" : "to"} favorites`);
    favoriteButton.textContent = isFavorite ? "♥ Saved" : "♡ Favorite";

    card.append(title, description, category, price, favoriteButton);
    return card;
}

function renderMenu(items, container) {
    if (!container) return;
    container.replaceChildren();

    for (const item of items) {
        container.appendChild(createMenuCard(item, favoriteIds.includes(item.id)));
    }
}

function filterMenu(items, searchText, category) {
    const normalizedSearch = searchText.trim().toLowerCase();

    return items.filter((item) => {
        const searchableText = `${item.name} ${item.description} ${item.category} ${item.tags.join(" ")}`.toLowerCase();
        const matchesSearch = searchableText.includes(normalizedSearch);
        const matchesCategory = category === "all" || item.category === category;
        return matchesSearch && matchesCategory;
    });
}

function updateFavoriteCount() {
    const countElement = document.getElementById("favoriteCount");
    if (countElement) countElement.textContent = `(${favoriteIds.length})`;
}

function refreshMenu() {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;

    const search = document.getElementById("menuSearch");
    const category = document.getElementById("categoryFilter");
    const resultCount = document.getElementById("menuResultCount");
    const noResults = document.getElementById("noMenuResults");
    const favoriteGrid = document.getElementById("favoritesGrid");
    const emptyFavorites = document.getElementById("emptyFavorites");

    const filteredItems = filterMenu(menuItems, search.value, category.value);
    renderMenu(filteredItems, grid);

    resultCount.textContent = `${filteredItems.length} dish${filteredItems.length === 1 ? "" : "es"} found`;
    noResults.hidden = filteredItems.length !== 0;

    const favoriteItems = menuItems.filter((item) => favoriteIds.includes(item.id));
    renderMenu(favoriteItems, favoriteGrid);
    emptyFavorites.hidden = favoriteItems.length !== 0;
    updateFavoriteCount();
}

function toggleFavorite(itemId) {
    if (favoriteIds.includes(itemId)) {
        favoriteIds = favoriteIds.filter((id) => id !== itemId);
    } else {
        favoriteIds.push(itemId);
    }

    saveFavorites();
    refreshMenu();
}

function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    const button = document.getElementById("themeToggle");

    if (button) {
        button.innerHTML = isDark
            ? '<span aria-hidden="true">☀</span> Light mode'
            : '<span aria-hidden="true">☾</span> Dark mode';

        button.setAttribute("aria-pressed", String(isDark));
    }

    localStorage.setItem("restaurantTheme", isDark ? "dark" : "light");
}

function validateReservationField(field) {
    const value = field.value.trim();
    let message = "";

    if (field.id === "name" && value.length < 2) {
        message = "Please enter a name with at least 2 characters.";
    } else if (field.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "Please enter a valid email address.";
    } else if (field.id === "date") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(`${value}T00:00:00`);

        if (!value || selectedDate < today) {
            message = "Please choose today or a future date.";
        }
    } else if (field.id === "time" && !value) {
        message = "Please choose a reservation time.";
    } else if (field.id === "guests") {
        const guests = Number(value);

        if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
            message = "The number of guests must be between 1 and 20.";
        }
    }

    const errorElement = document.getElementById(`${field.id}Error}`);

    if (errorElement) {
        errorElement.textContent = message;
    }

    field.classList.toggle("input-invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));

    return message === "";
}

function initializeReservationForm() {
    const form = document.getElementById("reservationForm");
    if (!form) return;

    const dateInput = document.getElementById("date");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

    dateInput.min = localToday;

    const fields = ["name", "email", "date", "time", "guests"]
        .map((id) => document.getElementById(id));

    for (const field of fields) {
        field.addEventListener("input", () => validateReservationField(field));
        field.addEventListener("change", () => validateReservationField(field));
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const allValid = fields.map(validateReservationField).every(Boolean);
        const message = document.getElementById("reservationMessage");

        if (!allValid) {
            message.className = "form-message error-message";
            message.textContent = "Please correct the highlighted fields before submitting.";
            return;
        }

        const guestName = document.getElementById("name").value.trim();

        message.className = "form-message success-message";
        message.textContent = `Thank you, ${guestName}! Your reservation request has been recorded in this demo.`;

        form.reset();

        fields.forEach((field) => {
            field.classList.remove("input-invalid");
            field.setAttribute("aria-invalid", "false");
            document.getElementById(`${field.id}Error`).textContent = "";
        });
    });
}

function initializeContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contact-name");
        const email = document.getElementById("contact-email");
        const message = document.getElementById("contact-message");

        const emailError = document.getElementById("contactEmailError");
        const messageError = document.getElementById("contactMessageError");

        let valid = true;

        emailError.textContent = "";
        messageError.textContent = "";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        if (message.value.trim().length < 10) {
            messageError.textContent = "Please enter a message with at least 10 characters.";
            valid = false;
        }

        const status = document.getElementById("contactMessageStatus");

        if (!valid) {
            status.className = "form-message error-message";
            status.textContent = "Please check the highlighted fields.";
            return;
        }

        status.className = "form-message success-message";
        status.textContent = `Thank you, ${name.value.trim()}! Your message is ready (demo only).`;

        form.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.getElementById("themeToggle");

    setTheme(localStorage.getItem("restaurantTheme") === "dark");

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            setTheme(!document.body.classList.contains("dark-theme"));
        });
    }

    const menuGrid = document.getElementById("menuGrid");

    if (menuGrid) {
        refreshMenu();

        document.getElementById("menuSearch").addEventListener("input", refreshMenu);
        document.getElementById("categoryFilter").addEventListener("change", refreshMenu);

        document.getElementById("showFavorites").addEventListener("click", () => {
            document.getElementById("favoritesSection")
                .scrollIntoView({ behavior: "smooth" });
        });

        document.getElementById("showAllDishes").addEventListener("click", () => {
            document.getElementById("menuSearch").value = "";
            document.getElementById("categoryFilter").value = "all";
            refreshMenu();
        });

        menuGrid.addEventListener("click", (event) => {
            const button = event.target.closest("[data-favorite-id]");

            if (button) {
                toggleFavorite(Number(button.dataset.favoriteId));
            }
        });

        document.getElementById("favoritesGrid").addEventListener("click", (event) => {
            const button = event.target.closest("[data-favorite-id]");

            if (button) {
                toggleFavorite(Number(button.dataset.favoriteId));
            }
        });
    }

    initializeReservationForm();
    initializeContactForm();

    const highlightContainer = document.getElementById("restaurantHighlights");

    if (highlightContainer) {
        restaurantHighlights.forEach((highlight) => {
            const item = document.createElement("article");
            item.className = "highlight-card";

            const heading = document.createElement("h2");
            heading.textContent = highlight.title;

            const paragraph = document.createElement("p");
            paragraph.textContent = highlight.description;

            item.append(heading, paragraph);
            highlightContainer.appendChild(item);
        });
    }
});