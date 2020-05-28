const matches = (obj, source) => {
  return Object.keys(source).every(key => {
    return obj.hasOwnProperty(key) && obj[key] === source[key]
  });
}

const defaultState = {
  loading: true,
  error: false,
  hasChanges: false,
  fetched: false
};

function changeStore(defaults, ctx = {}) {
  let state = {
    ...defaultState,
    data: {...defaults},
    changes: {...defaults}
  };

  let subID = 0;
  let subscribers = {};

  const subscribe = (cb) => {
    let id = subID;
    subscribers[id] = cb;
    subID++;
    cb(state);
    return unsubBuilder(id);
  }

  const sendUpdate = () => {
    for (let sub in subscribers) {
      subscribers[sub](state);
    }
  }

  const unsubscribe = (id) => {
    delete subscribers[id];
  }
  const unsubBuilder = (id) => {
    return () => unsubscribe(id);
  }

  const set = (newstate) => {
    state = newstate;
    state.hasChanges = !matches(state.changes, state.data);
    sendUpdate();
  }

  const update = (cb) => set(cb(state))

  return {
    ctx: () => ctx,
    get: () => state,
    set,
    update,
    subscribe,
    reset: () => {
      set({
        ...defaultState,
        data: {...defaults},
        changes: {...defaults}
      });
    },
    setFetched: (newData) => {
      update(v => ({
        ...v,
        data: {
          ...newData,
        },
        changes: {...newData},
        hasChanges: false,
        fetched: true,
        loading: false
      }));
    },
    resetChanges: (newData = {}) => {
      update(v => {
        v.changes = {...v.data};
        v.hasChanges = false;
        return {
          ...v,
          ...newData
        };
      });
    }
  }
}

module.exports = {
  changeStore
}
