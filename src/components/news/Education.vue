<template>
  <base-info-card title="Education Background">
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
                v-text="item.school"
              />
              <v-list-item-subtitle class="mb-2" >
                <v-icon small>mdi-clock-time-four</v-icon>
                <span class="text-with-icon">
                  {{ item.date }}
                </span>
                
              </v-list-item-subtitle>
              <v-list-item-subtitle
                class="font-weight-bold"
                v-text="toSubtitle(item.major)"
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
      <NewsEmptyInfo  />
    </v-fade-transition>
  </base-info-card>
</template>

<script>
  import EditList from '@/mixins/edit-list'
  import {toSubtitle} from '@/utils/transform'

  export default {
    name: 'Education',

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
        bachelor: require('@/assets/profile/edu/bachelor.png'),
        master: require('@/assets/profile/edu/master.png'),
        doctor: require('@/assets/profile/edu/doctor.png'),
        school: require('@/assets/profile/edu/school.jpg'),
        other: require('@/assets/profile/edu/other.jpg')
      }
    }),

    methods: {
      toSubtitle,
      getKey(item) {
        return this.toTimeStamp(item.date)+item.school+item.major
      },
      toTimeStamp(time) {
        time = time.split('-')
        return parseInt(time[0])*12*31+parseInt(time[1])*31+parseInt(time[2])
      }
    },
  }
</script>
