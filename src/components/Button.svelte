<script>
  export let type = "primary";
</script>

<template>
  <button on:click class={type}>
    <slot></slot>
  </button>
</template>

<style lang="scss">
  @use 'vars';

  button {
    display: inline-block;
    border-radius: 5px;
    padding: .5rem 1.7rem;
    text-align: center;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &.primary {
      background-color: vars.$btn_primary;

      &:hover {
        background-color: vars.$btn_primary_hover;
      }

      &:active {
        background-color: vars.$btn_primary_active;
      }
    }

    &.secondary {
      background-color: vars.$btn_secondary;

      &:hover {
        background-color: vars.$btn_secondary_hover;
      }

      &:active {
        background-color: vars.$btn_secondary_active;
      }
    }

    &.tertiary {
      background-color: transparent;
      border: 1px solid vars.$bg_600;

      &:hover {
        background-color: vars.$bg_500;
      }

      &:active {
        opacity: .75;
      }
    }

    &.no-border {
      background-color: transparent;

      &:hover {
        background-color: vars.$bg_400;
      }

      &:active {
        opacity: .75;
      }
    }
  }
</style>
