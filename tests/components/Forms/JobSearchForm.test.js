import { Form } from '../../../src/components/Jobs/Form/Form.js'
import { render, fireEvent, waitFor } from '@testing-library/react'

describe('<Form />', () => {
  test('should submit job search form', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )

    const { container } = render(<Form />)
    const jobSearchForm = container.querySelector('#jobForm')
    const zipCodeInput = container.querySelector('#zipCode')
    const remoteCheckbox = container.querySelector('#inlineFormCheck')
    const distanceSelect = container.querySelector('#distanceSelect')

    fireEvent.input(zipCodeInput, {
      target: { value: '02901' },
    })

    fireEvent.click(remoteCheckbox, {
      target: { value: true },
    })

    fireEvent.change(distanceSelect, {
      target: { value: 4 },
    })

    expect(zipCodeInput.value).toBe('02901')
    expect(checkbox.checked).toEqual(true)
    expect(distanceSelect).toBe('25 mi')

    await waitFor(() => fireEvent.submit(jobSearchForm))

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(zipCodeInput.value).toBe('')
    expect(remoteCheckbox.checked).toBe(false)
    expect(distanceSelect).toBe('')
  })
})
