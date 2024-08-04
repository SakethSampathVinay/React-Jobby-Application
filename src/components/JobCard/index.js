import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagCheckSharp} from 'react-icons/io5'
import './index.css'

const JobCard = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobsData

  return (
    <div className="jobscard-bg-container">
      <div className="jobscard-container">
        <Link to={`/jobs/${id}`} className="jobscard-link">
          <div className="jobscard-heading-container">
            <img
              src={companyLogoUrl}
              alt= "company logo"
              className="jobscard-company-logo"
            />
            <div className="jobscard-employment-rating-container">
              <h1 className="jobscard-employment-type-heading">{title}</h1>
              <div className="jobscard-rating-container">
                <FaStar className="jobscard-star-image" />
                <p className="jobscard-employment-type-heading">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-package-container">
            <div className="row-container">
              <div className="loction-container">
                <IoLocationOutline className="location-image" />
                <p className="jobscard-location">{location}</p>
              </div>
              <div className="loction-container">
                <IoBagCheckSharp className="location-image" />
                <p className="jobscard-location">{employmentType}</p>
              </div>
            </div>
            <p className="jobscard-package">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h1 className="description-heading">Description</h1>
          <p className="jobscard-location">{jobDescription}</p>
        </Link>
      </div>
    </div>
  )
}

export default JobCard
