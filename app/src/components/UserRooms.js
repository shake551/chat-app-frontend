import React from 'react'
import axios from 'axios'

class UserRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    }
  }
  
  componentDidMount() {
    const header = {
      "Authorization": "jwt " + window.localStorage.getItem('access_token'),
    }

    axios.get('http://0.0.0.0:8000/api/chat/user_rooms/', {headers: header})
      .then(res => {
        console.log(res.data);
        this.setState({
          rooms: res.data.rooms
        });
      })
      .catch(err => {
        // window.location.href = '/login';
        console.log('error')
      })
  }

  render() {
    if (this.state.rooms.length === 0) {
      return (
        <h3>所属しているroomはありません</h3>
      )
    }
    return (
      <h3>
        room一覧
        <ul>
          {this.state.rooms.map((room) => (
            <li key={room.room_id}>{room.room_name}</li>
          ))}
        </ul>
      </h3>
    )
  }
}


export default UserRooms