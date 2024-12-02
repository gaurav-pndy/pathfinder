# Pathfinder - AI Trip Planner

Pathfinder is an AI-powered trip planning application designed to create personalized travel itineraries. Built with modern web technologies, it combines artificial intelligence, APIs, and an intuitive interface to provide users with detailed travel plans tailored to their preferences.

## Features

- **AI-Generated Itineraries**:
  - Powered by **Gemini AI** to create customized travel plans based on user inputs.
  - Supports location, duration, budget, and group size for personalized recommendations.

- **Hotel Recommendations**:
  - Integrates APIs to suggest hotels that suit user preferences and travel destinations.

- **Interactive and Responsive Design**:
  - Developed using **React.js** and **Tailwind CSS** for a seamless user experience across devices.

- **Data Management**:
  - Utilizes **Firebase** for storing user data securely and managing real-time updates.

- **User Authentication**:
  - Uses **Google Authentication** for secure user login.
  - Personalized profiles save itineraries, allowing users to access and manage their plans.

## Technologies Used

- **Frontend**:
  - React.js: Component-based framework for building the user interface.
  - Tailwind CSS: Utility-first CSS framework for styling.

- **Backend and AI Integration**:
  - Gemini AI: For generating dynamic and intelligent itineraries.
  - Multiple APIs: For data retrieval, including hotel information and location data.

- **Database**:
  - Firebase: For user data storage, authentication, and real-time updates.
 
- **Authentication**:
  - Google Auth: Simplifies user authentication and links itineraries to user profiles.

## How It Works

1. **Log In with Google**:
   - Sign in using your Google account to create a personalized profile.

2. **Input Your Preferences**:
   - Enter details such as location, trip duration, budget, and group size.

3. **AI-Powered Suggestions**:
   - Gemini AI generates a travel itinerary, suggesting activities, restaurants, and hotels.

4. **Save and Manage**:
   - Save your itinerary securely using Firebase and access it anytime.

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- Firebase credentials for setting up the database.
- API keys for services integrated (e.g., hotel and travel APIs).

### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/gaurav-pndy/pathfinder
   cd pathfinder
   ```
   
2. Install dependencies:
   
   ```bash
   npm install
   ```

3. Set up Firebase:
  - Add Firebase configuration to the project.

4. Start the development server:

   ```bash
   npm start
   ```
