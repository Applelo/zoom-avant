/**
 * @vitest-env node
 */
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe.skip('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url))
  })
  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).contain('zavant zavant--level-0 zavant--dynamic-height')
  })
})

// Not working currently
describe.skip('client', async () => {
  // await setup({
  //   rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  //   server: true,
  // })
  // useTestContext()
  // it('renders the index page', async () => {
  //   // Get response to a server-rendered page with `$fetch`.
  //   const html = await $fetch('/')
  //   expect(html).toMatchSnapshot()
  // })
})
