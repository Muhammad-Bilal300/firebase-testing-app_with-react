import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom/chatroom';

class App extends React.Component {
  render() {

    return (
      <div className="container">
        <ChatRoom />
      </div>
    )
  }
}

export default App;
