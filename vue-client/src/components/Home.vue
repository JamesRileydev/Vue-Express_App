<template>
  <div class="home">
    <h1>Home</h1>
    <pre>
      {{userAgent}}
    </pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data: function(){
    return {
      userAgent: ''
    }
  },
  created: function(){
    console.log('Home::created'); // useful for understanding the lifecycle

    // usually `this` works in Vue components to set data to the state and re-render the template
    // saving `this` as `self` makes sure we still have access to all our component functions and state, even inside the
    var self = this;

    axios.get('https://httpbin.org/user-agent')
    .then(function (response) {
      // print entire response
      console.log(response);

      // print a specific part of response
      console.log(response.data['user-agent']);

      // change the local state, "save" to your component
      self.userAgent = response.data['user-agent'];
    })
    .catch(function (error) {
      // if an error occurs, print that error
      console.log(error);
    });
  }
}
</script>