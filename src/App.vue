<template>
  <div id="app">
    <header class="page-header"></header>
    <section class="wrapper">
      <form class="new-film-form">
        <label class="new-film-label">
          Nueva película:
          <input v-model="newFilm" type="text" class="new-film-input">
        </label>
        <button type="submit" @click.prevent="addFilm()" class="new-film-button">Añadir</button>
      </form>
    </section>
  </div>
</template>

<script>
import { db } from './firebase';
export default {
  name: 'app',
  data () {
    return {
      newFilm: '',
      films: [],
      currentlyEditing: false,
      filmEditText: '',
    };
  },
  firestore: {
    films: db.collection("films").orderBy("createdAt", "desc"),
  },
  methods: {
    addFilm() {
      db.collection("films").add({
        text: this.newFilm,
        completed: false,
        id: this.films.length,
        createdAt: new Date(),
      })
      .then(function(docRef) {
        console.log('Película registrada con ID: ', docRef.id);
      })
      .catch(function(error) {
        console.log('Error al registrar película: ', error);
      });
      this.newFilm;
    },
    updateFilm(film) {
      db.collection("films").doc("film.id").update({...film})
      .then(function(docRef) {
        console.log('Película actualizada con ID: ', docRef.id);
      })
      .catch(function(error) {
        console.log('Error al actualizar película: ', error);
      });
    },
    deleteFilm(film) {
      db.collection("films").doc(this.currentlyEditing).delete();
    },
    editFilm(film) {
      this.currentlyEditing = film.id;
      this.filmEditText = film.text;
    },
    updateFilmText() {
      db.collection("films").doc("film.id").update({
        text: this.filmEditText,
      })
      .then(function() {
        console.log('Texto actualizado correctamente');
      })
      .catch(function(error) {
        console.log('Error al actualizar texto: ', error);
      });
      this.currentlyEditing = null;
      this.filmEditText = '';
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
