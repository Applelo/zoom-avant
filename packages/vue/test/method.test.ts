import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { render, fireEvent } from '@testing-library/vue'
import { plugin } from '..'

describe('methods', () => {
  const Root = defineComponent({
    template: `
    <ZAvant>
      <ZAvantMenuItem>
        <ZAvantMenu next="go-level-1">
          <ZAvantMenuItem>1</ZAvantMenuItem>
          <ZAvantMenuItem>2</ZAvantMenuItem>
          <ZAvantMenuItem>
            <ZAvantMenu next="go-level-2">
              <ZAvantMenuItem>
                1
              </ZAvantMenuItem>
              <ZAvantMenuItem>
                2
              </ZAvantMenuItem>
            </ZAvantMenu>
          </ZAvantMenuItem>
        </ZAvantMenu>
      </ZAvantMenuItem>
      <ZAvantMenuItem>
        1
      </ZAvantMenuItem>
    </ZAvant>`
  })

  const { getByText, getAllByText } = render(Root, {
    global: {
      plugins: [plugin]
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
