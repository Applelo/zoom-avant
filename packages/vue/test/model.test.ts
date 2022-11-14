import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { ZAvantPlugin } from '..'

describe('model', () => {
  const Root = defineComponent({
    data: () => {
      return {
        model: [1, 1]
      }
    },
    template: `
    <ZAvant v-model="model">
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

  it('initial', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('go to 1', async () => {
    await wrapper.setData({ model: [1] })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('go back', async () => {
    await wrapper.setData({ model: [] })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
