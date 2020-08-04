<script>
  import ModalBase from "./Base.svelte";
  import Headline from "../Headline.svelte";
  import Button from "../Button.svelte";

  export let open = false;
</script>

<template>
  <ModalBase bind:open={open}>
    <Headline>Privacy settings</Headline>
    <p class="muted">Your privacy is important to us, if you wish to remove your account data. you can send us an email over at <span>privacy@cacadebot.org</span></p>
    <Button type="tertiary" full={true} big={true} on:click={()=>{open=false}}>Go back</Button>
  </ModalBase>
</template>

<style lang="scss">
  @use "vars";

  .muted {
    color: vars.$text_muted;
    line-height: 1.6;
    width: 90%;

    span {
      color: vars.$text_highlight;
    }
  }
</style>
