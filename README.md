# Chat Realtime Client

This is the frontend for a real-time chat application using React and Socket.IO-client.

## Features

- User login with username and room
- Real-time chat with message updates
- Display messages and join/leave notifications
- Simple and responsive UI

## Technologies Used

- React.js
- Socket.IO Client
- (Optional) TailwindCSS or Material-UI for styling

## Getting Started

### Installation

```bash
git clone https://github.com/annguyen115/chat-realtime-client.git
cd chat-realtime-client
npm install
```

### Running the Client

```bash
npm start
```

The client will run on `http://localhost:3000`.

### Configuration

Set the server URL in `.env`:

```
REACT_APP_SERVER_URL=http://localhost:4000
```

## Functionality Overview

1. User enters name and room.
2. Connects to the Socket.IO server.
3. Joins the specified chat room.
4. Sends and receives messages in real-time.

## Possible Improvements

- Authentication
- Display message history
- Typing indicators and notifications
- Emoji and file sharing
- Responsive design enhancements

## License

MIT License
