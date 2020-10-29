<template>
  <base-info-card title="Achievement">
    <v-list v-if="value.length > 0" class="py-0">
      <transition-group name="list-transit-fade" tag="div" class="list-transit">
        <template v-for="(item, i) in value" >
          <v-list-item
            :key="getKey(item)"
            class="px-0 list-transit-item"
            three-line
          >
            <base-img
              :src="imgs[item.type]"
              class="mr-4"
              color="grey lighten-1"
              height="72"
              max-width="72"
            />

            <v-list-item-content>
              <v-list-item-subtitle
                class="text-uppercase subtitle-2 font-weight-bold text--primary mb-2"
                v-text="item.name"
              />
              <v-list-item-subtitle class="mb-2" >
                <v-icon small>mdi-clock-time-four</v-icon>
                <span class="text-with-icon">
                  {{ item.date }}
                </span>
                
              </v-list-item-subtitle>
              <v-list-item-subtitle
                class="font-weight-bold"
                v-text="toSubtitle(item.issuer)"
              />
            </v-list-item-content>
            <v-list-item-action>
              <v-icon color="primary" v-if="edit"  @click.stop="deleteItem(value, i)" >mdi-close</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="'divider'+getKey(item)" class="list-transit-item"/>
        </template>
      </transition-group>
    </v-list>
    <v-fade-transition v-else>
      <NewsEmptyInfo />
    </v-fade-transition>
  </base-info-card>
</template>

<script>
  import EditList from '@/mixins/edit-list'
  import {toSubtitle} from '@/utils/transform'

  export default {
    name: 'Achievement',

    mixins: [EditList],

    components: {
      NewsEmptyInfo: () => import('@/components/news/EmptyInfo'),
    },

    props: {
      value: {
        type: Array,
        default: () => [],
      },
    },

    data: () => ({
      imgs: {
        award: require('@/assets/profile/achieve/award.jpg'),
        publish: require('@/assets/profile/achieve/publish.jpg'),
      }
    }),

    methods: {
      toSubtitle,
      getKey(item) {
        return this.toTimeStamp(item.date)+item.name+item.issuer
      },
      toTimeStamp(time) {
        time = time.split('-')
        return parseInt(time[0])*12*31+parseInt(time[1])*31+parseInt(time[2])
      }
    },
  }
</script>