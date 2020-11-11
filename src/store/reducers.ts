import produce from 'immer'

import { IRootState, IAction } from "../interfaces"
import { ACTION_TYPES } from './actions'

export const TOGGLE = "ui/toggle"

const initialState: Partial<IRootState['blog']> = {
  topTags: [],
  categories: [],
  blogs: [],
  totalBlogs: 0,
}

const reducer = (
	state: Partial<IRootState['blog']> = initialState,
	action: IAction
): Partial<IRootState['blog']> => produce(
  state,
  draftState => {
    switch (action.type) {
        case ACTION_TYPES.SAVE_CATEGORIES:
            draftState.categories = action.payload.data
            break
        case ACTION_TYPES.SAVE_TOP_TAGS:
            draftState.topTags = action.payload.data
            break
        case ACTION_TYPES.SAVE_BLOG_FEEDS:
            draftState.blogs = action.payload.data
            draftState.totalBlogs = action.payload.totalCount
            break
        }
    }
)

export default reducer
