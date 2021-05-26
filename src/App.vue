<template>
  <router-view/>
</template>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
  }

  body {
    margin: 0px;
    background: #DEDEDE;
    font-family: 'Roboto', sans-serif;

    .panel {
      display: inline-flex;
      flex-direction: column;

      .panel-body {
        width: 100%;
        background: #fafafa;
        border:1px solid #cacaca;
        padding: 10px;
      }
    }

    input {
      background: #fafafa;
      border:1px solid #cacaca;
      padding: 5px 10px;
      font-size: 14px;

      &:hover {
        background: #efefef;
      }

      &[type='submit'] {
        background: #eaeaea;
      }

      &[type='submit']:hover {
        cursor: pointer;
        background: #e0e0e0;
      }
    }

    a {
      color: #0b83ec;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
