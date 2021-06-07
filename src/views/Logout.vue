<template>
  <div class="area">
    <div class="container">
      <div class="main">
        <div class="panel">
          <div class="panel-body">
            <h3>Logging out...</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Logout',
  mounted() {
    sessionStorage.removeItem('authenticated');

    this.$router.push({ name: 'login' });
  }
}
</script>

<style lang="scss" scoped>
  h1, h2, h3 {
    margin: 0px;
  }

  .text-center {
    padding: 10px;
    text-align: center;
  }

  hr {
    border: 1px solid #dedede;
  }

  .verform {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 10px;
    }

    &>input:last-child {
      margin-bottom: 0px;;
    }
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
    width: 400px;
    max-width: calc(100% - 30px);
    margin: auto;
  }
</style>