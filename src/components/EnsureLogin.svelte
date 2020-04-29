<script>
  import { userStore } from '../state/store';
  import { getClient, query } from 'svelte-apollo';

  import { gql } from "apollo-boost";

  const USER_QUERY = gql`
    query {
      Me {
        Discord {
          username
        }
        Patreon {
          linked
          tier
        }
      }
    }
  `

  const client = getClient();
  const userQuery = query(client, { query: USER_QUERY })

  const user = userQuery.result().then((res) => {
    res.data.Me.loggedIn = true;
    userStore.set(res.data.Me);
  }).catch((err) => {
    window.location = `${WEB.API_URL}/auth/login`
  })
</script>
