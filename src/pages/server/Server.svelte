<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onDestroy } from 'svelte';
  import { getClient, query } from 'svelte-apollo';
  import { gql } from "apollo-boost";
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

  const GUILDS_QUERY = gql`
    query {
      Guilds {
        id
        Meta {
          name
          iconURL
          memberCount
        }
      }
    }
  `

  let servers = [];
  const getData = (res) => {
    servers = res.data.Guilds;
  };

  let serverPromise;
  let unsub = query(getClient(), { query: GUILDS_QUERY }).subscribe((prom) => {
    serverPromise = prom;
    serverPromise.then(getData);
  });

  onDestroy(unsub);

  let isPermissionsActive;
  $: isPermissionsActive = path.startsWith("permissions");
</script>

<template>
	<Router url="{url}">
    <Wrapper>
      <div slot="sidenav">
        <Sidenav>
          {#await serverPromise}
            <p>Loading servers</p>
          {:then _}
            <SidenavDropdown {servers} {id}/>
          {/await}
          <SidenavCategory>
            <SidenavItem to="./">General</SidenavItem>
            <SidenavItem to="permissions" active={isPermissionsActive}>Permissions</SidenavItem>
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
