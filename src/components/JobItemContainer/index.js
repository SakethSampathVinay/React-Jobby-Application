import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItemDetails from '../JobItemDetails'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemContainer extends Component {
  state = {
    similarJobs: [],
    jobDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = {
          companyLogoUrl: fetchedData.job_details.company_logo_url,
          companyWebsiteUrl: fetchedData.job_details.company_website_url,
          employmentType: fetchedData.job_details.employment_type,
          id: fetchedData.job_details.id,
          jobDescription: fetchedData.job_details.job_description,
          skills: fetchedData.job_details.skills.map(skill => ({
            imageUrl: skill.image_url,
            name: skill.name,
          })),
          lifeAtCompany: {
            description: fetchedData.job_details.life_at_company.description,
            lifeCompanyimageUrl:
              fetchedData.job_details.life_at_company.image_url,
          },
          location: fetchedData.job_details.location,
          packagePerAnnum: fetchedData.job_details.package_per_annum,
          rating: fetchedData.job_details.rating,
        }
        const updatedSimilarJobs = fetchedData.similar_jobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
        }))
        this.setState({
          similarJobs: updatedSimilarJobs,
          jobDetails: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="job-items-container">
        <JobItemDetails
          jobItemDetails={jobDetails}
          similarJobsDetail={similarJobs}
        />
        <SimilarJobs similarJobsDetails={similarJobs} />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => this.getJobItemDetails()

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetailsView()}
      </div>
    )
  }
}

export default JobItemContainer
