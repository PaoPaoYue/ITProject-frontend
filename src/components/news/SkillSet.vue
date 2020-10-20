<template>
  <base-info-card title="Skills Sets">
    <v-list class="py-0" v-if="!empty">
      <template v-for="(items, type, i) in value">
        <v-list-item
          :key="i"
          class="px-0"
          three-line
        >

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-uppercase subtitle-2 font-weight-bold text--primary mb-n2"
              v-text="titles[type]"
            />
            <br><br>
              <transition-group name="list-transit-delete" tag="div" class="list-transit d-flex flex-wrap">
                <v-col
                  v-for="(item,i) in items"
                  :key="getKey(item)"
                  cols="12"
                  sm="4"
                  class="list-transit-item"
                >
                  <base-list-item :text="toSubtitle(item)" >
                  <div >
                    <v-icon color="primary" v-if="edit"  @click.stop="deleteItem(value[type], i)">mdi-close</v-icon>
                  </div>
                  </base-list-item>

                </v-col>
              </transition-group>
          </v-list-item-content>
        </v-list-item>

        <v-divider :key="`divider-${i}`" />
      </template>
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
      value: {
        type: Object,
        default: () => ({
          field: [
          ],
          tech: [
          ],
          other: [
          ]
        }),
      },
    },

    computed: {
      empty() {
        return (!this.value.field || this.value.field.length === 0) &&
               (!this.value.tech  || this.value.tech.length === 0)  &&
               (!this.value.other || this.value.other.length === 0)
      }
    },

    methods: {
      toSubtitle,
      getKey(item) {
        return item
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
