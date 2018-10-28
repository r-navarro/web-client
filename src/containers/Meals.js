import React from 'react';
import MealsSearch from './../components/MealsSearch'
import MealsCreate from './../components/MealsCreate'

class Chat extends React.Component {


  render() {
    return (
      <div>
        <MealsSearch />
        <div className="chatroom">
          <MealsCreate />
        </div>
      </div >
    );
  }
}

export default Chat