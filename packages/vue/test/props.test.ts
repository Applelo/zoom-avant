import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { render } from '@testing-library/vue'
import { ZAvantPlugin } from '..'

describe('props root', () => {
  const Root = defineComponent({
    template: `
    <ZAvant :dynamic-height="true" back="Retour">
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

  render(Root, {
    global: {
      plugins: [ZAvantPlugin]
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
      <ZAvantItem>
        <ZAvantMenu next="Suivant" back="Retour">
          <ZAvantItem>
            1
          </ZAvantItem>
        </ZAvantMenu>
      </ZAvantItem>
      <ZAvantItem>
        1
      </ZAvantItem>
    </ZAvant>`
  })

  render(Root, {
    global: {
      plugins: [ZAvantPlugin]
    }
  })
  const zavantRoot = document.querySelector<HTMLElement>('.zavant')

  it('next and back', () => {
    expect(zavantRoot?.outerHTML).toMatchSnapshot()
  })
})
