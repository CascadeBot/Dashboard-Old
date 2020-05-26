<script>
  import Section from "../../components/layout/Section.svelte"
  import Breadcrumb from "../../components/Breadcrumb.svelte"
  import Headline from "../../components/Headline.svelte"
  import Toggle from "../../components/ui/Toggle.svelte"
  import Button from "../../components/Button.svelte"

  let originalState = {
    embed: true,
    deleteAfter: false,
    mentionPrefix: false
  }

  let boolSettings;

  function resetBoolSettings() {
    boolSettings = {...originalState};
  }

  const matches = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);
  $: isModified = !matches(originalState, boolSettings);

  resetBoolSettings();
</script>

<template>
  <Section>
    <Breadcrumb parts={["Cascade official server", "General"]} />
    <Headline>General settings</Headline>
    <Toggle state={boolSettings.embed} on:toggle={({detail}) => boolSettings.embed = detail}>Show embedded messages</Toggle>
    <Toggle state={boolSettings.deleteAfter} on:toggle={({detail}) => boolSettings.deleteAfter = detail}>Delete message after command</Toggle>
    <Toggle state={boolSettings.mentionPrefix} on:toggle={({detail}) => boolSettings.mentionPrefix = detail}>Show prefix when mentioning the bot</Toggle>
    <br>
    {#if isModified}
      <Button on:click={resetBoolSettings}>Reset</Button>
    {/if}
  </Section>
</template>
