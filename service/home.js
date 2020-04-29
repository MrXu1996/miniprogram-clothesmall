import network from './network.js'

export function getMultiData() {
  return network({
    url: '/home/multidata'
  })
}

export function getGoodsData(type, page) {
  return network({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}