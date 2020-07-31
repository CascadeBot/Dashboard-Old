<script>
  import { Link } from "svelte-routing";
  import Logo from "../../Logo.svelte";
  import Label from "../../ui/Label.svelte";
</script>

<template>
  <div>
    <Link to="/">
      <Logo />
      <p>Cascade</p>
      <Label>Beta</Label>
    </Link>
  </div>
</template>

<style lang="scss">
  @use "vars";

  div {
    display: inline-flex;
    align-items: center;
    :global(a) {
      display: inline-flex;
      align-items: center;

      text-decoration: none;
      color: vars.$text_highlight;
      padding: .2rem .5rem;
      padding-left: 0;

      &:hover {
        color: vars.$text_color;
      }
    }

    p {
      font-family: vars.$heading_font;
      font-weight: bold;
      margin: 0 .5rem 0 1rem;
    }
  }
</style>
