import request from './request'

export default function getTrips ({ fromCity = '', duration = '', offset = 0 } = {}) {
  let params = {}
  if (fromCity === '' || duration === '') {
    return
  }
  params.from_city = fromCity
  params.duration = duration
  params.offset = offset

  return request.get(`/trips`, params)
}
