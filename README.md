# Endterm Project (ex midterm)
# Restaurant Website – Endterm Project

## Project Description

This project is a restaurant website developed as a continuation of our Midterm project.

The website provides information about the restaurant, displays its menu, allows users to make reservation requests, and provides contact information.

For the Endterm project, I extended the original website by adding JavaScript and jQuery functionality to make it more interactive and user-friendly.

## Technologies Used

- HTML5 – website structure
- CSS3 – styling and responsive design
- Bootstrap 5 – layout and navigation
- JavaScript – interactive functionality and form validation
- jQuery – interactive effects and event handling

## Website Pages

The website contains five main pages:

1. **Home** – introduces the restaurant and displays its main highlights.
2. **Menu** – displays dishes and allows users to search and filter them.
3. **About Us** – provides information about the restaurant and includes an interactive FAQ section.
4. **Reservations** – allows users to enter reservation details and validates the form.
5. **Contact** – displays contact information and provides a validated contact form.

## JavaScript Functionality

The following features were implemented using JavaScript:

- Dynamic menu rendering from a JavaScript array.
- Search dishes by name, description, category, and ingredients.
- Filter dishes by category.
- Add and remove dishes from favorites.
- Save favorite dishes using localStorage.
- Switch between light and dark themes.
- Save the selected theme using localStorage.
- Validate reservation form fields.
- Validate contact form fields.
- Display success and error messages.
- Dynamically display restaurant highlights.

## jQuery Functionality

jQuery is used to add interactive effects:

- FAQ answers open and close using slideToggle().
- Reservation tips open and close using slideToggle().
- Contact information cards use fadeTo() on mouseenter and mouseleave events.
- Event handlers are registered using on().

## Project Structure

```text
restaurant-website/
│
├── index.html
├── menu.html
├── about.html
├── reservation.html
├── contact.html
├── style.css
├── README.md
│
└── js/
    ├── script.js
    └── jquery-functions.js
```

## How to Run the Project

1. Download or open the project folder.
2. Open the folder in Visual Studio Code or another code editor.
3. Make sure all HTML files, CSS files, and JavaScript files are in the correct locations.
4. Open index.html in a web browser.
5. Navigate through the website using the navigation bar.

An internet connection is required for Bootstrap and jQuery CDN libraries.

## Testing

The following functionality can be tested:

- Navigate between all five website pages.
- Search for dishes on the Menu page.
- Filter dishes by category.
- Add dishes to favorites and remove them.
- Refresh the page and check that favorites are still saved.
- Change the website theme and refresh the page.
- Open and close FAQ answers.
- Open and close reservation tips.
- Submit the reservation form with empty or invalid information.
- Submit the contact form with invalid email or a short message.

## Limitations

The reservation and contact forms currently demonstrate client-side validation only. They do not send information to a backend server or store actual reservations.

## Conclusion

The Endterm project extends the original restaurant website with JavaScript and jQuery features. These improvements make the website more interactive and demonstrate DOM manipulation, event handling, arrays, filtering, localStorage, form validation, and jQuery effects.