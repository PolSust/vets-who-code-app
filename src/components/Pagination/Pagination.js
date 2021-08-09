import PropTypes from 'prop-types'
import { Link } from 'gatsby'

function Pagination({ pageContext }) {
  let { currentPage, totalPages} = pageContext

console.log(pageContext)
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
                <Link to={`/blog/${currentPage + 1}`} rel="prev">
                  {/* <span aria-hidden="true">&laquo;</span> */}
                  <span aria-hidden="true">Previous</span>
                </Link>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <Link to={`/blog/${index == 0 ? '' : index + 1}`}>{index + 1}</Link>
              </li>
            ))}
            {currentPage < totalPages && (
              <li>
                <Link to={`/blog/${currentPage + 1}`} rel="next">
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
  }),
}