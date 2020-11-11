import { NO_OF_TOP_TAGS, NO_OF_FEEDS } from "./configs"

export const TAGS = `tags/?order_by=count&order=DESC&number=${NO_OF_TOP_TAGS}`
export const CATEGORIES = 'categories/'
export const POSTS_FEED_URL = `posts/?number=${NO_OF_FEEDS}&order_by=date`
export const SINGLE_POST_URL = `posts/`
