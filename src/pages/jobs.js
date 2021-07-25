import { useState, useRef } from 'react'
import Form from '../components/Jobs/Form/Form'
import Card from '../components/Jobs/Card/Card'
import Loader from '../components/Jobs/Loader/Loader'
import Video from '../components/Jobs/Video/Video'
import Paginate from '../components/Jobs/Pagination/Pagination'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'

function Jobs() {
  const [jobData, setJobData] = useState(false)
  const [clickEvent, setClickEvent] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const getGrid = useRef(null)

  function formData(event, page = 1) {
    event.preventDefault()
    setClickEvent(event)
    setFormSubmitted(true)
    document.getElementById('middle').scrollIntoView()

    const formResponse = {
      zipCode: event.target[0].value,
      remote: event.target[1].checked,
      distance: event.target[2].value,
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
      .then(setJobData)
      .catch(console.error)
      .then(setJobData(false))
  }

  return (
    <>
      <SEO title="Job Search" />
      <PageHeader />
      <section id="jobs" className="small-top-pad section bg-default">
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
            <div id="middle" className="middle"></div>
            <div className="container search">
              <div className="row">
                <div className="col-md-12">
                  <Form data={formData} />
                </div>
              </div>
            </div>
          </div>
          {/*  Search End  */}

          {/*  Empty Grid  */}
          <div className="no-results" style={{ marginTop: 75 }}>
            <p
              className={`text-center ${
                formSubmitted && jobData && jobData.results.length === 0 ? '' : 'hidden'
              }`}
            >
              Sorry there were no results. Try again.
            </p>
          </div>

          <Loader isSubmitted={formSubmitted} jobData={jobData} />

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <Video isSubmitted={formSubmitted} />
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          {/*  End Empty Grid  */}

          {/*  Card Grid  */}
          <div className="jobgrid-container" ref={getGrid}>
            {jobData &&
              jobData.results.map((job, i) => (
                <Card isSubmitted={formSubmitted} jobData={job} key={`job data card-${i}`} />
              ))}
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <Paginate
            jobData={jobData}
            formData={formData}
            clickEvent={clickEvent}
            getGrid={getGrid}
          />
        </div>
      </div>
      {/*  End Card Grid  */}
    </>
  )
}

export default Jobs
