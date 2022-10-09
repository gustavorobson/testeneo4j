<template>
  <b-card>
    <b-card-header class="borderless">
      <b-row align-h="between" align-v="center">
        <b-col>
          <b-card-title>Lista de Usuários</b-card-title>
        </b-col>
        <b-col class="text-right">
          <b-btn
            variant="success"
            class="tcs-btn"
            tabindex="1"
            @click="adicionarCadastro"
          >Adicionar Usuário</b-btn>
        </b-col>
      </b-row>
    </b-card-header>
    <ListaUsuario
      :atualizaTable="atualizaTable"
    >
    </ListaUsuario>
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
      <UsuarioAdicao
        @cancelar="cancelarCadastro"
        @ok="attTable"
      ></UsuarioAdicao>
    </b-modal>
  </b-card>
</template>

<script>
/* eslint-disable */
import UsuarioAdicao from "./Usuario/UsuarioAdicao.vue";
import ListaUsuario from "./Usuario/ListaUsuario.vue";


export default {
  name: "Home",
  data() {
    return {
      modalTitle: "",
      atualizaTable: 0,
    };
    
  },
  components: { UsuarioAdicao, ListaUsuario },
  methods: {
    adicionarCadastro: function() {
      this.modalTitle = "Cadastro de Usuário";
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
