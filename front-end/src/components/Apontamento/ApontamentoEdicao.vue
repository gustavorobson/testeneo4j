<template>
  <div>
      <div>
      <b-form-group label="Usuario:">
        <b-form-select
          v-model="model.id_usuario"
          :options="usuario.options"
          :disabled="true"
        >
        <template slot="first">
          <option :value="null" disabled>-- Por favor, selecione uma opção --</option>
        </template>
      </b-form-select>
      </b-form-group>

      <b-form-group label="Data de Entrada:">
        <b-form-input type="datetime-local" v-model="model.dataEntrada"></b-form-input>
      </b-form-group>

      <b-form-group label="Data de Saída:">
        <b-form-input type="datetime-local" v-model="model.dataSaida"></b-form-input>
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
import RestResource from "../../services/index";

export default {
  data() {
    return {
      model: {
        id: null,
        id_usuario: null,
        dataEntrada: null,
        dataSaida: null,
      },

      usuario: {
        options: [],
        disabled: false
      },
    }
  },
  props: {
    idModal: {
      type: Object,
    }
  },

  mounted() {
    this.buscaUsuarios();
    this.populateModelForEdit(this.idModal);
  },

  methods: {
		cancel() {
			this.$emit('cancelar')
		},

    checkForm: async function () {
      if(this.model.dataSaida > this.model.dataEntrada)
        return this.salvaAndUpdate();
      else {
        swal({
          title: "Erro !",
          text: "Data de saída não pode ser menor que a de entrada!",
          icon: "error",
          buttons: 'cancelar'
        })
      }
    },

    async salvaAndUpdate() {
      await RestResource.put('apontamento','update', this.model).then(() =>{
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

    populateModelForEdit(apontamento) {
      this.model.id = apontamento.id;
      this.model.id_usuario = apontamento.id_usuario;
      this.model.dataEntrada = apontamento.dataEntrada;
      this.model.dataSaida = apontamento.dataSaida;    
    },

    async buscaUsuarios() {
      this.usuario.disabled = true;
      RestResource.getAll('usuario',{}).then(
        el => {
          this.usuario.options = el.data.map(usuario => {
            return { value: usuario.id, text: usuario.nome };
          });
        }
      );
      this.usuario.disabled = false;
    },
	}
}
</script>

<style>

</style>