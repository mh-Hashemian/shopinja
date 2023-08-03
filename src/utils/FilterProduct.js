export default class FilterProduct {
  constructor(product, filters) {
    this.product = product
    this.filters = filters

    this.matchConditions = {
      title: true,
      tags: true,
      justInStock: true,
      priceRange: true,
    }
  }

  title(title = "") {
    if (!title.includes(this.filters.title)) this.matchConditions.title = false

    return this
  }

  tags(tags = []) {
    if (!this.filters.tags.every((t) => tags.includes(t)))
      this.matchConditions.tags = false

    return this
  }

  justInStock(stock = false) {
    if (this.filters.justInStock) {
      if (stock <= 0) this.matchConditions.justInStock = false
    }

    return this
  }

  priceRange(price) {
    const { min, max } = this.filters.priceRange

    if (Number(max) > 0) {
      if (price >= Number(min) && price <= Number(max))
        this.matchConditions.priceRange = true
      else this.matchConditions.priceRange = false
    }

    return this
  }

  filter() {
    const { title, tags, stock, price } = this.product
    this.title(title).tags(tags).justInStock(stock).priceRange(price)

    const matchAllConitions = Object.values(this.matchConditions).every(
      (c) => c
    )

    return matchAllConitions
  }
}
