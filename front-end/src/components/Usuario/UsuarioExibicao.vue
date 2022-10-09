<template>
  <div>
    <div>
    <div class="children"><strong>Nome:</strong> {{infoModal.nome}} </div>
    <div class="children"><strong>Email:</strong> {{infoModal.email}}</div>
    <div class="children"><strong>Senha:</strong> {{infoModal.senha}}</div>
    <div class="children"><strong>Cargo:</strong> {{infoModal.cargo}}</div>
    <div class="children"><strong>Salario:</strong> {{infoModal.salario}}</div>
    <div class="children"><strong>Setor:</strong> {{infoModal.setor}}</div>
    </div>
    <b-row align-h="between" class="pt-4">
    <b-col>
        <b-button type="button" variant="dark"  @click="cancel">Cancelar</b-button>
    </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	props: {
		infoModal: {
			type: Object,
		}
	},

	methods: {
		cancel() {
			this.$emit('cancelar')
		}
	}
}

</script>

<style>

</style>
