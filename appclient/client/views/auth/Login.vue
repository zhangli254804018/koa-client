<template>
  <div class="content has-text-centered">
    <h1 class="is-title is-bold">登錄管理系統</h1>
  
    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div v-show="error" style="color:red; word-wrap:break-word;" v-html="error"></div>
          <form v-on:submit.prevent="login">
            <label class="label">賬號(Email)</label>
            <p class="control">
              <input v-model="data.body.username" class="input" type="text" placeholder="email@example.org">
            </p>
            <label class="label">密碼(Password)</label>
            <p class="control">
              <input v-model="data.body.password" class="input" type="password" placeholder="password">
            </p>
  
            <p class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="data.rememberMe"> 記住我
              </label>
            </p>
  
            <hr>
            <p class="control">
              <button type="submit" class="button is-primary">登錄</button>
              <button class="button is-default">取消</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      data: {
        body: {
          username: null,
          password: null
        },
        rememberMe: false
      },
      error: null
    }
  },
  mounted() {
    if (this.$auth.redirect()) {
      console.log('Redirect from: ' + this.$auth.redirect().from.name)
    }
    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },
  methods: {
    login() {
      var redirect = this.$auth.redirect()
      var vm = this
      this.$auth.login({
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.data.body,
        rememberMe: this.data.rememberMe,
        redirect: { name: redirect ? redirect.from.name : 'Home' },
        success(res) {
          const response = res.data
          // console.log('Token: ' + this.$auth.token())
          // console.log(res)
          if (response.code === 0) {
            console.log('Auth Success')
          } else {
            vm.$auth.logout({
              redirect: 'login',
              makeRequest: false
            })
            this.error = response.msg
          }
        },
        error(err) {
          if (err.response) {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(err.response.status)
            // console.log(err.response.data)
            // console.log(err.response.headers)
            this.error = err.response.data
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message)
          }
          console.log(err.config)
        }
      })
    }
  }
  // filters: {
  //   json: function (value) {
  //     console.log(value)
  //     return value
  //   }
  // }

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
