<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <form @submit.prevent="createGif()">
          <input v-model="editable.imgUrl" type="text" required>
          <input v-model="editable.tags" type="text" required>
          <button class="btn btn-info" type="submit">submit</button>
        </form>
      </div>
    </section>
<section class="row">

  <div v-for="gif in gifs" :key="gif.id" class = "col-4" @click="openGif(gif.id)">
  <!-- <img :src="gif.url" alt="gif" class = "img-fluid"> -->
  <h3>{{ gif.opened }}</h3>
  <p>{{ gif.tag }}</p>
</div>
</section>
    </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import {gifsService} from '../services/GifsService.js'
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';

export default {
  setup() {
    const editable = ref({});
    // const secondEditable = ref({})
    async function getGifs() {
      try{
          await gifsService.getGifs()
      } catch(error) {
          Pop.error(error.message);
        
      }
    }
    onMounted (()=>{
      logger.log('home page mounted')
     getGifs()
    })
    return {
      editable,
      // secondEditable,
      gifs: computed(() => AppState.gifs),
      async openGif(gifId){
        try{
          await gifsService.openGif(gifId)
            logger.log('gif id?', gifId)
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      },
      async createGif(){
        try{
          logger.log(editable.value)
          // logger.log(secondEditable.value)
          const formData = editable.value

          
          await gifsService.createGif(formData)
        }
        catch(error){
          Pop.error(error.message)
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
