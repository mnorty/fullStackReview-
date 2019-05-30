import React, {Component} from 'react';
import axios from 'axios';
import {updateUser} from '../redux/userReducer';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount(){
    axios.get('/auth/user').then((res) => {
      console.log('Data from axios',res.data)
      this.props.updateUser(res.data)
      this.props.history.push('/details')
    })
  }

  handleLoginInfoUpdate = (e) => {
    this.setState({
      [e.target.name]:  e.target.value
    })
  }

  render(){
    console.log('this.state',this.state)
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input 
            type="text" 
            name='username' 
            placeholder='username'
            onChange={this.handleLoginInfoUpdate}
          />
          <input 
            type='password'
            name='password'
            placeholder='password'
            onChange={this.handleLoginInfoUpdate}
          />
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(reduxState){
  return reduxState
}

export default connect(mapStateToProps, {updateUser})(Login)