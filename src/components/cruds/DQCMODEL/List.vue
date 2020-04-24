<template>
  <va-card :title="$t('tables.serverSidePagination')">
    <va-data-table
      :fields="fields"
      :data="list"
      :loading="loading"
      :totalPages="totalPages"
      @page-selected="readItems"
      api-mode
    >
      <template slot="avatar" slot-scope="props">
        <img :src="props.rowData.avatar" class="data-table-server-pagination---avatar">
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'list-dqcmodel',
  data () {
    return {
      perPage: 3,
      totalPages: 0,
      loading: false,
      withIcon: '',
      instructions: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      ],
      createdAt: 'Data da criação',
      updatedAt: 'Data da última atualização',
    }
  },
  computed: {
    ...mapState('dqcmodel', ['list']),
    fields () {
      return [{
        name: 'ID',
        title: 'ID',
        width: '2%',
      }, {
        name: 'MODEL',
        title: 'MODEL',
        width: '60%',
      }, {
        name: 'UPDATE_DT',
        title: 'ATUALIZADO EM',
        width: '20%',
      }, {
        name: 'CREATE_DT',
        title: 'CRIADO EM',
        width: '20%',
      }]
    },
  },
  methods: {
    ...mapActions('dqcmodel', ['setList']),
    readItems (page = 0) {
      this.setList(this.$axios.get)
    },
  },
  async mounted () {
    this.loading = true
    await this.readItems()
    this.loading = false
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
