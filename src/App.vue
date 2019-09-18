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
      <ul class="film-list">
        <li v-for="film in films" :key="film.id" class="film-item">
          <label v-if="currentlyEditing !== film.id" class="film-item-label">
            <input 
            type="checkbox" 
            v-model="film.completed" 
            @change="updateFilm(film)"
            class="film-item__checkbox">
            {{ film.text }}
          </label>
          <div v-if="currentlyEditing !== film.id">
            <button @click="editFilm(film)" class="film-button">
              <img src="./assets/pencil.svg" alt="Edita película">
            </button>
            <button @click="deleteFilm(film)" class="film-button">
              <img src="./assets/trash.svg" alt="Elimina película">
            </button>
          </div>
          <form v-else class="edit-film-form">
            <label class="edit-film-label">
              Edita:
              <input type="text" v-model="filmEditText" class="edit-film-input">
            </label>
            <button type="submit" @click.prevent="updateFilmText()" class="edit-film-button">
              Graba
            </button>
          </form>
        </li>
      </ul>
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
      currentlyEditing: null,
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
      this.newFilm = '';
    },
    updateFilm(film) {
      db.collection("films").doc(film.id).update({...film})
      .then(function(docRef) {
        console.log('Película actualizada con ID: ', docRef.id);
      })
      .catch(function(error) {
        console.log('Error al actualizar película: ', error);
      });
    },
    deleteFilm(film) {
      db.collection("films").doc(film.id).delete();
    },
    editFilm(film) {
      this.currentlyEditing = film.id;
      this.filmEditText = film.text;
    },
    updateFilmText() {
      db.collection("films").doc(this.currentlyEditing).update({
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
  margin: 0;
  padding: 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
button {
  cursor: pointer;
}
.page-header {
  padding: 5rem 0;
  width: 100%;
  background: #FF33AE;
}
.wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}
.new-film-form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #fafafa;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, .15);
  margin-top: -3rem;
  background: white;
}
.new-film-label {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
}
.new-film-input {
  padding: .5rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  font-size: 1rem;
  margin-top: .5rem;
  font-weight: normal;
}
.new-film-button {
  font-size: 1rem;
  padding: .5rem .7rem;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  background: #FF33AE;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #ff33ae;
}
.edit-film-form {
  width: 100%;
  justify-content: space-between;
  display: flex;
  padding: 1rem;
}
.edit-film-label {
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
}
.edit-film-input {
  padding: .5rem;
  border-radius: 3px;
  border: 1px solid lightgray;
  font-size: 1rem;
  flex: 1;
  margin-left: 1rem;
}
.edit-film-button {
  font-size: 1rem;
  padding: .5rem .7rem;
  border-radius: 3px;
  color: #FF33AE;
  font-weight: bold;
  margin-left: 1rem;
  border: 1px solid #FF33AE;
}
.film-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  &:first-of-type{
    border-radius: 3px 3px 0 0;
  }
  &:last-of-type {
    border-bottom: 1px solid lightgray;
    border-radius: 0 0 3px 3px;
  }
}
.film-item-label {
  cursor: pointer;
  padding: 1rem;
}
.film-item__checkbox {
  margin-right: 1rem;
}
.film-list {
  max-width: 100%;
  margin: 2rem auto;
}
.film-button {
  background: transparent;
  border: 0;
  padding: .5rem;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
