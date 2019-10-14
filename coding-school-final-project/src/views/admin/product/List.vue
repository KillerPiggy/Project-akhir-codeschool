<template>
  <section>
    <div class="container">
      <h1>Shoes List</h1>

      <div style="float: right;">
        <router-link :to="'/admin/product/insert/'">
        <button class="btn btn-primary ">Insert</button>
        </router-link>
      </div>
      <table class="table">
        <tr>
          <th scope="col">Title</th>
          <!-- <th scope="col">Address</th> -->
          <th scope="col">Image</th>
          <th scope="col">Brand</th>
          <th scope="col">Price</th>
          <th scope="col" colspan="2">Action</th>
        </tr>
        <tr v-for="(shoesRow, index) in shoes" :key="index">
          <td v-text="shoesRow.title"></td>
          <!-- <td v-text="shoesRow.address"></td> -->
          <td><img :src="shoesRow.image" width="100%"></td>
          <td v-text="shoesRow.brand"></td>
          <td v-text="shoesRow.price"></td>
          <td><router-link :to="'/admin/product/update/'+shoesRow.id"><button class="btn btn-info">Edit</button></router-link></td>
          <td><button class="btn btn-danger" @click="deleteData(shoesRow.id)">Delete</button></td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      shoes: [
        {
          title: '',
          // address: 'JL. Kemanggisan'
          image: '',
          brand: '',
          price: ''
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      var self = this
      this.$axios.get('http://localhost:3000/shoes/findAll').then(function (response){
        // console.log(response.data)
        self.shoes = response.data
        console.log(self.shoes)
      })
    },
    deleteData (dataId) {
      var self = this 

      this.$axios.delete(`http://localhost:3000/shoes/deleteOne/${dataId}`).then(
       function(response) {
         if (response.status === 200) {
          self.getData()
         }
      }).catch(function (error){
        console.log(error)
      })
    }
  }
}
</script>