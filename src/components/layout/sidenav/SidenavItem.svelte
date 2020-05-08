<script>
  import { Link } from "svelte-routing";
  import Icon from "../../Icon.svelte";

  export let icon = "send";
  export let to;
  export let sub = false;
  export let active = false;
</script>

<template>
  <div class="sidenav-item" class:sub={sub} class:active={active}>
    <Link {to}><Icon name={icon} /><slot /></Link>
  </div>
</template>

<style lang="scss">
  @use 'vars';

  .sidenav-item {
    :global(a), :global(a):focus, :global(a):visited {
      text-decoration: none;
      color: vars.$text_muted;
      padding: .4rem .75rem;
      display: flex;
      align-items: center;

      &:hover {
        color: vars.$text_color;
      }
    }

    &.active :global(a),
    :global(a[aria-current="page"]) {
      color: vars.$text_highlight
    }

    &.sub {
      :global(a > .icon) {
        display: none;
      }

      padding-left: 2.5rem;
    }

    :global(a > .icon) {
      color: vars.$icon_disabled;
      margin-right: .75rem;
    }

    :global(a[aria-current="page"] > .icon),
    &.active :global(a > .icon) {
      color: vars.$icon_selected;
    }
  }
</style>
