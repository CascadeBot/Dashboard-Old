<script>
  import { getContext } from "svelte";

  import ModalBase from "./Base.svelte";
  import Headline from "../Headline.svelte";
  import Button from "../Button.svelte";
  import TierCard from "../other/TierCard.svelte";

  import ArrowLink from "../ui/ArrowLink.svelte";

  export let open = false;

  let user = getContext("user");
</script>

<template>
  <ModalBase size="medium" bind:open={open}>
    <Headline>Account</Headline>
    <div class="account">
      <div class="img" style={$user.data.Discord.avatarURL?`background-image:url('${$user.data.Discord.avatarURL}');`:""}></div>
      <div class="content">
        <p class="name">{$user.data.Discord.username}<span>#{$user.data.Discord.discriminator}</span></p>
        {#if $user.data.Discord.email}
          <p class="mail">{$user.data.Discord.email}</p>
        {/if}
      </div>
    </div>
    <Headline>Premium</Headline>
    <p class="muted">Open the gates to best control you'll have over your server. Custom scripts, elaborate music commands, custom bot branding and much more</p>
    <ArrowLink href="#">View premium benefits</ArrowLink>
    <TierCard tier={$user.data.Patreon.tier} linked={$user.data.Patreon.linked}/>
    <div class="center">
      <Button type="tertiary" long={true} big={true} on:click={()=>{open=false}}>Go back</Button>
    </div>
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

  .center {
    margin-top: 1rem;
    text-align: center;
  }

  .account {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #21242D;
    border-radius: 4px;
    margin-bottom: 2rem;

    .img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background-color: vars.$bg_500;
      margin-right: 1rem;
      background-size: cover;
      background-position: center;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        margin: 0;
      }

      .name {
        font-size: 1.2rem;
        color: vars.$text_highlight;
        span {
          color: vars.$text_color;
        }
      }

      .mail {
        color: vars.$text_muted;
      }
    }
  }
</style>
