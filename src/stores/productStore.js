import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"
import productsJson from "../data/products.json"

export const useProductStore = defineStore("products", {
  state: () => ({
    products: useLocalStorage("products", productsJson),
    filters: {
      title: "",
      tags: [],
      justInStock: false,
      priceRange: { min: 0, max: 0 },
    },
    sortOptions: {
      sortBy: "",
      direction: "",
    },
  }),
  getters: {
    getFilteredProducts: (state) => {
      const filteredProducts = state.products.filter((product) => {
        const { title, price, stock, tags } = product
        const filters = state.filters
        const { min, max } = filters.priceRange

        const matchTitle = () => title.includes(filters.title)
        const matchTags = () => filters.tags.every((t) => tags.includes(t))
        const matchInStock = () => (filters.justInStock ? stock > 0 : true)
        const matchPrice = () =>
          Number(max) > 0 ? price >= Number(min) && price <= Number(max) : true

        const matchAllConitions = [
          matchTitle(),
          matchTags(),
          matchInStock(),
          matchPrice(),
        ]

        return matchAllConitions.every((condition) => condition === true)
      })

      if (state.sortOptions) {
        const { sortBy, direction } = state.sortOptions
        filteredProducts.sort((a, b) => {
          return direction === "ASC"
            ? a[sortBy] - b[sortBy]
            : b[sortBy] - a[sortBy]
        })
      }

      return filteredProducts
    },
    getProduct: (state) => {
      return (productId) => {
        return state.products.find((p) => p.id === productId)
      }
    },
  },
  actions: {
    addTag(tag) {
      if (this.filters.tags.includes(tag)) return
      this.filters.tags.push(tag)
    },
    removeTag(tag) {
      this.filters.tags = this.filters.tags.filter((t) => t !== tag)
    },
    decreaseInStock(productId) {
      const product = this.getProduct(productId)
      if (product.stock > 0) {
        product.stock -= 1
        return true
      } else {
        return false
      }
    },
    increaseInStock(productId, amount = 1) {
      const product = this.getProduct(productId)
      product.stock += amount
    },
  },
})
