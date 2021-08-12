import { render, fireEvent, waitFor } from '@testing-library/react'
import Form from '../../../src/components/Jobs/Form/Form'

describe('<Form />', () => {
  test('should submit job search form', async () => {
    // this mock needs to worked out still but here is a starting point
    function formData(formResponse = jest.fn(), page = 1) {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
        })
      )
    }


    const { container } = render(<Form formData={formData} />)
    const jobSearchForm = container.querySelector('#jobForm')
    const zipCodeInput = container.querySelector('#zipCode')
    const remoteCheckbox = container.querySelector('#inlineFormCheck')
    const distanceSelect = container.querySelector('#distanceSelect')
    const distanceSelectOptions = container.querySelectorAll('option')

    fireEvent.input(zipCodeInput, {
      target: { value: '02901' },
    })

    fireEvent.click(remoteCheckbox, {
      target: { value: true },
    })

    fireEvent.change(distanceSelect, {
      target: { value: 1 },
    })

    expect(zipCodeInput.value).toBe('02901')
    // expect(checkbox.checked).toEqual(true) // where did checkbox come from?
    expect(distanceSelectOptions[0].selected).toBe(true)
    expect(distanceSelectOptions[1].selected).toBe(false)

    await waitFor(() => fireEvent.submit(jobSearchForm))

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(zipCodeInput.value).toBe('')
    expect(remoteCheckbox.checked).toBe(false)
    expect(distanceSelect).toBe('')
  })
})
