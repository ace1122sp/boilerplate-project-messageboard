import { THREAD_API_BASE, REPLY_API_BASE } from '../constants';

export const threadURL = board => `${THREAD_API_BASE}/${board}`
export const replyURL = board => `${REPLY_API_BASE}/${board}`


