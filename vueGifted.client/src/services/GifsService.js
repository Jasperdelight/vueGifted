import { AppState } from "../AppState.js"
import { Gif } from "../models/Gif.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GifsService {
  async getGifs() {
    const res = await api.get('api/gifts')
    logger.log('got gifs', res.data)
    const gifs = res.data.map(g => new Gif(g))
    AppState.gifs = gifs
    logger.log('gifs in appstate', AppState.gifs)
  }

  async openGif(gifId) {
    const res = await api.get(`api/gifts/${gifId}`)
    logger.log('gif by id', res.data)

    const openedGif = await api.put(`api/gifts/${gifId}`, { opened: true })
    logger.log('openedgif?', openedGif)
  }

  async createGif(gifUrl, gifTag) {
    const newGif = new Gif(gifUrl, gifTag)
    logger.log('new gift with data?', newGif)
    // cons res = await api.post(`api/gifts`, )
  }
}

export const gifsService = new GifsService()