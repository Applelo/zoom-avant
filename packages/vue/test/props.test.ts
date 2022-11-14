import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
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

  const wrapper = mount(Root, {
    global: {
      plugins: [ZAvantPlugin]
    }
  })

  it('global back', () => {
    expect(wrapper.findAll('.zavant__back').length).toBe(2)
  })

  it('dynamicHeight', () => {
    expect(wrapper.find('.zavant--dynamic-height')).not.toBeNull()
  })
})

describe('props menu', () => {
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

  const wrapper = mount(Root, {
    global: {
      plugins: [ZAvantPlugin]
    }
  })

  it('next and back', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
