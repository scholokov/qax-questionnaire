<template>
  <div class="area">
    <div class="container">
      <div class="main">
        <div class="panel">
          <div class="panel-body">
            <div id="nav">
              <router-link to="/">Home</router-link> |
              <router-link to="/login">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style lang="scss">
  h1, h2, h3 {
    margin: 0px;
  }

  hr {
    border: 1px solid #dedede;
  }

  .area {
    display: flex;
    padding: 10px;

    .container {
      display: flex;
    }

    .main {
      flex-grow: 1;
      margin-right: 10px;
    }
    .panel {
      width: 100%;
    }
  }

  .container {
    width: 900px;
    max-width: calc(100% - 30px);
    margin: auto;
  }
</style>