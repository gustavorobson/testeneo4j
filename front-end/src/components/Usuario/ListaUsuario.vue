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
          <b-button class="mr-1" variant="info" @click="visualizaDados(data.item.id)">Visualizar dados</b-button>
          <b-button class="mr-1" variant="warning" @click="editarUsuario(data.item.id)">Editar</b-button>
          <b-button class="mr-1" variant="danger" @click="apagaRegistro(data.item.id)">Excluir</b-button>
        </template>
      </b-table>
    </div>
    <b-modal
      ref="UsuarioExibicao"
      hide-backdrop
      hide-footer
      size="lg"
      title="Informações do Usuário"
    >
      <UsuarioExibicao
        :infoModal="infoModal"
        @cancelar="cancel"
      >
      </UsuarioExibicao>
    </b-modal>
    <b-modal  
      ref="UsuarioEdicao"
      hide-backdrop
      hide-footer
      size="lg"
      title="Edição de Registro"
    >
      <UsuarioEdicao
        :idModal="idModal"
        @cancelar="cancel"
        @ok="attTable"
      >
      </UsuarioEdicao>
    </b-modal>
  </b-container>
</template>

<script>
/* eslint-disable */
import UsuarioExibicao from './UsuarioExibicao.vue'
import UsuarioEdicao from './UsuarioEdicao.vue'
import swal from 'sweetalert';
import RestResourceUsuario from '../../services/index';


export default {
  name: "ListaUsuario",
  data() {
    return {
      fields: [
          {
            key: 'nome',
            label: 'Nome',
            sortable: false
          },
          {
            key: 'email',
            label: 'Email',
            sortable: false
          },
          {
            key: 'setor',
            label: 'Setor',
            sortable: false
          },
          {
            key: 'cargo',
            label: 'Cargo',
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

      
  components: { UsuarioExibicao, UsuarioEdicao },
  mounted() {
    this.buscaUsuarios();
  },

  watch: {
    atualizaTable() {
      this.buscaUsuarios();
    }
  },

  methods: {
    async buscaUsuarios() {
      this.isBusy = true;
      this.rows = await RestResourceUsuario.getAll('usuario',{}).then(el => 
        el.data.map(pessoa => ({
          nome: pessoa.nome,
          email: pessoa.email,
          setor: pessoa.setor,
          cargo: pessoa.cargo,
          salario: pessoa.salario,
          senha: pessoa.senha,
          id: pessoa.id,
        })
      ));
      this.isBusy = false;
    },

    apagaRegistro(id) {
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
          await RestResourceUsuario.delete('usuario','delete',id).then(() => {
            swal({
              title: "Sucesso",
              text: "O registro foi excluído com sucesso !",
              icon: "success",
              buttons: 'Ok'
            })
            this.buscaUsuarios();
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

    visualizaDados(id) {
      this.infoModal = this.rows.find(el => el.id == id);
      this.$refs.UsuarioExibicao.show();
    },

    editarUsuario(id) {
      this.idModal = this.rows.find(el => el.id == id);
      //this.idModal = id;
      this.$refs.UsuarioEdicao.show();
    },  

    cancel() {
      this.$refs.UsuarioExibicao.hide();
      this.$refs.UsuarioEdicao.hide();
    },

    attTable() {
      this.$refs.UsuarioEdicao.hide();
      this.buscaUsuarios();
    },

    async salvaAndUpdate() {
      await RestResourceUsuario.put('usuario','update', this.infoModal);
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
