<template>
    <v-list-item class="py-1 px-0">
      <v-avatar
        class="mr-6"
        color="grey lighten-1"
        size="128"
      >
        <v-img :src=" avatar==='' ? require('@/assets/profile/defaultAvatar.jpg'): avatar " />
      </v-avatar>

      <v-list-item-content>
        <v-list-item-title
          class="mb-3 title text-uppercase"
          v-text="displayName"
        />
        <v-list-item-subtitle>
          <span class="pr-2">
            <v-icon small>mdi-briefcase</v-icon>
            <span class="text-with-icon">
              {{!simpleDescription ? 'Black Man' : toSubtitle(simpleDescription)}}
            </span>
          </span>
          <span>
            <v-icon small>mdi-map-marker</v-icon>
            <span class="text-with-icon">
              {{toSubtitle(location)}}
            </span>
          </span>
        </v-list-item-subtitle>
        <base-body
          :text=" !description ? 'this guy is lazy, and has not written anything': description "
          space="3"
        />
        

        <div>
          <a 
            :href="contact.url" 
            v-for="contact in contacts" 
            :key="contact.icon" 
            target="_blank" 
            class="text-decoration-none pl-2"
          >
            <v-icon
              class="px-2"
              small
              @click="() => {}"
              v-text="contact.icon"
            >
            </v-icon>
          </a>
        </div>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
  import {toSubtitle} from '@/utils/transform'

  export default {
    name: 'Author',

    props: {
      displayName: {
        type: String,
        default: '',
      },
      simpleDescription: {
        type: String,
        default: 'A lazy man',
      },
      description: {
        type: String,
        default: '',
      },
      avatar: {
        type: String,
        default: '',
      },
      location: {
        type: String,
        default: 'unknown, unknown',
      },
      email: {
        type: String,
        default: '',
      },
      contactFacebook: {
        type: String,
        default: '',
      },
      contactLinkedin: {
        type: String,
        default: '',
      },
      contactGithub: {
        type: String,
        default: '',
      }
    },

    data: () => ({
      icons: {
        email:'mdi-email',
        contactFacebook:'mdi-facebook',
        contactLinkedin:'mdi-linkedin',
        contactGithub:'mdi-github',
      },
    }),

    computed: {
      contacts () {
        let contacts = []
        for (let key in this.icons) {
          if (this.$props[key] !== '') {
            contacts.push({
              icon: this.icons[key],
              url: key === 'email' ? 'mailto:' + this.$props[key] : this.$props[key] 
            })
          }
        }
        return contacts
      }
    },
    methods: {
      toSubtitle
    },
  }
</script>
