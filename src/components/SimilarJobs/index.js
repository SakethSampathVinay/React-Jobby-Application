import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagCheckSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsDetails
  return (
    <div>
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <div className="similar-jobs-list-container">
        {similarJobsDetails.map(jobs => (
          <li key={jobs.id}>
            <div className="similar-jobs-bg-container">
              <div className="similar-jobs-container">
                <div className="similar-jobs-heading-container">
                  <img
                    src={jobs.companyLogoUrl}
                    alt="similar job company logo"
                    className="jobscard-company-logo"
                  />
                  <div className="similar-jobs-employment-rating-container">
                    <h1 className="jobscard-employment-type-heading">
                      {jobs.title}
                    </h1>
                    <div className="jobscard-rating-container">
                      <FaStar className="jobscard-star-image" />
                      <p className="jobscard-employment-type-heading">
                        {jobs.rating}
                      </p>
                    </div>
                  </div>
                </div>
                <h1 className="description-heading">Description</h1>
                <p className="jobscard-location">{jobs.jobDescription}</p>
                <div className="location-employment-package-container">
                  <div className="row-container">
                    <div className="loction-container">
                      <IoLocationOutline className="location-image" />
                      <p className="jobscard-location">{jobs.location}</p>
                    </div>
                    <div className="loction-container">
                      <IoBagCheckSharp className="location-image" />
                      <p className="jobscard-location">{jobs.employmentType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default SimilarJobs
