<template>
  <div>
    <div class="flex xs12 xl6">
      <va-button-group>
        <va-button @click="downloadWithAxios" outline large color="info"> Baixar relatorio geral</va-button>
      </va-button-group>
    </div>
  </div>
</template>
<script>

export default {
  name: 'reports',
  data () {
    return {
      url: 'general-report',
    }
  },
  methods: {
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'general-report.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    downloadWithAxios () {
      this.$axios({
        url: this.url,
        responseType: 'arraybuffer',
      }).then(response => {
        console.log(response)
        this.forceFileDownload(response)
      }).catch(() => console.log('error occured'))
    },
  },
}
</script>
