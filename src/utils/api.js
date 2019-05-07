import request from './request'

export function getTrips ({ fromCity = '', duration = '', offset = 0 } = {}) {
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

export function getPoisByCityName ({ cityName = '' } = {}) {
  return request.get(`/pois`, { city_name: cityName })
}

export function getCityByPosition ({ lon = '', lat = '' } = {}) {
  return request.get(`/position_to_city`, { lon: lon, lat: lat })
}
