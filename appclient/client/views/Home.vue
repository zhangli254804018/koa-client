<template>
  <div class="content has-text-centered">
    <p>
      <img width="200" src="~assets/logo.svg" :alt="description">
    </p>

    <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

    <!-- <p>
      <strong>{{ description }}</strong>,
      <a :href="homepage">在線演示UI</a>
    </p> -->

    <p>前端基於：Vue2.0 & bulma 0.3</p>
    <p>接口支持：Koa2.0</p>
  </div>
</template>

<script>
export default {

  data () {
    return this.$store.state.pkg
  }

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
  &.is-bold{
    margin-top: 3em;
  }
}
</style>
