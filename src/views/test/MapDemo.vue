<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYXli_wFaDCvsXoXlM4nzYO4Pfu8Q3rrU&libraries=places"></script>
<template>
  <div>
        <input
          id="pac-input"
          class="controls"
          type="text"
          placeholder="Search Box"
        >
        <div id="map"></div>
    </div>
</template>

<script>
  export default {
    methods:{
      initMap(mapid) {
        const map = new google.maps.Map(document.getElementById(mapid), {
          center: { lat: -0, lng: 160 },
          zoom: 1,
          streetViewControl: false,
          zoomControl:false,
          disableDoubleClickZoom:false,
          draggable:false,
          keyboardShortcuts:false,
          mapTypeControl:false,
          clickableIcons:false,
          fullscreenControl: false,
          gestureHandling: "none",
          mapTypeId: "roadmap",
          alt: "Location"
        }); //Options: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

        // Create the search box and link it to the UI element.
        const input = document.getElementById("pac-input");
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.setTypes(["(cities)"]) // check: https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete
        autocomplete.setFields(["geometry", "name", "address_components", "formatted_address"])//returned address restriction
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        autocomplete.addListener("place_changed", () => {
          const places = autocomplete.getPlace();
          if (places.length == 0) {
            return;
          }
          const bounds = new google.maps.LatLngBounds();
          const name = places.formatted_address
          //add marker
          if (places.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(places.geometry.viewport);
            } else {
              bounds.extend(places.geometry.location);
            }
          map.fitBounds(bounds);
          const locIcon="https://i.loli.net/2020/10/07/34gPrnf9YxK1kBV.png"
          const marker = new google.maps.Marker({
            position: places.geometry.location,
            map,
            title: "location",
            icon: locIcon
          });
          marker.setMap(map);
        });
        return name
      }
    },
      mounted(){
        const name = this.initMap("map");
      }
    }
    
</script> 

<style scoped>
div{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

#map{
  width: 30%;
  height: 80%;
}
</style>