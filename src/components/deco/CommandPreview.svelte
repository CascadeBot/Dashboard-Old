<script>
  import Message from "./CommandPreviewMessage.svelte"

  export let deleteCommand = false;
  export let embeds = true;
  export let prefix = ";";

  export let userName = "";
  export let iconUrl = null;

  const botIconUrl = 'https://cdn.discordapp.com/avatars/488439593302097930/ff4b6d6b39abaf7421fab6a2553a1a2c.png?size=128';

  $: iconStyles = iconUrl ? `background-image: url('${iconUrl}')` : "";

  let botStyles = "background-image: url('https://cdn.discordapp.com/avatars/488439593302097930/ff4b6d6b39abaf7421fab6a2553a1a2c.png?size=128')"
</script>

<template>
<div class="command-preview-container">
  <Message deleted={deleteCommand} {prefix} time="12 minutes" {userName} {iconUrl}/>
  <Message botMessage={true} {prefix} time="12 minutes" embed={embeds} userName="Cascade" iconUrl={botIconUrl}/>
</div>
</template>

<style lang="scss">
  @use "vars";

  .command-preview-container {
    width: 25rem;
    max-width: 100%;

    border-radius: 10px;
    background-color: vars.$bg_150;
    padding: 2.5rem;

    transform-origin: top right;
    transform: scale(.85);
  }
</style>
