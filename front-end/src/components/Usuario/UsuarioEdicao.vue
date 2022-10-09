<template>
  <div>
      <div>
      <b-form-group label="Nome:">
        <b-form-input v-model="model.nome" ></b-form-input>
      </b-form-group>
      <b-form-group label="Email:">
        <b-form-input v-model="model.email" ></b-form-input>
      </b-form-group>
      <b-form-group label="Senha:">
        <b-form-input type="password" v-model="model.senha" ></b-form-input>
      </b-form-group>
      <b-form-group label="Cargo:">
        <b-form-input v-model="model.cargo" ></b-form-input>
      </b-form-group>
      <b-form-group label="Salário:">
        <b-form-input v-model="model.salario" ></b-form-input>
      </b-form-group>
      <b-form-group label="Setor:">
        <b-form-input v-model="model.setor" ></b-form-input>
      </b-form-group>
    </div>
    <b-row align-h="between" class="pt-4">
      <b-col>
        <b-button type="button" variant="dark"  @click="cancel">Cancelar</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button type="submit" @click="checkForm" variant="success">Salvar</b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import swal from 'sweetalert';
import RestResourceUsuario from "../../services/index";

export default {
  data() {
    return {
      model: {
        id: null,
        nome: null,
        email: null,
        senha: null,
        cargo: null,
        salario: null,
        setor: null,
      }
    }
  },
  props: {
    idModal: {
      type: Object,
    }
  },

  mounted() {
    this.populateModelForEdit(this.idModal);
  },

  methods: {
		cancel() {
			this.$emit('cancelar')
		},

    checkForm: async function () {
      if (this.model.nome && this.model.email && this.model.senha && this.model.cargo && this.model.salario && this.model.setor) {
        return this.salvaAndUpdate();
      }else{
        swal({
          title: "Erro !",
          text: "Por favor preencher todos os campos !",
          icon: "error",
          buttons: 'cancelar'
        })
      }
    },

    async salvaAndUpdate() {
      await RestResourceUsuario.put('usuario','update', this.model).then(() =>{
        swal({
          title: "Sucesso",
          text: "O registro foi atualizado com sucesso !",
          icon: "success",
          buttons: 'Ok'
        }).then(() => {
          this.$emit("ok")
        })
      },
      () => {
        swal({
          title: "Erro !",
          text: "Ocorreu um erro inesperado ao tentar atualizar o registro !",
          icon: "error",
          buttons: 'cancelar'
        }).then(() => {
          this.$emit("ok")
        })
      })
    },

    populateModelForEdit(usuario) {
      this.model.id = usuario.id;
      this.model.nome = usuario.nome;
      this.model.email = usuario.email;
      this.model.senha = usuario.senha;
      this.model.cargo = usuario.cargo;
      this.model.salario = usuario.salario;
      this.model.setor = usuario.setor;      
    },
	}
}
</script>

<style>

</style>