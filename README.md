XBCAD HelpMe Web App

The XBCAD HelpMe Web App provides a responsive browser-based platform for students, staff, and administrators to manage queries, access analytics, and communicate efficiently in an educational environment. The app is live and can be accessed at the link below.

Features
- Student Features
    Submit Queries: Create and submit queries categorized as:
    "Campus Queries"
    "Student Hub Queries"
    "Alumni Queries"
    Track Queries: Monitor query statuses in real-time.
    Chat Functionality: Communicate with staff directly through in-app chat.
    Attach Media: Upload supporting media files to queries.
    Feedback System: Provide ratings and detailed feedback on services.

- Staff Features
    Manage Queries: View and respond to departmental queries.
    Update Statuses: Change query statuses as they progress.
    Analytics Dashboard: Access detailed statistics on active and completed queries.

- Admin Features
    Comprehensive Analytics: View organization-wide data and generate reports.
    Export Data: Export analytics and query data for further reporting.
    User Management: Manage user roles and settings.


Technology Stack
    Frontend Framework: React.js
    Database: Firebase Realtime Database
    Authentication: Firebase Authentication
    Hosting: Firebase Hosting (Live at https://xbcad-data-b7275.web.app/)


Setup for Local Development

- Clone the Repository:
    git clone https://github.com/your-repo-link/web-app.git

- Install Dependencies:
    cd web-app
    npm install

- Set Up Firebase for Local Development:
    Create a Firebase project in the Firebase Console (if not already created).
    Add a web app to the Firebase project and retrieve the configuration.
    Update src/firebase.js with your Firebase configuration.

- Run Locally:
    npm start
    Access the app at http://localhost:3000.

Usage:
Access the Live App: Visit the deployed app at https://xbcad-data-b7275.web.app/.

Query Management:
- Students can submit, track, and manage queries through the platform.
- Staff can respond to queries and update their statuses.

Chat Functionality:
- Real-time chat is available between students and staff, with media visibility.

Analytics Dashboard:
- Staff and administrators can view active and completed query statistics and export data.

Feedback:
- Students can submit ratings and feedback directly from the app.
