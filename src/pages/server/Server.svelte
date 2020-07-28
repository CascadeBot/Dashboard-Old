<script>
  import { Router, Route } from "svelte-routing";
  import { getContext, setContext } from 'svelte';
  import { getClient } from 'svelte-apollo';
  import { makeCurrentGuildStore } from '../../state/currentGuild';
  import Wrapper from "../../components/layout/Wrapper.svelte";
  import Sidenav from "../../components/layout/sidenav/Sidenav.svelte";
  import SidenavCategory from "../../components/layout/sidenav/SidenavCategory.svelte";
  import SidenavItem from "../../components/layout/sidenav/SidenavItem.svelte";
  import SidenavDropdown from "../../components/layout/sidenav/SidenavDropdown.svelte";

  import General from "./General.svelte";
  import NotFound from "./404.svelte";

  export let url = "/server/:id";
  export let id;
  export let path;

  let servers = getContext("guilds");

  let currentGuild = makeCurrentGuildStore(getClient(), id);
  setContext("current", currentGuild);
  $: if (!$servers.loading) {
    currentGuild.guildData.setId($servers.data, id);
  }

  $: isPermissionsActive = path.startsWith("permissions");
</script>

<template>
	<Router url="{url}">
    <Wrapper>
      <div slot="sidenav">
        <Sidenav>
          <SidenavDropdown skeleton={$servers.loading} servers={$servers.data} {id}/>
          <SidenavCategory>
            <SidenavItem icon="cog" to="./">General</SidenavItem>
            <SidenavItem icon="cog" to="permissions" active={isPermissionsActive}>Permissions</SidenavItem>
            {#if isPermissionsActive}
              <SidenavItem to="permissions" sub={true}>Permission settings</SidenavItem>
              <SidenavItem to="permissions/groups" sub={true}>Groups</SidenavItem>
              <SidenavItem to="permissions/users" sub={true}>Users</SidenavItem>
            {/if}
            <SidenavItem to="access">Dashboard access</SidenavItem>
          </SidenavCategory>
          <SidenavCategory name="modules">
            <SidenavItem to="core">Core module</SidenavItem>
            <SidenavItem to="fun">Fun module</SidenavItem>
            <SidenavItem to="music">Music module</SidenavItem>
          </SidenavCategory>
        </Sidenav>
      </div>
			<Route path="/" component="{General}" />
			<Route component="{NotFound}" />
    </Wrapper>
	</Router>
</template>
