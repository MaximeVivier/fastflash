<template>
  <div>
    <h1>Choose the library you want to study</h1>
    <div>
      <LibraryItemList v-for="library in libraries" :key="library.name" v-bind:library="library" />
    </div>
  </div>
</template>

<script>
import LibraryItemList from './LibraryItemList';
import gql from 'graphql-tag';

export default {
  name: 'DisplayCard',
  components: {
    LibraryItemList,
  },
  methods: {},
  apollo: {
    libraries: {
      query: gql`{
        libraries {
          name
        }
      }`,
      update: data => data.libraries
    },
  },
  data() {
    return {
      libraries: []
    };
  },
}
</script>

<style scoped>

</style>