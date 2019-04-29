<template>
  <div class="container">
	<ul>
	  <li v-for="(tag, index) in tags" :key="tag.name">
        <div @click="getTicketsByTag(tag.name)">{{ tag.name }}</div>
        <div>haha</div>
      </li>
	</ul>
  </div>
</template>

<script>
import getTickets from '@/utils/api'

export default {
  data () {
    return {
      tags: [
        { 'name': '去省会' }
      ],
      tickets: []
    }
  },

  methods: {
    getTicketsByTag (tagName) {
      console.log(tagName)
      getTickets({ q: tagName, offset: 0, limit: 20 }).then((response) => {
        this.data.tickets = response.data
      })
    }
  }
}
</script>

<style scoped>
</style>
