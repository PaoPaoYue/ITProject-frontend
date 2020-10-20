<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >       
    <v-col cols="12">
      <v-text-field label="Title" v-model="articletitle"></v-text-field>
      <v-combobox
        v-model="select"
        :items="['Programming','Design','Vue','Java']"
        label="Tags"
        multiple
        chips
      >
        <template v-slot:selection="data">
          <v-chip
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
      <div class="title mb-1">COVER IMG</div>
      <v-img src="https://picsum.photos/510/300?random" aspect-ratio="3" contain></v-img>

    </v-col>
     <v-row>
     <v-col>
             <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an IMG"
      prepend-icon="mdi-camera"
      label="CoverIMG"
    ></v-file-input>
    </v-col>
    </v-row>     
  </v-card>  
</template>

<script>
export default {
  name: 'EditInfo',
  props: {
      
  },

  data() {
    return {
      valid: true,
      articletitle:'Draft1',
      select: ['Vue', 'Programming'],
    }
  },


}
</script>