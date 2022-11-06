import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { render } from '@testing-library/vue'
import { plugin } from '..'

describe('slots', () => {
  const Root = defineComponent({
    template: `
    <ZAvant>
      <ZAvantMenuItem>
        <ZAvantMenu>
          <template #next>
            <span>Suivant</span>
          </template>
          <template #back>
            <span>Retour</span>
          </template>
          <template #default>
            <ZAvantMenuItem>
              1
            </ZAvantMenuItem>
            <ZAvantMenuItem>
              2
            </ZAvantMenuItem>
            <ZAvantMenuItem>
              3
            </ZAvantMenuItem>
          </template>
        </ZAvantMenu>
      </ZAvantMenuItem>
    </ZAvant>`
  })

  render(Root, {
    global: {
      plugins: [plugin]
    }
  })

  const zavantRoot = document.querySelector('.zavant')

  it('all', async () => {
    expect(zavantRoot?.outerHTML).toMatchSnapshot()
  })
})
