<script>
  export let type = "primary";
  export let big = false;
  export let full = false;
  export let long = false;
</script>

<template>
  <button on:click class={type} class:big={big} class:long={long} class:full={full}>
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
    font-size: 14px;
    transition: transform 50ms ease-in-out;

    &:focus {
      outline: none;
    }

    &.big {
      padding: .8rem 1.9rem;
    }

    &.full {
      width: 100%;
    }

    &.long {
      min-width: 11rem;
    }

    &.primary {
      background-color: vars.$btn_primary;

      &:hover {
        background-color: vars.$btn_primary_hover;
      }

      &:active {
        transform: scale(1.05);
      }
    }

    &.secondary {
      background-color: vars.$btn_secondary;

      &:hover {
        background-color: vars.$btn_secondary_hover;
      }

      &:active {
        transform: scale(1.05);
      }
    }

    &.tertiary {
      background-color: vars.$btn_tertiary;

      &:hover {
        background-color: vars.$btn_tertiary_hover;
      }

      &:active {
        transform: scale(1.05);
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
