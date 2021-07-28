import { StaticImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import './pagination.css'

function Paginate({ pageContext, formData, formSubmitEvent, getGrid }) {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const pageChange = value => {
    formData(formSubmitEvent, value)
    // getGrid.current.container.current.scrollTop = 0
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {!isFirstPage && (
              <li>
                {/* <span aria-hidden="true">&laquo;</span> */}
                <span
                  aria-hidden="true"
                  onClick={() => pageChange(currentPage - 1)}
                  style={{ cursor: 'pointer' }}
                >
                  Previous
                </span>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <span onClick={() => pageChange(index + 1)} style={{ cursor: 'pointer' }}>
                  {index + 1}
                </span>
              </li>
            ))}
            {!isLastPage && (
              <li>
                {/* <span aria-hidden="true">&raquo;</span> */}
                <span
                  aria-hidden="true"
                  onClick={() => pageChange(currentPage + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  Next
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="adzuna">
        Powered By{' '}
        <a href="https://www.adzuna.com/" target="_blank" rel="noopener noreferrer">
          Adzuna{' '}
        </a>
        <StaticImage
          width={12}
          height={12}
          className="adzuna-logo"
          src="../../../images/adzuna.png"
          alt="Adzuna Logo"
        />
      </div>
    </>
  )
}

export default Paginate

Paginate.propTypes = {
  currentPage: PropTypes.number,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  totalPages: PropTypes.number,
  pageContext: PropTypes.object,
  jobData: PropTypes.object,
  formData: PropTypes.object,
  formSubmitEvent: PropTypes.object,
  getGrid: PropTypes.string,
}
