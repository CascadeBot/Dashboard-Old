<script>
  import { getContext, setContext } from 'svelte';

  import Section from "../../components/layout/Section.svelte"
  import Breadcrumb from "../../components/Breadcrumb.svelte"
  import Headline from "../../components/Headline.svelte"
  import Toggle from "../../components/ui/Toggle.svelte"
  import Button from "../../components/Button.svelte"

  let { guildData, guildGeneral } = getContext("current");
  guildGeneral.fetch();

  let originalState = {
    embed: false,
    deleteAfter: false,
    mentionPrefix: false,
    first_render: true
  };
  let boolSettings;

  function toggleValue(path) {
    return (e) => {
      boolSettings[path] = e.detail;
    }
  }

  function resetBoolSettings() {
    boolSettings = {...originalState};
  }

  const matches = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);
  let isModified = false;

  $: if (!$guildGeneral.loading) {
    if (originalState.first_render) {
      originalState = {};
      originalState.embed = $guildGeneral.data.useEmbedForMessages;
      originalState.deleteAfter = $guildGeneral.data.deleteCommand;
      originalState.mentionPrefix = $guildGeneral.data.mentionPrefix;
      resetBoolSettings();
    }

    isModified = !matches(originalState, boolSettings);
  }
  resetBoolSettings();
</script>

<template>
  {#if $guildGeneral.loading}
    loading ...
  {:else}
    <Section>
      <Breadcrumb parts={[$guildData.Meta.name, "General"]} />
      <Headline>General settings</Headline>
      <Toggle state={boolSettings.embed} on:toggle={toggleValue("embed")}>Show embedded messages</Toggle>
      <Toggle state={boolSettings.deleteAfter} on:toggle={toggleValue("deleteAfter")}>Delete message after command</Toggle>
      <Toggle state={boolSettings.mentionPrefix} on:toggle={toggleValue("mentionPrefix")}>Show prefix when mentioning the bot</Toggle>
      <br>
      {#if isModified}
        <Button on:click={resetBoolSettings}>Reset</Button>
      {/if}
    </Section>
  {/if}
</template>
