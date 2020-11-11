import { createBrowserHistory as createHistory } from 'history'

export const history = createHistory()

export function navigateTo(path: string) {
    history.push(path)
}