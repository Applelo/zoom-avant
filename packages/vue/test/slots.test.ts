import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { render } from '@testing-library/vue'
import { ZAvantPlugin } from '..'

describe('slots', () => {
  const Root = defineComponent({
    template: `
    <ZAvant>
      <ZAvantItem>
        <ZAvantMenu>
          <template #next>
            <span>Suivant</span>
          </template>
          <template #back>
            <span>Retour</span>
          </template>
          <template #default>
            <ZAvantItem>
              1
            </ZAvantItem>
            <ZAvantItem>
              2
            </ZAvantItem>
            <ZAvantItem>
              3
            </ZAvantItem>
          </template>
        </ZAvantMenu>
      </ZAvantItem>
    </ZAvant>`
  })

  render(Root, {
    global: {
      plugins: [ZAvantPlugin]
    }
  })

  const zavantRoot = document.querySelector('.zavant')

  it('all', async () => {
    expect(zavantRoot?.outerHTML).toMatchSnapshot()
  })
})
