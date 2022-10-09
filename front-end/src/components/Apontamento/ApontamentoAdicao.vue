<template>
  <div id="form">
    <form>
      <b-form-group label="Usuario:">
        <b-form-select
          v-model="model.id_usuario"
          :options="usuario.options"
          :disabled="usuario.disabled"
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
import RestResource from "../../services/index";



export default {
  name: "ApontamentoAdicao",
  data() {
    return {
      msgSucesso: "",
      isUpdate: false,
      model: {
        id_usuario: null,
        dataEntrada: null,
        dataSaida: null,
      },

      usuario: {
        options: [],
        disabled: false
      },

    };
  },
  components: {},
  mounted() {
    this.buscaUsuarios();
  },

  methods: {

    checkForm: async function () {
      if (this.model.id_usuario != null && this.model.dataEntrada && this.model.dataSaida) {
        if(this.model.dataSaida > this.model.dataEntrada)
          return this.salvaAndIsert();
        else {
          swal({
            title: "Erro !",
            text: "Data de saída não pode ser menor que a de entrada!",
            icon: "error",
            buttons: 'cancelar'
          })
        }
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
      await RestResource.post('apontamento','insert', this.model).then(() =>{
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
  },
};
</script>

<style>
</style>
