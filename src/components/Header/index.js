import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {TiShoppingCart} from 'react-icons/ti'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/')
  }

  return (
    <div className='header-sm-container'>
      <nav className='nav-bar-container'>
        <Link to='/'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
            alt='website logo'
            className='website-logo-website'
          />
        </Link>

        <ul className='header-navbar-container'>
          <Link to='/'>
            <li className='list-items'>
              {' '}
              <IoMdHome className='icon-image' />{' '}
              <p className='home-lg-heading'>Home</p>
            </li>
          </Link>
          <Link to='/jobs'>
            <li className='list-items'>
              {' '}
              <TiShoppingCart className='icon-image' />{' '}
              <p className='home-lg-heading'>Jobs</p>
            </li>
          </Link>
          <li className='list-items'>
            <button
              type='button'
              onClick={onClickLogOut}
              className='logout-sm-button'
            >
              {' '}
              <FiLogOut />
            </button>
          </li>
        </ul>
        <button
          type='button'
          onClick={onClickLogOut}
          className='logout-lg-button'
        >
          {' '}
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
