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

export function getCities ({ letter = 'A', q = '' } = {}) {
  let params = {}
  if (letter === '' && q === '') {
    return
  }
  params.letter = letter
  params.q = q
  return request.get(`/cities`, params)
}

export function addHotCity ({ hotCityName = '' } = {}) {
  let params = {}
  params.hot_city_name = hotCityName
  return request.post(`/add_hot`, params)
}
