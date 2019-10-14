<template>
  <div class="container">
    <h1>Product Update</h1>
    <form method="post" @submit.prevent="submitData()">
      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="title" v-model="formSubmitData.title">
        </div>
      </div>
      <div class="form-group row">
        <label for="brand" class="col-sm-2 col-form-label">Brand</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="brand" v-model="formSubmitData.brand">
        </div>
      </div>
      <!-- <div class="form-group row">
        <label for="address" class="col-sm-2 col-form-label">Address</label>
        <div class="col-sm-10">
          <textarea id="address" class="form-control" cols="30" rows="10" v-model="formSubmitData.address"></textarea>
        </div>
      </div> -->
      <div class="form-group row">
        <label for="image" class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
          <input type="file" id="image">
        </div>
      </div>
      <div class="form-group row">
        <label for="price" class="col-sm-2 col-form-label">Price</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="price" v-model="formSubmitData.price">
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="description" v-model="formSubmitData.description">
        </div>
      </div>
      <div class="form-group row">
        <label for="color" class="col-sm-2 col-form-label">Color</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="color" v-model="formSubmitData.color">
        </div>
      </div>
      <div class="form-group row">
        <label for="featured" class="col-sm-2 col-form-label">Featured</label>
        <div class="col-sm-10">
          <input type="checkbox" class="form-control" id="featured" v-model="formSubmitData.featured">
        </div>
      </div>
      
      <div class="form-group row">
        <div class="col-sm-10">
          <img :src="formSubmitData.image" alt="">
        </div>
      </div>
      <div class="form-group row">
        <button type="button" class="btn btn-danger">Cancel</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formSubmitData: {
        title: '',
        // address: 'Greenlake City',
        brand: '',
        image: '',
        price: '',
        description: '',
        color: '',
        featured: ''
      },
      id: this.$route.params.id
    }
  },

  created() {
    this.getDetailData()
  },

  methods: {
    getDetailData () {
      var self = this
      
      this.$axios.get(`http://localhost:3000/shoes/findOne/${this.id}`).then(
       function(response) {
         if (response.status === 200) {
          self.formSubmitData.title = response.data.title
          self.formSubmitData.brand = response.data.brand
          // self.formSubmitData.address = response.data.address
          self.formSubmitData.image = response.data.image
          self.formSubmitData.price = response.data.price
          self.formSubmitData.description = response.data.description
          self.formSubmitData.color = response.data.color
          self.formSubmitData.featured = response.data.featured
         }
      }).catch(function (error){
        console.log(error)
      })
    },
    submitData () {
      var self = this
      var post = {
        title: this.formSubmitData.title,
        brand: this.formSubmitData.brand,
        // address: this.formSubmitData.address,
        image: document.querySelector('#image').files[0],
        price: this.formSubmitData.price,
        description: this.formSubmitData.description,
        color: this.formSubmitData.color,
        featured: this.formSubmitData.featured
      }

      var formData = new FormData()
      for (var key in post) {
        formData.append(key, post[key])
      }
      
      this.$axios.patch(`http://localhost:3000/shoes/updateOne/${this.id}`, formData).then(
       function(response) {
         if (response.status === 200) {
          self.$router.push('/admin/product')
         }
      }).catch(function (response){
        console.log(error)
      })
    }
  }
}
</script>