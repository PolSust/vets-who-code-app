import { useState } from 'react'
import Form from '../components/Jobs/Form/Form'
import Card from '../components/Jobs/Card/Card'
import Loader from '../components/Jobs/Loader/Loader'
import Video from '../components/Jobs/Video/Video'
import Paginate from '../components/Jobs/Pagination/Pagination'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import '../components/Jobs/Form/form.css'

function Jobs() {
  const [jobData, setJobData] = useState(false)
  const [formSubmitEvent, setFormSubmitEvent] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [pageContext, setPageContext] = useState(false)

  function formData(formSubmitEvent, page = 1) {
    formSubmitEvent.preventDefault()
    setFormSubmitEvent(formSubmitEvent)
    setFormSubmitted(true)
    document.getElementById('scroll-to').scrollIntoView()

    const formResponse = {
      zipCode: formSubmitEvent.target[0].value,
      remote: formSubmitEvent.target[1].checked,
      distance: formSubmitEvent.target[2].value,
    }

    let what = 'javascript react gatsby graphql node jquery bootstrap'
    let exclude = '0000 senior sr principal lead master'

    let url = `https://test-vwc-job-app.netlify.app/.netlify/functions/jobs/${page}?&results_per_page=15&what_or=${what}&where=${
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
          maxPage:
            Math.ceil(page / 10) * 10 > Math.floor(data.count / 15)
              ? Math.floor(data.count / 15)
              : Math.ceil(page / 10) * 10 - 1,
          totalPages: Math.floor(data.count / 15),
        })
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
              <p>
                <i>
                  <p className="pt-0">
                    #VetsWhoCode provides job placement assistance to veterans and spouses.
                  </p>
                </i>
              </p>
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
            <div
              className="search"
              style={{
                background: 'var(--surface-2)',
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius: 10,
                boxShadow: '0 0 8px 0 var(--element-12)',
                marginRight: 15,
                marginLeft: 15,
                paddingLeft: 20,
                paddingRight: 20,
                border: '1px solid var(--element-12)',
              }}
            >
              <div>
                <Form data={formData} />
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
          {pageContext && (
            <Paginate
              jobData={jobData}
              formData={formData}
              formSubmitEvent={formSubmitEvent}
              pageContext={pageContext}
              setPageContext={setPageContext}
            />
          )}
        </div>
      </div>
      {/* End Pagination */}
    </>
  )
}

export default Jobs
