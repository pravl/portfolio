# Portfolio Website

This is a personal portfolio website designed to showcase my projects, blog posts, and provide an easy way for visitors to get in touch. It's built with modern web technologies to ensure a responsive and engaging user experience.

## Features

- **Responsive Design:** Adapts to various screen sizes for optimal viewing on desktops, tablets, and mobile devices.
- **Theme Toggle:** Allows users to switch between light and dark mode for personalized viewing comfort.
- **Navigation Sections:** Includes dedicated sections for:
    - Home: A brief introduction and overview.
    - Blog: A collection of articles and posts.
    - Projects: A showcase of completed and ongoing projects.
    - Contact: A form to send messages directly.
- **Contact Form:** A functional contact form that submits data to a backend service.

## Project Structure

The project is organized into several key directories:

- **`public/`**: Contains static assets that are served directly by the web server, such as `index.html`, `favicon.ico`, and other public resources.
- **`server/`**: Contains the backend code (Node.js/Express) for handling API requests, such as the contact form submission.
- **`src/`**: Contains the main source code for the React application.
    - **`src/assets/`**: Stores static assets like images, fonts, and global stylesheets that are imported into components.
    - **`src/components/`**: Reusable UI components used throughout the application (e.g., Navbar, ThemeToggle).
    - **`src/pages/`**: Top-level components that represent different pages or views of the application (e.g., Home, Blog, Projects, Contact).
    - **`src/context/`**: Holds React Context files for global state management (e.g. ThemeContext).
    - **`src/styles/`**: Contains global and component-specific styles.
    - **`src/utils/`**: Utility functions that can be reused across the application.
    - **`src/main.tsx`**: The main entry point for the React application.
    - **`src/App.tsx`**: The root component of the application, responsible for routing and layout.

## Setup and Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
    (Replace `<repository-url>` with the actual URL and `<repository-name>` with the folder name)

2.  **Install dependencies:**
    This will install both frontend and backend dependencies.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add any necessary environment variables (e.g., for the contact form endpoint or API keys). Refer to `.env.example` if provided.
    For the contact form, you'll need to configure `VITE_API_URL` for the frontend to point to your backend.
    The `server/index.js` might require variables like `EMAIL_USER`, `EMAIL_PASS`, `CLIENT_URL` for Resend/EmailJS.

4.  **Run the development servers:**
    *   **Frontend (Vite):**
        ```bash
        npm run dev
        ```
        This will start the frontend development server, typically at `http://localhost:5173`.
    *   **Backend (Node/Express):**
        Open a new terminal tab/window, navigate to the `server` directory, and run:
        ```bash
        cd server
        npm install # If you haven't already or if there are specific server dependencies
        node index.js # Or your configured start script like `npm run start` if defined in server/package.json
        ```
        The backend server will typically start on a port like `3001` (check `server/index.js` for the exact port).

## Technologies Used

-   **Frontend:**
    -   React: A JavaScript library for building user interfaces.
    -   Vite: A fast build tool and development server.
    -   TypeScript: A typed superset of JavaScript.
    -   React Router: For client-side routing.
-   **Backend:**
    -   Node.js: A JavaScript runtime environment.
    -   Express: A web application framework for Node.js.
    -   (Potentially Resend or EmailJS for email services, check `server/index.js`)
-   **Styling:**
    -   CSS (likely with PostCSS or similar, configured through Vite)
-   **Linting:**
    -   ESLint: For code quality and consistency.

## Deployment

This project can be deployed using services like Render for the backend and GitHub Pages/Netlify/Vercel for the frontend.

**For GitHub Pages (Frontend Only):**

1.  **Build the frontend:**
    ```bash
    npm run build
    ```
2.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```
    This will build the project and deploy the contents of the `dist` folder to the `gh-pages` branch.
    **Note:** Make sure to update the `homepage` field in your `package.json` to reflect your GitHub Pages URL (e.g., `"homepage": "https://your-username.github.io/portfolio/"`).

**For Backend (e.g., Render):**

1.  Ensure your `server/index.js` is configured to use environment variables for sensitive data and port numbers (Render sets the `PORT` environment variable automatically).
2.  Make sure your `package.json` in the root has a `start` script for the server, or Render is configured to run `node server/index.js`. A `Procfile` is present which might be used by services like Heroku or Render (`web: node server/index.js`).
3.  Push your code to a GitHub repository.
4.  Connect your GitHub repository to Render and create a new Web Service.
5.  Configure the build command (e.g., `npm install`) and the start command (e.g., `node server/index.js` or rely on `Procfile`).
6.  Set up environment variables in the Render dashboard.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to:
1. Fork the project.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (if one is present, otherwise assume MIT).
