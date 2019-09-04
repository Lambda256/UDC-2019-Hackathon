<template>
    <v-toolbar
        :elevation = 5
    >
        <v-toolbar-title>Luniverse Hackathon</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn
                v-for="(link, i) in $store.state.Links"
                :key = "i"
                :to = "{name: link.routerName}"
                exact
                text
            >
                {{link.name}}
            </v-btn>
        </v-toolbar-items>
        <template v-if="isDates||isMerchandise" v-slot:extension>
        <v-tabs
          v-model="model"
          centered
          background-color="transparent"
        >
          <v-tab
            v-for="team in $store.state.Teams"
            :key="team"
            :href="`#tab-${team}`"
          >
            {{team}}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

</template>

<script>
export default {
    data () {
      return {
        model: 'tab-2',
      }
    },
    computed:{
        isDates () {
            return this.$route.name == 'dates'
        }, 
        isMerchandise () {
            return this.$route.name == 'merchandises'
        }
    }
    
}
</script>