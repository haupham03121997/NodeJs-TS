import { RequestHandler, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetRequestBody } from '~/models/requests/Tweet.request'
import { TokenPayload } from '~/models/requests/User.request'
import tweetsService from '~/services/tweets.service'

export const createTweetController: RequestHandler = async (
  req: Request<ParamsDictionary, any, TweetRequestBody>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const result = await tweetsService.createTweets(req.body, user_id || '')

  return res.status(200).send({ message: 'Tạo thành công', result })
}

export const getTweetController: RequestHandler = async (req: Request, res: Response) => {
  const result = await tweetsService.inCreateView(req.params.tweet_id as string, req.decode_authorization?.user_id)
  return res.status(200).send({ message: 'Lấy tweet thành công', result: { ...req.tweet, ...result } })
}
