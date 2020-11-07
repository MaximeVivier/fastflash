<template>
    <div class="card" id="card-details" v-on:click="revealOrNext">
      <p class="recto" v-if="!end_of_the_library"><strong>{{ card.position? card.recto : card.verso}}</strong></p>
      <p class="verso" v-if="answer_revealed"><em>{{ card.position? card.verso : card.recto}}</em></p>
      <p class="verso warning" v-if="end_of_the_library"> &#x1F44F; This is the end of the library, if you want to practice in the other way around please refresh the page. &#x1F44F; </p>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'SingleCard',
  methods: {
      async revealOrNext() {
        if (!this.end_of_the_library) {
          if (this.answer_revealed) {
            this.$emit('next-card', this.current_index);
            this.answer_revealed = false;
            await this.$apollo.mutate({
              mutation: gql`mutation ($id: Int!, $position: Boolean! ) {
                              flipCard(id: $id, position: $position ) {
                                id
                                position
                              }
                            }`,
              variables: {
                position: this.card.position,
                id:this.card.id,
              },
              refetchQueries: [{
                query: this.$apollo.queries.card.options.query,
                variables: { id: parseInt(this.cards_id[this.current_index]) },
              }]
            });
          } else {
            this.answer_revealed = true;
          }
        }
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    cards: gql`{
      cards {
        id
      }
    }`,
    card:{
      // gql query
      query: gql`query card($id: Int!) {
                  card(id: $id){
                    id
                    recto
                    verso
                    position
                  }
    }`,
      // Static parameters
      variables () {
        // Use vue reactive properties here
        return {
          id: parseInt(this.cards_id[this.current_index]),
        }
      },
  }},
  props: {
    current_index: Number,
    cards_id: Array,
  },
  data () {

    return {

      answer_revealed: false,
      cards: [],
      card: {},
    }

  }
}

</script>

<style scoped>
.card {
  font-size: 30px;
  padding: 1em;
  margin: 1em;
  width: 12em;
  height: 12em;
  border-radius: 10px;
  color: #2c3e50;
  border-style: solid;
}
.recto{
  font-family: 'Alfa Slab One', cursive;
}
.verso{
  font-family: 'Lato', sans-serif;

}

.warning{
  margin-top: 25%;
  font-size: 22px;
}

.card:hover {
  background-color: rgb(44, 62, 80, 0.1);
  transform: rotate3d(-1, 2, 0, 20deg);
}
</style>