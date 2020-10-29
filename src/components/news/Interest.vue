<template>
  <base-info-card title="My Interest">
    <v-list v-if="value.length > 0" class="py-0">
      <transition-group name="list-transit-fade" tag="div" class="list-transit">
        <template v-for="(item, i) in value" >
          <v-list-item
            :key="getKey(item)"
            class="px-0 list-transit-item"
            three-line
          >

            <v-list-item-content>
              <v-list-item-subtitle
                class=" subtitle-2 font-weight-bold text--primary mb-2"
                v-text="'- ' + toSubtitle(item.name)"
              />
              {{ item.description }}
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
    name: 'Interest',

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

    methods: {
      toSubtitle,
      getKey(item) {
        return item.name
      }
    },
  }
</script>
