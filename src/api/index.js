import { send } from 'api/request'

export const createQuestion = body => send('owl.NewChatQuestion', body)
export const getQuestionStatus = body => send('owl.GetChatQuestionStatus', body)
