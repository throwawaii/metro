import * as alertify from 'alertifyjs'

import { makeLink } from '../../util'
import auth from './auth'
import submitToGitHub from './submitToGitHub'

export default async function githubDialog(json: string): Promise<boolean> {
    const authData = await auth()
    if (!authData) {
        return false
    }
    alertify.message('Wait...')
    try {
        const pr = await submitToGitHub(json, authData)
        if (!pr) {
            alertify.error('Could not create a pull request')
            alertify.alert('Error', 'You have no permission to create pull requests for this repo')
            return false
        }
        if (pr.url) {
            alertify.alert('Success', `Pull request created (${makeLink(pr.url, 'link', true)})`)
        }
        return true
    } catch (err) {
        console.error(err)
        const { response } = err
        if (response.status === 401) {
            alertify.dismissAll()
            alertify.error('Incorrect login or password')
            return githubDialog(json)
        }
        alertify.error('Error')
        return false
    }
}
