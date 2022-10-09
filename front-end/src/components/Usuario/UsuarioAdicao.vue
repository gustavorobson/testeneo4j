<template>
  <div id="form">
    <form>
      <b-form-group label="Nome:">
        <b-form-input v-model="form.nome"></b-form-input>
      </b-form-group>

      <b-form-group label="Email:">
        <b-form-input v-model="form.email"></b-form-input>
      </b-form-group>

      <b-form-group label="Senha:">
        <b-form-input type="password" v-model="form.senha"></b-form-input>
      </b-form-group>

      <b-form-group label="Cargo:">
        <b-form-input v-model="form.cargo"></b-form-input>
      </b-form-group>

      <b-form-group label="Salario:">
        <b-form-input v-model="form.salario"></b-form-input>
      </b-form-group>

      <b-form-group label="Setor:">
        <b-form-input v-model="form.setor"></b-form-input>
      </b-form-group>
    </form>
    <b-row align-h="between" class="pt-4">
      <b-col>
        <b-button type="button" variant="dark"  @click="cancelAdd">Cancelar</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button type="submit" @click="checkForm" variant="success"  >Salvar</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import swal from 'sweetalert';
/* eslint-disable */
import RestResourceUsuario from "../../services/index";



export default {
  name: "UsuarioAdicao",
  data() {
    return {
      msgSucesso: "",
      isUpdate: false,
      form: {
        nome: null,
        email: null,
        senha: null,
        cargo: null,
        salario: null,
        setor: null,
      },
    };
  },
  components: {},
  methods: {

    checkForm: async function () {
      if (this.form.nome && this.form.email && this.form.senha && this.form.cargo && this.form.salario && this.form.setor) {
        return this.salvaAndIsert();
      }else{
        swal({
          title: "Erro !",
          text: "Por favor preencher todos os campos !",
          icon: "error",
          buttons: 'cancelar'
        })
      }
    },

    async salvaAndIsert() {
      await RestResourceUsuario.post('usuario','insert', this.form).then(() =>{
        swal({
          title: "Sucesso",
          text: "O registro foi inserido com sucesso !",
          icon: "success",
          buttons: 'Ok'
        }).then(() => {
          this.$emit("ok")
        })
      },
      () => {
        swal({
          title: "Erro !",
          text: "Ocorreu um erro inesperado ao tentar inserir o registro !",
          icon: "error",
          buttons: 'cancelar'
        }).then(() => {
          this.$emit("ok")
        })
      })
    },

    cancelAdd() {
      this.$emit("cancelar");
    }
  },
  mounted() {}
};
</script>

<style>
</style>
