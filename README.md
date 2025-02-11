# BookQuest  📚🤓

Welcome to BookQuest, your personal book tracker and favorites list manager. BookQuest allows users to add books to their favorites collection, customize settings, and switch themes for a personalized experience. Users can sign up, log in, and manage their preferences securely.

## Features

- Sign-up and login system: Users can sign up and log in securely to manage their account.

- Add books to your favorites list: Keep track of the books you love or are interested in.

- Theme Customization: Switch between light and dark themes to fit your style.

- User Settings: Customize your preferences, including username and theme.

- Quick Search: Easily find books using the Open Library API.

- User-friendly interface: A clean, intuitive design to manage your favorite books.


## Tech Stack

- Frontend: React, TypeScript

- Backend: Open Library API (for fetching book data)

- Authentication: Firebase (for user sign-up, login, and authorization)

- State Management: React Hooks & Context Api

- Build Tool: Vite

- Styling: CSS (custom design)


## Installation (For Developers)

To get started with BookQuest, follow these steps to run the app locally:

1. Clone the repository:

```bash
 git clone https://github.com/Charmingdc/BookQuest.git
```


2. Navigate into the project directory:

``` bash
cd BookQuest
```

3. Install the required dependencies:

``` bash
npm install
```

4. Set up Firebase:

Go to Firebase Console and create a new project.

- Enable Firebase Authentication (email/password, Google, etc.).

- Set up Firestore (optional for user settings).

- Add your Firebase config to your app’s environment variables or directly into the firebase.ts file.


5. Run the app:

``` bash
npm run dev
```


Your app should now be running on `http://localhost:5173.`

## Usage (For Developers)

After setting up and running the app locally:

1. Sign up or log in to create and access your account securely.


2. Search for books using the Open Library API.


3. Add books to your favorites list.


4. Change themes between light and dark modes from the settings.


5. Update your user settings (username, theme preferences).



## Contributing

Contributions are always welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.


2. Create a new branch (git checkout -b feature-name).


3. Make your changes and commit them (git commit -m 'Add feature').


4. Push the branch to your fork (git push origin feature-name).


5. Open a pull request to the main repository.



## License

This project is licensed under the GNUP License - see the LICENSE file for details.
