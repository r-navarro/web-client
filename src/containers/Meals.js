import React from 'react';
import Meals from './../components/Meals'
import MealsCreate from './../components/MealsCreate'

class Chat extends React.Component {


  render() {
    return (
      <div>
        <Meals />
        <div className="chatroom">
          <MealsCreate />
        </div>
      </div >
    );
  }
}

export default Chat