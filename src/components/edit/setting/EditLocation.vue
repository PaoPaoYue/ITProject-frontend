<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2"
  > 
    <v-col cols="12" md="10" offset-md="1">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>

        <base-info-card title="Change Password" color="yellow">
          <v-card light class="px-4 py-6" rounded='xl'  flat>
            <v-col cols="12" md="10" offset-md="1" class="pa-0">
              <base-body>
                <v-icon >mdi-alert-circle-outline</v-icon> 
                <span class="text-with-icon"> Your current location will be displayed on your profile page.</span>
              </base-body>
              <gmap-autocomplete 
                selectFirstOnEnter
                ref="autocomplete"
                @place_changed="setPlace" 
                :value="location_m"
                :fields='["geometry", "name", "address_components", "formatted_address"]'
                :types='["(cities)"]'
              >
                <template v-slot:input="slotProps">
                  <v-text-field
                    prepend-icon="mdi-map-marker"
                    placeholder="Type and we will auto-complete for you"
                    label="Your Current Location"
                    ref="input"
                    :value="location_m"
                    v-on:listeners="slotProps.listeners"
                    v-on:attrs="slotProps.attrs">
                  </v-text-field>
                </template>
              </gmap-autocomplete>
              <GmapMap ref="mapRef" style="height: 20rem; width: 100%"
                :center="position"
                :zoom="3"
                :options="{
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                  disableDefaultUi: false
                }"
              >
                <GmapMarker ref="myMarker"
                  v-if="show"
                  :position="position"
                  :clickable="true"
                  :draggable="true" 
                />
              </GmapMap>


            </v-col>
          </v-card>
        </base-info-card>
      </v-form>
    </v-col>
  </v-card>  
</template>

<script>

export default {
  name: 'EditLocation',

  props: {
    location: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      valid: true,
      show: false,
      rules: {
        max: v => !v || v<=100 || 'Maximum 100 characters.',
      },
      position: {
        lat: 23.12911,
        lng: 113.264385,
      },
      location_m: '',
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'some invalid fields in location setting!', 'warn')
      return false
    },
    setPlace(place) {
      console.log(this.google)
      if (!place) return

      this.position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      this.location_m = place.formatted_address
      this.show = true
    }
    
  },

  mounted() {
    this.location_m = this.location
    
  }

}
</script>