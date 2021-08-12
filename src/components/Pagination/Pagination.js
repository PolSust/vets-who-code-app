import PropTypes from 'prop-types'
import { Link } from 'gatsby'

function Pagination({ pageContext, type }) {
  let { currentPage, totalPages, minPage, maxPage, path } = pageContext

  const apiPageChange = value => {
    if (value !== currentPage) pageContext.formData(pageContext.formResponse, value);
  }

  const direction = value => {
    let count = value.target.innerText === 'More' ? 10 : -10
    pageContext.setPageContext({
      currentPage: currentPage,
      totalPages: totalPages,
      minPage: minPage + count,
      maxPage:
        count === 'More'
          ? maxPage + 10 > totalPages
            ? totalPages
            : maxPage + 10
          : maxPage + count,
      setPageContext: pageContext.setPageContext,
      formResponse: pageContext.formResponse,
      formData: pageContext.formData,
    })
  }

  if (type == 'route'){
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
                {currentPage > 1 && (
                  <li>
                    <Link to={`/${path}/${currentPage == 2 ? '' : currentPage - 1}`} rel="prev">
                      {/* <span aria-hidden="true">&laquo;</span> */}
                      <span aria-hidden="true">Previous</span>
                    </Link>
                  </li>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <Link to={`/${path}/${index == 0 ? '' : index + 1}`}>{index + 1}</Link>
                  </li>
                ))}
                {currentPage < totalPages && (
                  <li>
                    <Link to={`/${path}/${currentPage + 1}`} rel="next">
                      {/* <span aria-hidden="true">&raquo;</span> */}
                      <span aria-hidden="true">Next</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

          </div>
        </>
      )
    }
  if (type == 'api'){
    return (
      <>
      <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '0 auto',
        }}>
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
                    onClick={() => apiPageChange(index + 1 + minPage)}
                    onKeyPress={() => apiPageChange(index + 1 + minPage)}
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
              {maxPage <= totalPages && totalPages > 9 && (
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
      </div>
      </>
    )

  }
}

export default Pagination

Pagination.propTypes = {
  pageContext: PropTypes.shape({
    limit: PropTypes.number,
    skip: PropTypes.number,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    contentfulData: PropTypes.object,
    type: PropTypes.string,
    path: PropTypes.string,
  }),
}
