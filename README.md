Event Frontend
Welcome to the Event Frontend project! This is a Next.js frontend application that allows users to log in, view a list of events, and book themselves into an event as a logged-in user. The project utilizes Clerk for authentication and Firebase Firestore for the database. Please ensure that the backend server is running before starting up the frontend.

Getting Started
To get started with the project, follow these steps:

Clone the Repository: Clone this repository to your local machine using the following command:

git clone https://github.com/your-username/event-frontend.git
Install Dependencies: Navigate into the project directory and install the required dependencies using npm:

Environment Variables
The project relies on environment variables for configuration. Ensure that you have a .env.local file in the root of your project with the following variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up


Replace the values with your actual keys obtained from the respective services.


These variables are used to connect to the Clerk authentication service provided by the backend project.

Start the Frontend: Start the frontend server using the following command:

npm run dev
This will start the Next.js development server.

Start the Backend: Make sure to start the backend server before accessing the frontend. Refer to the backend project documentation for instructions on starting the server.

Access the Application: Once both the frontend and backend servers are running, access the application in your web browser at http://localhost:3000.

Technologies Used
Next.js: A React framework for building server-side rendered and statically generated web applications.
Clerk: A user authentication and management service.
Firebase Firestore: A NoSQL cloud database provided by Firebase.
React: A JavaScript library for building user interfaces.
npm: A package manager for JavaScript.
