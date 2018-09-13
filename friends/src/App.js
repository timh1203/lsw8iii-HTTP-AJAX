import React, { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Friends from './components/Friends'
import Friend from './components/Friend'
import FriendForm from './components/FriendForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => this.setState({ friends: response.data }))
      .catch(err => console.log(err))
  }

  addFriend = (newFriend) => {
    axios
      .post('http://localhost:5000/friends', newFriend)
      .then(res => this.setState({ friends: res.data }), window.location.href = '/friends')
      .catch(err => console.log(err))
  }

  render() {
    const {friends} = this.state
    return (
      <div className="App">
        <h1>Axios Friends</h1>
        
        <Navigation />

        <Route exact path='/friends' render={(props) => <Friends friends={friends} />} />
        <Route path='/friends/:id' render={(props) => <Friend {...props} friends={friends} />} />
        <Route path='/add' render={(props) => <FriendForm friends={friends} addFriend={this.addFriend} />} />
      </div>
    )
  }
}

export default App
