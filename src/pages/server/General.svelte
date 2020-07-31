<script>
  import { getContext, setContext } from 'svelte';

  import Section from "../../components/layout/Section.svelte"
  import Coltwo from "../../components/layout/coltwo.svelte"

  import Breadcrumb from "../../components/Breadcrumb.svelte"
  import Headline from "../../components/Headline.svelte"
  import Toggle from "../../components/ui/Toggle.svelte"
  import Button from "../../components/Button.svelte"
  import Input from "../../components/ui/Input.svelte"
  import Checkbox from "../../components/ui/Checkbox.svelte"
  import CommandPreview from "../../components/deco/CommandPreview.svelte"

  let currentGuild = getContext("current");
  $: stores = $currentGuild;
  $: gGeneral = stores.guildGeneral;
  $: gData = stores.guildData;

  let servers = getContext("guilds");
  $: stores.guildGeneral.fetch();

  let user = getContext("user");

  async function saveChanges() {
    guildGeneral.saveChanges(stores.$guildGeneral).then(() => {
      console.log("saving data");
    }).catch(e => {
      console.error(e);
    });
  }

  let check = false;
  $: isLoading = $gGeneral.loading || $gData.loading || $servers.loading;
</script>

<template>
  {#if isLoading}
    <Section skeleton={true}></Section>
  {:else}
    <Section>
      <Breadcrumb parts={[$gData.Meta.name, "General"]} />
      <Headline>General settings</Headline>
      <Coltwo>
        <div slot="left">
          <div class="block">
            <Input id="cascade-prefix" bind:value={$gGeneral.changes.prefix}>Prefix</Input>
            <Checkbox bind:checked={check}>Case sensitive prefix</Checkbox>
          </div>
          <Toggle bind:state={$gGeneral.changes.useEmbedForMessages}>Show embedded messages</Toggle>
          <Toggle bind:state={$gGeneral.changes.deleteCommand}>Delete message after command</Toggle>
          <Toggle bind:state={$gGeneral.changes.mentionPrefix}>Allow pinging of bot to be used as prefix</Toggle>
        </div>
        <div slot="right">
          <CommandPreview
            prefix={$gGeneral.changes.prefix}
            deleteCommand={$gGeneral.changes.deleteCommand}
            embeds={$gGeneral.changes.useEmbedForMessages}
            userName={$user.data.Discord.username}
            iconUrl={$user.data.Discord.avatarURL}
          />
        </div>
      </Coltwo>
      <br>
      {#if $gGeneral.hasChanges}
        <Button on:click={saveChanges}>Save</Button>
        <Button type="no-border" on:click={stores.guildGeneral.resetChanges}>Reset</Button>
      {/if}
    </Section>
  {/if}
</template>

<style lang="scss">
  .block {
    margin-bottom: 1.5rem;

    > :global(.input-container) {
      margin-top: 0;
      margin-bottom: .5rem;
    }
  }
  .long {
    height: 80vh;
  }
</style>
