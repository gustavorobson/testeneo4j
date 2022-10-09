<template>
  <b-container fluid>
    <div>
      <b-table
        striped 
        hover 
        :items="rows" 
        :fields='fields' 
        show-empty
        empty-text="Não existem registros para serem exibidos"
        ref="tableInfo"
        :busy.sync="isBusy"
        >
        <template v-slot:table-busy class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Carregando...</strong>
        </template>
        <template v-slot:cell(editar)="data">
          <b-button class="mr-1" variant="warning" @click="editarApontamento(data.item.id)">Editar</b-button>
          <b-button class="mr-1" variant="danger" @click="apagaRegistro(data.item.id,data.item.nome)">Excluir</b-button>
        </template>
      </b-table>
    </div>
    <b-modal  
      ref="ApontamentoEdicao"
      hide-backdrop
      hide-footer
      size="lg"
      title="Edição de Registro"
    >
      <ApontamentoEdicao
        :idModal="idModal"
        @cancelar="cancel"
        @ok="attTable"
      >
      </ApontamentoEdicao>
    </b-modal>
  </b-container>
</template>

<script>
/* eslint-disable */
import ApontamentoEdicao from './ApontamentoEdicao.vue'
import swal from 'sweetalert';
import RestResource from '../../services/index';


export default {
  name: "ListaApontamentos",
  data() {
    return {
      fields: [
          {
            key: 'nome',
            label: 'Usuário',
            sortable: false
          },
          {
            key: 'dataEntrada',
            label: 'Data de Entrada',
            sortable: false
          },
          {
            key: 'dataSaida',
            label: 'Data de Saída',
            sortable: false
          },
          {
            key: 'editar',
            label: '',
            thStyle: 'width: 25%'
          },
        ],

        rows: [],
        infoModal: [],
        idModal:0,
        isBusy: false,
        
    };
    
  },
  props: {
    atualizaTable: {
      type: Number
    }
  },

      
  components: { ApontamentoEdicao },
  mounted() {
    this.buscaApontamentos();
  },

  watch: {
    atualizaTable() {
      this.buscaApontamentos();
    }
  },

  methods: {
    async buscaApontamentos() {
      this.isBusy = true;
      this.rows = await RestResource.getAll('apontamento',{}).then(el => 
        el.data.map(apontamento => ({
          id: apontamento.id,
          id_usuario: apontamento.id_usuario,
          nome: apontamento.nome,
          dataEntrada: apontamento.dataEntrada,
          dataSaida: apontamento.dataSaida,
        })
      ));
      this.isBusy = false;
    },

    apagaRegistro(id,nome) {
      swal({
        title: "Excluir Registro ?",
        text: "você não poderá reverter o processo !",
        icon: "warning",
        buttons: {
          cancel: 'Cancelar',
          confirm: {
            text: 'Sim, continue...',
            value: true
          }
        }
      }).then(async (value) => {
        if(value){
          await RestResource.delete('apontamento','delete',id,{nome}).then(() => {
            swal({
              title: "Sucesso",
              text: "O registro foi excluído com sucesso !",
              icon: "success",
              buttons: 'Ok'
            })
            this.buscaApontamentos();
        },
          () => {
            swal({
              title: "Erro !",
              text: "Ocorreu um erro inesperado ao tentar deletar o registro !",
              icon: "error",
              buttons: 'cancelar'
            }).then(() => {
              this.$emit("ok")
            })
          })
        }
      })
    },

    editarApontamento(id) {
      this.idModal = this.rows.find(el => el.id == id);
      this.$refs.ApontamentoEdicao.show();
    },  

    cancel() {
      this.$refs.ApontamentoEdicao.hide();
    },

    attTable() {
      this.$refs.ApontamentoEdicao.hide();
      this.buscaApontamentos();
    },

    async salvaAndUpdate() {
      await RestResource.put('apontamento','update', this.infoModal);
    }
  },
};
</script>

<style>
#home h1 {
  padding: 20px;
}

.children {
  background-color: rgba(233, 235, 236, 0.281);
  width: 50%;
  height: 25px;
  display: inline-block;
  margin-top: 8px;
}
</style>
