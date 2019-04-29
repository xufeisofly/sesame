import request from './request'

export function getTickets ({ q = '', offset = 0, limit = 20 } = {}) {
  let params = {}
  if (q === '') {
    return
  }
  params.q = search
  params.offset = offset
  params.limit = limit

  return request.get(`/tickets`, params) 
}
