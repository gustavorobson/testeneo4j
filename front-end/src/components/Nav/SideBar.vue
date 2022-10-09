<template>
  <div class="d-flex side-nav">
    <b-button v-b-toggle.sidebar-no-header class="mr-4">Navegação</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Navegação</h4>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item href="/" @click="hide">Lista de Usuários</b-nav-item>
              <b-nav-item href="/apontamentos" @click="hide">Apontamentos</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Voltar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { BSidebar } from 'bootstrap-vue'
export default {
    components: {
        BSidebar
    },
	data() {
		return {

		}
	},

	methods: {

	}
}

</script>

<style>

    .side-nav {
        width: 100%;
    }

</style>
