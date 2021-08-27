import { useState } from 'react'
import Form from '../components/Jobs/Form/Form'
import Card from '../components/Jobs/Card/Card'
import Loader from '../components/Jobs/Loader/Loader'
import Video from '../components/Jobs/Video/Video'
import Pagination from '../components/Pagination/Pagination'
import PageHeader from '../components/PageHeader'
import { StaticImage } from 'gatsby-plugin-image'
import SEO from '../components/SEO'

function Jobs() {
  const [jobData, setJobData] = useState(false)
  const [formSubmitEvent, setFormSubmitEvent] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [pageContext, setPageContext] = useState(false)

  function formData(formResponse, page = 1) {
    setFormSubmitEvent(formResponse)
    setFormSubmitted(true)
    document.getElementById('scroll-to').scrollIntoView({ behavior: 'smooth', block: 'start' })

    let what = 'javascript react gatsby graphql node jquery bootstrap'
    let exclude = '0000 senior sr principal lead master'

    let url = `https://8oi4im0qo3.execute-api.us-east-1.amazonaws.com/dev/jobsearch/${page}?&results_per_page=15&what_or=${what}&where=${
      formResponse.zipCode
    }&distance=${formResponse.distance}&what_exclude=${exclude}&sort_by=date&max_days_old=30${
      formResponse.remote === true ? '&what_and=remote' : ''
    }`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setJobData(data)
        setPageContext({
          currentPage: page,
          minPage: Math.floor(page / 10) * 10,
          maxPage: Math.ceil(page / 10) * 10 - 1,
          totalPages: Math.floor(data.count / 15),
          formResponse: formResponse,
          formData: formData,
          setPageContext: setPageContext,
        })
        console.log(pageContext)
      })
      .then(setJobData(false))
      .catch(console.error)
  }

  return (
    <>
      <SEO title="Job Search" />
      <PageHeader />

      {/* Section Header */}
      <section id="jobs" className="small-top-pad section bg-default" style={{ paddingBottom: 35 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">JOB SEARCH</h1>
              <i>
                <p className="pt-0">
                  #VetsWhoCode provides job placement assistance to veterans and spouses.
                </p>
              </i>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="faq-short-brief container-fluid">
                  <p>
                    Vets Who Code Job Search (VWC) is a tool for connecting veterans, military, and
                    military spouses with jobs. Our goal is to make every workplace fair and
                    profitable by bringing together the perfect candidate with the ideal employer.
                    Our site pairs technology and best practices in order to promote practical and
                    gainful employment.
                  </p>
                </div>
              </div>
            </div>
            {/*  End Header  */}

            {/*  Search Bar  */}
            <div id="scroll-to" className="scroll-to"></div>
            <div className="search">
              <div>
                <Form formData={formData} />
              </div>
            </div>
            {/*  Search End  */}

            {/*  No Results  */}
            <div className="no-results" style={{ marginTop: 75 }}>
              <p
                className={`text-center ${
                  formSubmitted && jobData && jobData.results.length === 0 ? '' : 'hidden'
                }`}
              >
                Sorry there were no results. Try again.
              </p>
            </div>
            {/* End No Results */}

            {/* Loader */}
            <Loader isSubmitted={formSubmitted} jobData={jobData} />
            {/* End Loader */}

            {/* Video */}
            <div className="container">
              <div className="col-md-12">
                <Video isSubmitted={formSubmitted} />
              </div>
            </div>
          </div>
          {/*  End Video  */}

          {/*  Cards */}
          <div className="jobgrid-container">
            {jobData &&
              jobData.results.map((job, i) => (
                <Card isSubmitted={formSubmitted} jobData={job} key={`job data card-${i}`} />
              ))}
          </div>
        </div>
      </section>
      {/* End Cards */}

      {/* Pagination */}
      <div className="container">
        <div className="row">
          {pageContext && <Pagination pageContext={pageContext} type={'api'} />}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <div className="adzuna">
            Powered By{' '}
            <a href="https://www.adzuna.com/" target="_blank" rel="noopener noreferrer">
              Adzuna{' '}
            </a>
            <StaticImage
              width={12}
              height={12}
              className="adzuna-logo"
              src="../images/adzuna.png"
              alt="Adzuna Logo"
            />
          </div>
        </div>
      </div>
      {/* End Pagination */}
    </>
  )
}

export default Jobs
