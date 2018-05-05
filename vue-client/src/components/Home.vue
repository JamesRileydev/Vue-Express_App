<template>
  <div class="home">
    <h1>Home</h1>
      <div class="stores">
        <div class="store" v-for="store in stores">
            <label for="checkbox">Exclude NSFW? ({{exclude_nsfw}})</label>
            <input type="checkbox" id="nsfw" v-on:click="filter" v-model="exclude_nsfw">
          <h2>{{store.name}}</h2>
          <img :src="store.imageURL">
          <h2>{{store.location}}</h2>
        </div>
      </div>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data: function() {
    return {
      stores: []
    };
  },
  created: function() {
    console.log("Home::created"); // useful for understanding the lifecycle

    // usually `this` works in Vue components to set data to the state and re-render the template
    // saving `this` as `self` makes sure we still have access to all our component functions and state, even inside the
    var self = this;

    // axios.get('https://httpbin.org/user-agent')
    axios
      .get("http://localhost:3000/api/stores")
      .then(function(response) {
        self.stores = response.data;

        // print a specific part of response
        // console.log(response.data["user-agent"]);

        // change the local state, "save" to your component
        // self.userAgent = response.data["user-agent"];
      })
      .catch(function(error) {
        // if an error occurs, print that error
        console.log(error);
      });
  },
    methods: {
    filter: function(){
      var self = this;
      axios.get(
        'http://localhost:3000/api/stores',
        {
          params: {
            nsfw: self.exclude_nsfw
          }
        }
      )
      .then(function (response) {
        self.stores = response.data;
      })
      .catch(function (error) {
        // if an error occurs, print that error
        console.log(error);
      });
    }
  }
};
</script>

<style>
img {
  max-width: 50vw;
}
</style>