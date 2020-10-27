<template>
  <base-info-card title="Skills Sets">
    <v-list class="py-0" v-if="!empty">
        <v-list-item
          class="px-0"
          three-line
        >

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-uppercase subtitle-2 font-weight-bold text--primary mb-n2"
              v-text="titles.field"
            />
              <transition-group name="list-transit-delete" tag="div" class="list-transit d-flex flex-wrap">
                <v-col
                  v-for="(item,i) in field"
                  :key="getKey(item)"
                  cols="12"
                  sm="4"
                  class="list-transit-item"
                >
                  <base-list-item :text="toSubtitle(item)" >
                  <div >
                    <v-icon color="primary" v-if="edit"  @click.stop="deleteItem(field, i)">mdi-close</v-icon>
                  </div>
                  </base-list-item>

                </v-col>
              </transition-group>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item
          class="px-0"
          three-line
        >

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-uppercase subtitle-2 font-weight-bold text--primary mb-n2"
              v-text="titles.tech"
            />
              <transition-group name="list-transit-delete" tag="div" class="list-transit d-flex flex-wrap">
                <v-col
                  v-for="(item,i) in tech"
                  :key="getKey(item)"
                  cols="12"
                  sm="4"
                  class="list-transit-item"
                >
                  <base-list-item :text="toSubtitle(item)" >
                  <div >
                    <v-icon color="primary" v-if="edit"  @click.stop="deleteItem(tech, i)">mdi-close</v-icon>
                  </div>
                  </base-list-item>

                </v-col>
              </transition-group>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item
          class="px-0"
          three-line
        >

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-uppercase subtitle-2 font-weight-bold text--primary mb-n2"
              v-text="titles.other"
            />
              <transition-group name="list-transit-delete" tag="div" class="list-transit d-flex flex-wrap">
                <v-col
                  v-for="(item,i) in other"
                  :key="getKey(item)"
                  cols="12"
                  sm="4"
                  class="list-transit-item"
                >
                  <base-list-item :text="toSubtitle(item)" >
                  <div>
                    <v-icon color="primary" v-if="edit"  @click.stop="deleteItem(other, i)">mdi-close</v-icon>
                  </div>
                  </base-list-item>

                </v-col>
              </transition-group>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
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
    name: 'Skillset',

    mixins: [EditList],

    components: {
      NewsEmptyInfo: () => import('@/components/news/EmptyInfo'),
    },

    props: {
      field: {
        type: Array,
        default: () => []
      },
      tech: {
        type: Array,
        default: () => []
      },
      other: {
        type: Array,
        default: () => []
      }
    },

    computed: {
      empty() {
        return (!this.field || this.field.length === 0) &&
               (!this.tech  || this.tech.length === 0)  &&
               (!this.other || this.other.length === 0)
      }
    },

    methods: {
      toSubtitle,
      getKey(item) {
        return item.toLowerCase()
      }
    },

    data: () => ({
      titles: {
        field: "Knowledge Fields",
        tech: "Technology and Tools",
        other: "Other"
      }
    }),
  }
</script>
