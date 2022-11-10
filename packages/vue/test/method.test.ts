import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { render, fireEvent } from '@testing-library/vue'
import { ZAvantPlugin } from '..'

describe('methods', () => {
  const Root = defineComponent({
    template: `
    <ZAvant>
      <ZAvantItem>
        <ZAvantMenu next="go-level-1">
          <ZAvantItem>1</ZAvantItem>
          <ZAvantItem>2</ZAvantItem>
          <ZAvantItem>
            <ZAvantMenu next="go-level-2">
              <ZAvantItem>
                1
              </ZAvantItem>
              <ZAvantItem>
                2
              </ZAvantItem>
            </ZAvantMenu>
          </ZAvantItem>
        </ZAvantMenu>
      </ZAvantItem>
      <ZAvantItem>
        1
      </ZAvantItem>
    </ZAvant>`
  })

  const { getByText, getAllByText } = render(Root, {
    global: {
      plugins: [ZAvantPlugin]
    }
  })

  let level1HTML: string | undefined, rootHTML: string | undefined
  const zavantRoot = document.querySelector('.zavant')

  it('next', async () => {
    rootHTML = zavantRoot?.outerHTML

    await fireEvent.click(getByText('go-level-1'))
    level1HTML = zavantRoot?.outerHTML
    expect(level1HTML).toMatchSnapshot()

    await fireEvent.click(getByText('go-level-2'))
    expect(zavantRoot?.outerHTML).toMatchSnapshot()
  })

  it('back', async () => {
    const backs = getAllByText('Back')

    await fireEvent.click(backs[1])
    expect(zavantRoot?.outerHTML).toBe(level1HTML)

    await fireEvent.click(backs[0])
    expect(zavantRoot?.outerHTML).toBe(rootHTML)
  })
})
