import { getPassword } from '../alertify'
import { makeLink } from '../../util'

const TITLE = 'GitHub password'
const FILE_URL = 'https://github.com/inker/metro/blob/master/src/ui/GitHub.ts'
const message = makeLink(FILE_URL, "I don't store it anywhere", true)

export default () => getPassword(TITLE, message, null)
