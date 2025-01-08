import { services } from '@/services'

export const getProducts = async () => {
  const response = await services.products.get.call()
  return response.data
}

export const createProduct = async (product)=> {
  const response = await services.products.addPordict.call(product)
  return response.data
}

