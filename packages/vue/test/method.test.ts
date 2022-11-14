import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
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

  const wrapper = mount(Root, {
    global: {
      plugins: [ZAvantPlugin]
    }
  })

  let level1HTML: string = '',
    rootHTML: string = ''

  it('next', async () => {
    rootHTML = wrapper.html()
    const nexts = wrapper.findAll('button.zavant__next')
    expect(nexts.length).toBe(2)

    await nexts[0].trigger('click')
    level1HTML = wrapper.html()
    expect(level1HTML).toMatchSnapshot()

    await nexts[1].trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  //TODO: Fix this test
  it.skip('back', async () => {
    const backs = wrapper.findAll('button.zavant__back')
    expect(backs.length).toBe(2)

    await backs[1].trigger('click')
    expect(wrapper.html()).toBe(level1HTML)

    await backs[0].trigger('click')
    expect(wrapper.html()).toBe(rootHTML)
  })
})
