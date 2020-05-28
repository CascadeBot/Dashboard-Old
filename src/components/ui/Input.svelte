<script>
  export let value = "";
</script>

<template>
  <div class="input-container">
    <label><slot /></label>
    <input type="text" bind:value={value}>
  </div>
</template>

<style lang="scss">
  @use "vars";

  .input-container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 20rem;
    padding: .4rem 1rem;
    background-color: vars.$ui_bg_2;
    border-radius: 5px;
    margin: 1rem 0;
    position: relative;

    label {
      color: vars.$text_color;
      font-size: .8em;
      position: absolute;
      top: .4rem;
      user-select: none;
    }

    input {
      padding-top: 1.1rem;
      background: transparent;
      border: none;
      font-size: 1rem;
      color: vars.$text_highlight;
      font-family: vars.$text_font, Arial, sans-serif;
    }
  }
</style>
