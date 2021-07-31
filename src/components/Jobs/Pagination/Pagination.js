import { StaticImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import './pagination.css'

function Pagination({ pageContext, formData, formSubmitEvent, setPageContext }) {
  let { currentPage, totalPages, maxPage, minPage } = pageContext

  const pageChange = value => {
    if (value !== currentPage) {
      setPageContext(false)
      formData(formSubmitEvent, value)
    }
  }

  const direction = value => {
    let count = value.target.innerText === 'More' ? 10 : -10

    setPageContext({
      currentPage: currentPage,
      minPage: minPage + count,
      maxPage:
        count === 'More'
          ? maxPage + 10 > totalPages
            ? totalPages
            : maxPage + 10
          : maxPage + count,
      totalPages: totalPages,
    })
  }

  return (
    <>
      <div className="pagination-container">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {minPage > 9 && (
              <li>
                <span
                  aria-hidden="true"
                  onKeyPress={direction}
                  onClick={direction}
                  style={{ cursor: 'pointer' }}
                  tabIndex="0"
                  role="button"
                >
                  Previous
                </span>
              </li>
            )}
            {Array.from({ length: maxPage - minPage }, (_, index) => (
              <li
                key={index + 1 + minPage}
                style={index + 1 + minPage > totalPages ? { display: 'none' } : {}}
              >
                <span
                  tabIndex="0"
                  onClick={() => pageChange(index + 1 + minPage)}
                  onKeyPress={() => pageChange(index + 1 + minPage)}
                  style={
                    index + 1 + minPage === currentPage
                      ? { background: '#eee' }
                      : { cursor: 'pointer' }
                  }
                  role="dialog"
                >
                  {index + 1 + minPage}
                </span>
              </li>
            ))}
            {maxPage <= pageContext.totalPages && pageContext.totalPages > 9 && (
              <li>
                <span
                  aria-hidden="true"
                  onClick={direction}
                  style={{ cursor: 'pointer' }}
                  tabIndex="0"
                  role="button"
                  onKeyPress={direction}
                >
                  More
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

export default Pagination

Pagination.propTypes = {
  currentPage: PropTypes.number,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  totalPages: PropTypes.number,
  pageContext: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  setPageContext: PropTypes.func,
  jobData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  formData: PropTypes.func,
  formSubmitEvent: PropTypes.object,
}
