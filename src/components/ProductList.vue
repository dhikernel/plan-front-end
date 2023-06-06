<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pesquise por nome"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Procurar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Produtos</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
        </li>
      </ul>      
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <h4>Produto</h4>
        <div>
          <label><strong>Nome:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>Descrição:</strong></label> {{ currentProduct.description }}
        </div>
        <div>
          <label><strong>Marcas:</strong></label> {{ currentProduct.brand }}
        </div>

        <router-link :to="'/products/edit/' + currentProduct.id" class="badge badge-warning">Editar</router-link>
      </div>
      <div v-else>
        <br />
        <p>Clique em um produto...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "products-list",
  data() {
    return {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then(response => {
          this.products = response.data[0].data;
          console.log(response.data[0].data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },

    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = product ? index : -1;
    },

    searchName() {
      ProductDataService.findByName(this.name)
        .then(response => {
          this.products = response.data[0].data;
          this.setActiveProduct(null);
          console.log(response.data[0].data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveProducts();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
