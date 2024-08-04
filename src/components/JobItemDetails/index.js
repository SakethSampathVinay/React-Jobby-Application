import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagCheckSharp} from 'react-icons/io5'
import './index.css'

const JobItemDetails = props => {
  const {jobItemDetails, similarJobsDetail} = props
  const {title} = similarJobsDetail[0]
  const {
    id,
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    imageUrl,
    name,
    description,
    lifeCompanyimageUrl,
  } = jobItemDetails

  return (
    <>
      <div className="jobscard-bg-container">
        <div className="jobscard-container">
          <div className="jobscard-heading-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              className="visit-heading"
            >
              Visit
            </a>
          </div>
          <p className="jobscard-location">{jobDescription}</p>
          <h1 className="description-heading">Skills</h1>
          <div className="skills-card-container">
            {jobItemDetails.skills.map(skill => (
              <li key={skill.id} className="skills-list-container">
                <img src={skill.imageUrl} alt={name} className="image-url" />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </div>
          <div className="life-at-company-container">
            <div className="life-at-company-heading-description">
              <h1 className="description-heading">Life at Company</h1>
              <p className="lifeAtCompany-description">
                {jobItemDetails.lifeAtCompany.description}
              </p>
            </div>
            <img
              src={jobItemDetails.lifeAtCompany.lifeCompanyimageUrl}
              alt="company-image"
              className="life-at-company-img"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default JobItemDetails
