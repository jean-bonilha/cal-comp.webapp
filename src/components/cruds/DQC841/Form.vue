<template>
  <div class="form-elements">
    <va-modal
      v-model="showModal"
      position="top"
      :title="modalTitle"
      :message="modalMessage"
    />
    <div class="row">
      <div class="flex xs12">
        <va-card title="formulario de dqc841">
          <form>
            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-select
                  label="selectionar fat part no"
                  v-model="selectedFatPartNo"
                  searchable
                  textBy="FAT_PART_NO"
                  :noClear="noClearSelect"
                  :options="selectOptions"
                  :loading="selectLoading"
                  :error="!!selectErrors.length"
                  @focus.native="onFocus"
                />
                <va-input
                  v-model="requestObj.PARTS_NO"
                  placeholder="PARTS_NO"
                  label="PARTS NO"
                  :error="!!partsNoErrors.length"
                  :error-messages="partsNoErrors"
                  removable
                >
                  <va-icon
                    slot="prepend"
                    color="gray"
                    name="vuestic-iconset vuestic-iconset-components"
                  />
                </va-input>
                <va-input
                  v-model="requestObj.UNT_USG"
                  placeholder="UNT_USG"
                  label="UNT USG"
                  :error="!!untUsgNoErrors.length"
                  :error-messages="untUsgNoErrors"
                  removable
                >
                  <va-icon
                    slot="prepend"
                    color="gray"
                    name="vuestic-iconset vuestic-iconset-components"
                  />
                </va-input>
                <va-input
                  type="textarea"
                  v-model="requestObj.DESCRIPTION"
                  placeholder="DESCRIPTION"
                  label="DESCRIPTION"
                  :error="!!descriptionErrors.length"
                  :error-messages="descriptionErrors"
                  removable
                >
                  <va-icon
                    slot="prepend"
                    color="gray"
                    name="vuestic-iconset vuestic-iconset-components"
                  />
                </va-input>
                <va-input
                  type="textarea"
                  v-model="requestObj.REF_DESIGNATOR"
                  placeholder="REF_DESIGNATOR"
                  label="REF DESIGNATOR"
                  removable
                >
                  <va-icon
                    slot="prepend"
                    color="gray"
                    name="vuestic-iconset vuestic-iconset-components"
                  />
                </va-input>
              </div>
              <div v-if="showDate" class="flex md3 sm3 xs6">
                <va-input
                  v-model="createdAt"
                  label="CRIADO EM"
                  disabled
                >
                </va-input>
              </div>
              <div v-if="showDate" class="flex md3 sm3 xs6">
                <va-input
                  v-model="updatedAt"
                  label="ALTUALIZADO EM"
                  disabled
                >
                </va-input>
              </div>
            </div>
            <div class="row send-button">
              <va-button @click="submit">
                Salvar
              </va-button>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ApiForm } from 'vue-rest'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'form-dqc841',
  mixins: [ApiForm],
  data () {
    return {
      selectErrors: [],
      partsNoErrors: [],
      untUsgNoErrors: [],
      descriptionErrors: [],
      showModal: false,
      modalTitle: 'aviso',
      modalMessage: '',
      selectedFatPartNo: '',
      noClearSelect: true,
      selectLoading: false,
    }
  },
  created () {
    if (this.$route.params.id) {
      this.load(this.$route.params.id)
    }
  },
  watch: {
    'requestObj.PARTS_NO' (newValue) {
      this.requestObj.PARTS_NO = newValue.toUpperCase()
    },
    'requestObj.FAT_PART_NO' (newValue) {
      this.selectedFatPartNo = newValue
    },
  },
  computed: {
    ...mapState('dqc841', ['selectOptions']),
    showDate () {
      return this.requestObj.ID && this.requestObj.FAT_PART_NO
    },
    formReady () {
      return !this.selectErrors.length && !this.partsNoErrors.length && !this.untUsgNoErrors.length && !this.descriptionErrors.length
    },
    createdAt () {
      return moment(this.requestObj.CREATE_DT)
        .format('DD/MM/YYYY hh:mm:ss')
    },
    updatedAt () {
      return moment(this.requestObj.UPDATE_DT)
        .format('DD/MM/YYYY hh:mm:ss')
    },
  },
  methods: {
    ...mapActions('dqc841', ['setSelectOptions']),
    submit () {
      this.selectErrors = this.selectedFatPartNo ? [] : ['']
      this.partsNoErrors = this.requestObj.PARTS_NO && (
        this.requestObj.PARTS_NO.length >= 10 && this.requestObj.PARTS_NO.length <= 15
      ) ? [] : ['Preenchimento obrigatorio, com texto entre 10 e 15 caracteres']
      let untUsgTest = this.requestObj.UNT_USG
      untUsgTest = untUsgTest || untUsgTest === 0 ? untUsgTest.toString() : ''
      this.untUsgNoErrors = untUsgTest && (
        untUsgTest.match(/^\d+$/g)
      ) ? [] : ['Preenchimento obrigatorio, com numero']
      this.descriptionErrors = this.requestObj.DESCRIPTION && (
        this.requestObj.DESCRIPTION.length >= 5
      ) ? [] : ['Preenchimento obrigatorio, com pelo menos 5 caracteres']
      this.requestObj.id = this.requestObj.ID
      this.requestObj.FAT_PART_NO = this.selectedFatPartNo.ID
      if (!this.formReady) {
        return
      }
      this.save(this.saveOk, this.saveErr)
    },
    async onFocus () {
      this.selectLoading = true
      this.setSelectOptions(this.$axios.get)
        .then(() => {
          this.selectLoading = false
        })
    },
    async saveOk (res) {
      if (res.status === 201) {
        const idItem = res.data.id
        await this.reloadForm(res.data.id, 'O item foi salvo com sucesso!')
        this.$router.push({
          name: 'dqc841-edit',
          path: `dqc841/edit/${idItem}`,
          params: {
            route: 'dqc841',
            id: idItem,
          },
        })
        return
      }
      this.reloadForm(this.requestObj.ID, res.data.message)
    },
    saveErr (res) {
      this.load(res.data.id)
      this.modalMessage = 'Houve um erro ao tentar salvar as informacoes, provavelmente ja existe um item salvo igual a este.'
      this.showModal = true
    },
    reloadForm (id, message) {
      this.load(id)
      this.modalMessage = message
      this.showModal = true
    },
  },
}
</script>

<style>
</style>
