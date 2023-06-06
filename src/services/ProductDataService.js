import http from "../http-common"

class ProductDataService {
  getAll() {
    return http.get("/products/list")
  }

  edit(id) {
    return http.get(`/products/edit/${id}`)
  }

  create(data) {
    return http.post("/products/create", data)
  }

  update(id, data) {
    return http.put(`/products/update/${id}`, data)
  }

  delete(id) {
    return http.delete(`/products/delete/${id}`)
  }

  findByName(name) {
    return http.get(`/products/list?filter[name]=${name}`)
  }
}

export default new ProductDataService()
