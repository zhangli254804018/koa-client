<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
          <a :href="'https://github.com/' + repository">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
          </a>
          <!-- <a href="https://twitter.com/_fundon">
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
          </a> -->
        </p>
        <!-- <p><span class="icon"><i class="fa fa-code"></i></span> with <span class="icon"><i class="fa fa-heart"></i></span> by <a href="https://github.com/fundon">{{ author.name }}</a>.</p>
        <p>Code licensed under <a :href="'https://github.com/' + repository + '/blob/master/LICENSE'">{{ license }}</a>.</p> -->
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  data () {
    return this.$store.state.pkg
  },
   computed: {
    ...mapGetters({
      sidebar: 'sidebar'
    })
  }

}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/mixins';

.footer {
  // margin-left: 180px;
  
  @include mobile() {
    margin-left: 0;
  }
  
  .social a {
    border-bottom: none !important;
  }

  .fa.fa-heart {
    color: red;
  }
}
</style>
