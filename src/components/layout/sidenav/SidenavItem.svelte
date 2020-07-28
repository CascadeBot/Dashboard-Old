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
    <Link {to}><div class="icon"><Icon name={icon} /></div><slot /></Link>
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
      border-radius: 4px;
      margin-bottom: .3rem;

      &:hover {
        color: vars.$text_color;
        background-color: vars.$bg_150;
      }
    }

    &.active :global(a),
    :global(a[aria-current="page"]) {
      color: vars.$text_highlight !important;
      background-color: vars.$bg_200;
    }

    &.sub {
      :global(a > .icon) {
        display: none;
      }

      padding-left: 2.5rem;
    }

    :global(a > .icon) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 4px;
      color: vars.$icon_disabled;
      margin-right: .75rem;
      background-color: vars.$bg_300;
    }

    :global(a > .icon > .icon > svg) {
      height: .9rem;
      width: .9rem;
    }



    :global(a[aria-current="page"] > .icon),
    &.active :global(a > .icon) {
      color: vars.$icon_selected;
      background-color: vars.$ui_primary;
    }
  }
</style>
