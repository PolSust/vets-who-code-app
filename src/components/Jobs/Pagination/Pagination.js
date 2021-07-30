import { StaticImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import './pagination.css'

function Paginate({ pageContext, formData, formSubmitEvent, setPageContext }) {
  let { currentPage, totalPages, maxPage, minPage } = pageContext
  const pageChange = value => {
    if (value !== currentPage) {
      setPageContext(null)
      formData(formSubmitEvent, value)
    }
  }

  const direction = value => {
    let count = value.target.innerText === 'Next' ? 10 : -10

    setPageContext({
      currentPage: currentPage,
      minPage: minPage + count,
      maxPage:
        count === 'Next'
          ? maxPage + 10 > totalPages
            ? totalPages
            : maxPage + 10
          : maxPage + count,
      totalPages: totalPages,
    })
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
            {minPage > 9 && (
              <li>
                {/* <span aria-hidden="true">&laquo;</span> */}
                <span aria-hidden="true" onClick={direction} style={{ cursor: 'pointer' }}>
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
                  onClick={() => pageChange(index + 1 + minPage)}
                  style={
                    index + 1 + minPage === currentPage
                      ? { background: '#eee' }
                      : { cursor: 'pointer' }
                  }
                >
                  {index + 1 + minPage}
                </span>
              </li>
            ))}
            {maxPage <= pageContext.totalPages && (
              <li>
                {/* <span aria-hidden="true">&raquo;</span> */}
                <span aria-hidden="true" onClick={direction} style={{ cursor: 'pointer' }}>
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
  setPageContext: PropTypes.object,
  jobData: PropTypes.object,
  formData: PropTypes.object,
  formSubmitEvent: PropTypes.object,
}
