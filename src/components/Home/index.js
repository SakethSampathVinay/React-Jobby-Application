import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-bg-container">
      <Header />
      <div>
        <h1 className="home-heading">Find the Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary{' '}
          <br className="break" /> information, company reviews. Find the job
          that fits your <br className="break" /> abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
