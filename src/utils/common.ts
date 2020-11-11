import axios from 'axios'
import { BASE_URL, SITE_ID } from '../constants/configs'
import { IGenericObject } from '../interfaces'
import { useRef, useEffect } from 'react'

export async function get(url: string) {
	return axios
		.get(`${BASE_URL}${SITE_ID}/${url}`)
		.then((response) => response.data)
		.catch((error) => {
            // Log Error
			console.log(error)
			console.log('An Error Occurred')
		})
}

export function objectToQueryString(query: IGenericObject<string|number>): string {
	return Object.keys(query)
		.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
		.join('&')
}

export function stringifyObjectValues(obj: IGenericObject<any>): IGenericObject<string> {
	return Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: obj[key] + ''}), {})
}

export function useGetPrevious(value: any): any {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	}, [value])
	return ref.current
}

export function timeInAge(endDate: Date, startDate: Date = new Date()): string{
    const duration = startDate.getTime() - endDate.getTime()
    /*86400000 milliseconds = 1 day */
	const durationInDays = Math.floor(duration / 86400000)
	if (durationInDays > 20)
    {
        return endDate.toDateString()
    }
    if (durationInDays > 1)
    {
        return `${durationInDays} days ago`
    }
    if (durationInDays === 1)
    {
        return 'Yesterday'
    }
    /*3600000 milliseconds = 1 hour */
    const durationInHours = Math.floor(duration / 3600000) 
    if (durationInHours >= 1)
    {
        return `${durationInHours} ${(durationInHours === 1 ? 'hour ago' : 'hours ago')}`
    }
    /*60000 milliseconds = 1 minute */
    const durationInMinutes = Math.floor(duration / 60000 )
    if (durationInMinutes >= 1)
    {
        return `${durationInMinutes} ${(durationInMinutes === 1 ? 'minute ago' : 'minutes ago')}`
    }
    return 'Just now'
}

export function decodeSlug(slug: string): string {
    return slug.split('-').join(' ')
}

export function stopEventBubbleAndCall(func: Function, event: React.MouseEvent): void {
    event.stopPropagation()
    func()
}
