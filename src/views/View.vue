<template>
  <section :id="id">
    <v-row no-gutters>
      <v-col cols="12">
        <component
          :is="`section-${section}`"
          v-for="section in sections"
          :key="section"
          @message="addMessage"
          @lazy-message="addLazyMessage"
        />
      </v-col>
    </v-row>
    <v-snackbar
      v-model="showMessage"
      :color="message.color"
      :timeout="message.timeout"
      top
    >
      {{ message.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="showMessage = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script>
  const messageType = {
    'info': 'info',
    'success': 'success',
    'warn': 'orange',
    'error': 'error'
  }

  export default {
    name: 'BaseView',

    props: {
      id: {
        type: String,
        default: 'view',
      },
    },

    data: () => ({
      sections: [],
      showMessage: false,
      message: {text:'', color:'info', timeout:-1, lazy:false},
      messageList: [],
      switching:false
    }),

    watch: {
      showMessage(newVal, oldVal) {
        if (!newVal && oldVal) {
          this.switchMessage()
        }
      },
    },

    methods: {
      switchMessage() {
        if (this.switching || this.messageList.length === 0) return
        this.switching = true
        this.showMessage = false
        setTimeout(() => {
          this.message = this.messageList.pop()
          this.showMessage = true
          this.switching = false
          setTimeout(() => {
            let len = this.messageList.length
            if (len === 0 || this.messageList[len-1].lazy) return
            this.switchMessage()
          }, 200)
        }, 200)
      },
      addMessage(text, type='info', timeout=3000) {
        let message = {text, color:messageType[type], timeout, lazy:false}
        this.messageList.unshift(message)
        this.switchMessage()
      },
      addLazyMessage(text, type='info', timeout=3000) {
        let message = {text, color:messageType[type], timeout, lazy:true}
        this.messageList.unshift(message)
      },
    },
    
  }
</script>
