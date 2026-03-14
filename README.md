#  Real-Time Chat Application

A full-stack real-time chat application that enables users to send and receive messages instantly using WebSockets. The application provides a responsive chat interface and stores messages in a database for persistence.

## Features

- Real-time messaging using Socket.io
- Instant message updates without page refresh
- Message timestamp display
- Backend API using Node.js and Express
- MongoDB database for storing chat messages
- Responsive user interface built with React
- Axios integration for API communication

## Tech Stack

Frontend:
- React.js
- Axios
- CSS / Tailwind (if used)

Backend:
- Node.js
- Express.js
- Socket.io

Database:
- MongoDB

Tools:
- Vite
- Git & GitHub

##  Project Structure


real-time-chat-app
│
├── client
│ ├── src
│ │ ├── components
│ │ │ └── Chat.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│
├── server
│ ├── models
│ │ └── Message.js
│ ├── routes
│ └── server.js
│
└── README.md


##  Installation

### 1️. Clone the Repository


git clone https://github.com/yourusername/real-time-chat-app.git


### 2️. Install Backend Dependencies


cd server
npm install


### 3️. Install Frontend Dependencies


cd client
npm install


### 4️.Start Backend Server


cd server
npm start


### 5️. Start Frontend


cd client
npm run dev


## Application Workflow

1. User enters a message in the chat interface
2. React frontend sends message to backend API
3. Server broadcasts message using Socket.io
4. All connected clients receive the message instantly
5. Message is stored in MongoDB database



##  Future Improvements

- User authentication
- Private chat rooms
- Message notifications
- File sharing
- Emoji support

##  Author

Rohith Aluri

Final Year B.Tech Student  
Interested in Full Stack Development & Cybersecurity

##  License

This project is open source and available under the MIT License.
