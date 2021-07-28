import { StaticImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import './pagination.css'

function Paginate({ pageContext, formData, formSubmitEvent, getGrid }) {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const pageChange = value => {
    // formData(formSubmitEvent, value)
    // getGrid.current.container.current.scrollTop = 0
    console.log(value)
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
                <a href="#">
                  {/* <span aria-hidden="true">&laquo;</span> */}
                  <span aria-hidden="true">Previous</span>
                </a>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a href="#">{index + 1}</a>
                {/* <Link to={`/blog/${index === 0 ? '' : index + 1}`}>{index + 1}</Link> */}
              </li>
            ))}
            {!isLastPage && (
              <li onClick={pageChange(currentPage + 1)}>
                {/* <span aria-hidden="true">&raquo;</span> */}
                <span aria-hidden="true">Next</span>
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

// function Paginate({ jobData, formData, clickEvent, getGrid }) {
// const pageChange = (event, value) => {
//   formData(clickEvent, value)
//   getGrid.current.container.current.scrollTop = 0
//   }

//   const useStyles = makeStyles({
//     root: {
//       '& *': {
//         color: 'var(--element-3)',
//       },
//       '& ul > li button:not(.Mui-selected):hover': {
//         backgroundColor: 'var(--element-12)',
//       },
//     },
//   })

//   const classes = useStyles()

//   return (
//     <div className={`pagination-wrapper ${jobData ? '' : 'hidden'}`}>
//       <div className={classes.root}>
//         <Pagination
//           count={Math.floor(jobData.count / 15)}
//           showFirstButton
//           showLastButton
//           color="primary"
//           onChange={pageChange}
//           className="inner-pagination"
//         />
//         <div className="adzuna">
//           Powered By{' '}
//           <a href="https://www.adzuna.com/" target="_blank" rel="noopener noreferrer">
//             Adzuna{' '}
//           </a>
//           <StaticImage
//             width={12}
//             height={12}
//             className="adzuna-logo"
//             src="../../../images/adzuna.png"
//             alt="Adzuna Logo"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Paginate

// Paginate.propTypes = {
//   jobData: PropTypes.bool,
//   formData: PropTypes.bool,
//   clickEvent: PropTypes.object,
//   getGrid: PropTypes.string,
//   theme: PropTypes.string,
// }
