<template>
<div>
<p>
  <router-link to="/add-card"><button class="link"> &#x2795; Add a card</button></router-link>
  <router-link to="/"><button class="link">	&#x1F4DA; All the library</button></router-link>
</p>
<div>
  <router-view></router-view>
</div>
</div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'FastFlash',
    titleTemplate: null
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.link{
  margin-left: 2%;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px 20px;
  font-family: 'Lato', sans-serif;
  background: white;
  border: 3px solid black;
  font-size: 25px;

}

.link:hover{
  background: rgb(44, 62, 80, 0.1);
}
</style>
