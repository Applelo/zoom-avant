import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
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

  const wrapper = mount(Root, {
    global: {
      plugins: [ZAvantPlugin]
    }
  })

  it('all', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
