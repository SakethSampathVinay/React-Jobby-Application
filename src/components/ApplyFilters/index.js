import './index.css'

const ApplyFilters = props => {
  const {
    changeTypeofEmployment,
    changeSalaryRange,
    employmentTypesList,
    salaryRangesList,
  } = props

  const onChangeEmploymentType = event => {
    changeTypeofEmployment(event.target.value)
  }

  const onChangeSalaryRange = event => {
    changeSalaryRange(event.target.value)
  }

  return (
    <div className="bg-container">
      <div className="container">
        <hr className="hr-line" />
        <h3 className="employment-heading">Type of Employment</h3>
        <ul className="filter-items-container">
          {employmentTypesList.map(employee => (
            <li key={employee.employmentTypeId}>
              <input
                type="checkbox"
                id={employee.employmentTypeId}
                value={employee.employmentTypeId}
                onChange={onChangeEmploymentType}
              />
              <label
                htmlFor={employee.employmentTypeId}
                className="label-input"
              >
                {employee.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="hr-line" />
        <h3 className="employment-heading">Salary Range</h3>
        <ul className="filter-items-container">
          {salaryRangesList.map(salary => (
            <li key={salary.salaryRangeId}>
              <input
                type="radio"
                id={salary.salaryRangeId}
                name="salary"
                value={salary.salaryRangeId}
                onChange={onChangeSalaryRange}
              />
              <label htmlFor={salary.salaryRangeId} className="label-input">
                {salary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ApplyFilters
