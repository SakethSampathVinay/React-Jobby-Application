import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import ApplyFilters from '../ApplyFilters'
import Header from '../Header'
import Profile from '../Profile'
import SearchContainer from '../SearchContainer'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    productsList: [],
    searchInput: '',
    typeOfEmployment: '',
    salaryRange: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {typeOfEmployment, salaryRange, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput}, this.getJobsList)
  }

  changeTypeofEmployment = typeOfEmployment => {
    this.setState({typeOfEmployment}, this.getJobsList)
  }

  changeSalaryRange = salaryRange => {
    this.setState({salaryRange}, this.getJobsList)
  }

  renderJobCard = () => {
    const {productsList} = this.state
    if (productsList.length === 0) {
      return (
        <div className="jobs-card-container">
          <div className="container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-image"
            />
            <h1 className="no-jobs-found-heading">No Jobs Found</h1>
            <p className="no-jobs-found-heading">
              We could not find any jobs. Try other filters
            </p>
          </div>
        </div>
      )
    }
    return (
      <ul>
        {productsList.map(job => (
          <JobCard jobsData={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryButton = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.retryButton}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="lg-devices-container">
            <div className="searchinput-jobs-container">
              <SearchContainer onChangeSearchInput={this.changeSearchInput} />
            </div>
            <Profile />
            <ApplyFilters
              changeTypeofEmployment={this.changeTypeofEmployment}
              changeSalaryRange={this.changeSalaryRange}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
            />
          </div>
          <div className="lg-devices-jobs-container">
            <div className="searchinput-jobs-lg-container">
              <SearchContainer onChangeSearchInput={this.changeSearchInput} />
            </div>
            {apiStatus === apiStatusConstants.success && this.renderJobCard()}
            {apiStatus === apiStatusConstants.failure &&
              this.renderFailureView()}
            {apiStatus === apiStatusConstants.inProgress && this.renderLoader()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
