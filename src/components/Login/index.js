import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="username-card-container">
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={this.onChangeUsername}
          className="username-input"
          autoComplete="off"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="username-card-container">
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
          className="username-input"
          autoComplete="off"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-image"
          />
          <form className="form-card-container" onSubmit={this.onSubmitButton}>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>

            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
