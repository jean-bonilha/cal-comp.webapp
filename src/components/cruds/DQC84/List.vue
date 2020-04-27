<template>
  <div>
    <va-modal
      v-model="showModal"
      position="top"
      :title="modalTitle"
      :message="modalMessage"
      :okText=" $t('modal.confirm') "
      :cancelText=" $t('modal.cancel') "
    />
    <va-card title="lista dqc84">
      <div class="row">
        <div class="flex">
          <va-button color="info" @click="loadItems"> ATUALIZAR</va-button>
          <va-button color="dark" @click="showItem"> NOVO</va-button>
        </div>
      </div>
      <va-data-table
        :fields="fields"
        :data="list"
        no-pagination
      >
        <template slot="actions" slot-scope="props">
          <va-button flat small color="gray" @click="editItem(props.rowData)" class="ma1">
            Editar
          </va-button>

          <va-button flat small color="danger" @click="deleteItem(props.rowData)" class="ma-0">
            Excluir
          </va-button>
        </template>
      </va-data-table>
    </va-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'list-dqc84',
  data () {
    return {
      loading: false,
      showModal: false,
      modalTitle: 'aviso',
      modalMessage: '',
    }
  },
  computed: {
    ...mapState('dqc84', ['list']),
    fields () {
      return [{
        name: 'ID',
        title: 'ID',
        width: '5%',
      }, {
        name: 'FAT_PART_NO',
        title: 'FAT PART NO',
        width: '20%',
      }, {
        name: 'MODEL',
        title: 'MODEL',
        width: '10%',
      }, {
        name: 'TOTAL_LOCATION',
        title: 'TOTAL LOCATION',
        width: '10%',
      }, {
        name: 'UPDATE_DT',
        title: 'ATUALIZADO EM',
        width: '20%',
      }, {
        name: 'CREATE_DT',
        title: 'CRIADO EM',
        width: '20%',
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
        width: '15%',
      }]
    },
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    ...mapActions('dqc84', ['setList', 'removeItem']),
    async loadItems (page = 0) {
      this.loading = true
      await this.setList(this.$axios.get)
      this.loading = false
    },
    editItem (item) {
      this.$router.push({
        name: 'dqc84-edit',
        path: `dqc84/edit/${item.ID}`,
        params: {
          route: 'dqc84',
          id: item.ID,
        },
      })
    },
    showItem () {
      this.$router.push({
        name: 'dqc84-create',
        params: {
          route: 'dqc84',
        },
      })
    },
    deleteItem (item) {
      this.removeItem({
        axiosDelete: this.$axios.delete,
        item,
      }).then(res => {
        if (res.status === 200) {
          this.modalMessage = 'O item foi excluido com sucesso da lista.'
          this.showModal = true
          this.setList(this.$axios.get)
        }
      })
    },
  },
}
</script>

<style>
  .send-button {
    display: flex;
    justify-content: right;
  }

  .data-table-server-pagination---avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
