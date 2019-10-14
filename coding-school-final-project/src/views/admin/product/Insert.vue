<template>
  <div class="container">
    <h1>Product Insert</h1>
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
        <label for="description" class="col-sm-2 col-form-label">Desciption</label>
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
      }
    }
  },
  methods: {
    submitData (){
      var self = this
      var postData = {
        title: this.formSubmitData.title,
        brand: this.formSubmitData.brand,
        // address: this.formSubmitData.address,
        image: document.querySelector('#image').files[0],
        price: this.formSubmitData.price,
        description: this.formSubmitData.description,
        color: this.formSubmitData.color,
        featured: this.formSubmitData.featured
      }

      var formData = new FormData ()
      for (var key in postData) {
        formData.append(key, postData[key])
      }

      this.$axios.post('http://localhost:3000/shoes/insert', formData).then(
       function(response) {
         if (response.status === 201) {
           // PINDAH HALAMAN KE LIST
           self.$router.push('/admin/product')
         }
      }).catch(function (error){
        console.log(error)
      })
    }
  }
}
</script>