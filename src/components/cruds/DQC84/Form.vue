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
        <va-card title="formulario de dqc84">
          <form>
            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-select
                  label="selectionar model"
                  v-model="selectedModel"
                  searchable
                  textBy="MODEL"
                  :noClear="noClearSelect"
                  :options="selectOptions"
                  :loading="selectLoading"
                  :error="!!modelErrors.length"
                  @focus.native="onFocus"
                />
                <va-input
                  v-model="requestObj.FAT_PART_NO"
                  placeholder="FAT_PART_NO"
                  label="FAT_PART_NO"
                  :error="!!fatPartErros.length"
                  :error-messages="fatPartErros"
                  removable
                >
                  <va-icon
                    slot="prepend"
                    color="gray"
                    name="vuestic-iconset vuestic-iconset-components"
                  />
                </va-input>
                <va-input
                  v-model="requestObj.TOTAL_LOCATION"
                  placeholder="TOTAL_LOCATION"
                  label="TOTAL_LOCATION"
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
  name: 'form-dqc84',
  mixins: [ApiForm],
  data () {
    return {
      fatPartErros: [],
      modelErrors: [],
      showModal: false,
      modalTitle: 'aviso',
      modalMessage: '',
      selectedModel: '',
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
    'requestObj.FAT_PART_NO' (value) {
      this.requestObj.FAT_PART_NO = value.toUpperCase()
    },
    'requestObj.MODEL' (newValue) {
      this.selectedModel = newValue
    },
  },
  computed: {
    ...mapState('dqc84', ['selectOptions']),
    showDate () {
      return this.requestObj.ID && this.requestObj.MODEL
    },
    formReady () {
      return !this.fatPartErros.length && !this.modelErrors.length
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
    ...mapActions('dqc84', ['setSelectOptions']),
    submit () {
      this.modelErrors = this.selectedModel ? [] : ['']
      this.fatPartErros = this.requestObj.FAT_PART_NO && (
        this.requestObj.FAT_PART_NO.length >= 10 && this.requestObj.FAT_PART_NO.length <= 15
      ) ? [] : ['Preenchimento obrigatorio, com texto entre 10 e 15 caracteres']
      this.requestObj.id = this.requestObj.ID
      this.requestObj.MODEL = this.selectedModel.ID
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
    saveOk (res) {
      if (res.status === 201) {
        this.reloadForm(res.data.id, 'O item foi salvo com sucesso!')
        return
      }
      this.reloadForm(this.requestObj.ID, res.data.message)
    },
    saveErr (res) {
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
