<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>Produto</h4>
    <form>
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" class="form-control" id="name"
          v-model="currentProduct.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <input type="text" class="form-control" id="description"
          v-model="currentProduct.description"
        />
      </div>      
      <div class="form-group">
        <label><strong>Marca:</strong></label>
        <input type="text" class="form-control" id="brand"
        v-model="currentProduct.brand"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteProduct"
    >
      Excluir
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateProduct"
    >
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Clique em um produto...</p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  // eslint-disable-next-line
  name: "product-details",
  data() {
    return {
      currentProduct: null,
      message: ''
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.edit(id)
        .then(response => {
          this.currentProduct = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then(response => {
          console.log(response.data);
          this.message = 'Produto foi atualizado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch(e => {
          console.log(e);
        });
      }
    },
  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>