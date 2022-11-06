import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { render } from '@testing-library/vue'
import { plugin } from '..'

describe('props root', () => {
  const Root = defineComponent({
    template: `
    <ZAvant :dynamic-height="true" back="Retour">
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

  render(Root, {
    global: {
      plugins: [plugin]
    }
  })
  const zavantRoot = document.querySelector<HTMLElement>('.zavant')

  it('global back', () => {
    expect(zavantRoot?.querySelectorAll('.zavant__back').length).toBe(2)
  })

  it('dynamicHeight', () => {
    expect(
      zavantRoot?.classList.contains('zavant--dynamic-height')
    ).toBeTruthy()
  })
})

describe('props root', () => {
  const Root = defineComponent({
    template: `
    <ZAvant>
      <ZAvantMenuItem>
        <ZAvantMenu next="Suivant" back="Retour">
          <ZAvantMenuItem>
            1
          </ZAvantMenuItem>
        </ZAvantMenu>
      </ZAvantMenuItem>
      <ZAvantMenuItem>
        1
      </ZAvantMenuItem>
    </ZAvant>`
  })

  render(Root, {
    global: {
      plugins: [plugin]
    }
  })
  const zavantRoot = document.querySelector<HTMLElement>('.zavant')

  it('next and back', () => {
    expect(zavantRoot?.outerHTML).toMatchSnapshot()
  })
})
