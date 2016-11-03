import generateTemplate from './generateTemplate'
import createRepo from './createRepo'
import buildGitbook from './buildGitbook'
import deployGhPages from './deploy-gh-pages.js'

export {ghClient as ghClient} from './createRepo'
export {getGHUsername as getGHUsername} from './createRepo'

export default async function createGitbook(options) {
  await generateTemplate(options)
  await buildGitbook(options.name)
  await createRepo(options)
  await deployGhPages(options.name, options.username)
}