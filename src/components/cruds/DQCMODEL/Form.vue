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
        <va-card title="formulario de dqcmodel">
          <form>
            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input
                  v-model="requestObj.MODEL"
                  placeholder="DQCMODEL"
                  label="MODEL"
                  :error="!!modelErros.length"
                  :error-messages="modelErros"
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
import moment from 'moment'

export default {
  name: 'form-dqcmodel',
  mixins: [ApiForm],
  data () {
    return {
      modelErros: [],
      showModal: false,
      modalTitle: 'aviso',
      modalMessage: '',
    }
  },
  created () {
    this.requestObj.CREATE_DT = Date.now()
    this.requestObj.UPDATE_DT = Date.now()
    if (this.$route.params.id) {
      this.load(this.$route.params.id)
    }
  },
  watch: {
    'requestObj.MODEL' (value) {
      this.requestObj.MODEL = value.toUpperCase()
    },
  },
  computed: {
    showDate () {
      return this.requestObj.ID && this.requestObj.MODEL
    },
    formReady () {
      return !this.modelErros.length
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
    submit () {
      this.modelErros = this.requestObj.MODEL && (
        this.requestObj.MODEL.length >= 6 && this.requestObj.MODEL.length <= 10
      ) ? [] : ['Preenchimento obrigatorio, com texto entre 6 e 10 caracteres']
      this.requestObj.id = this.requestObj.ID
      if (!this.formReady) {
        return
      }
      this.save(this.showOk, this.showErr)
    },
    showOk (res) {
      if (res.status === 201) {
        this.reloadForm(res.data.id, 'O item foi salvo com sucesso!')
        return
      }
      this.reloadForm(this.requestObj.ID, res.data.message)
    },
    showErr (res) {
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
