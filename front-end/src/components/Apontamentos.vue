<template>
  <b-card>
    <b-card-header class="borderless">
      <b-row align-h="between" align-v="center">
        <b-col>
          <b-card-title>Lista de Apontamentos</b-card-title>
        </b-col>
        <b-col class="text-right">
          <b-btn
            variant="success"
            class="tcs-btn"
            tabindex="1"
            @click="adicionarCadastro"
          >Adicionar Apontamento</b-btn>
        </b-col>
      </b-row>
    </b-card-header>
    <ListaApontamento
      :atualizaTable="atualizaTable"
    >
    </ListaApontamento>
    <b-modal
      size="lg"
      id="modalCadastro"
      ref="modalCadastro"
      :title="modalTitle"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      centered
    >
      <ApontamentoAdicao
        @cancelar="cancelarCadastro"
        @ok="attTable"
      ></ApontamentoAdicao>
    </b-modal>
  </b-card>
</template>

<script>
/* eslint-disable */
import ApontamentoAdicao from "./Apontamento/ApontamentoAdicao.vue";
import ListaApontamento from "./Apontamento/ListaApontamento.vue";


export default {
  name: "Apontamentos",
  data() {
    return {
      modalTitle: "",
      atualizaTable: 0,
    };
    
  },
  components: { ApontamentoAdicao, ListaApontamento },
  methods: {
    adicionarCadastro: function() {
      this.modalTitle = "Apontamento de Hora";
      this.$refs.modalCadastro.show();
    },

    cancelarCadastro() {
      this.$refs.modalCadastro.hide();
    },

    attTable() {
      this.$refs.modalCadastro.hide();
      this.atualizaTable++;
    }
  },
};
</script>

<style>
#home h1 {
  padding: 20px;
}
</style>
