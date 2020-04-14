const zoohq = (() => {
    const actions = {};
    let store = {};

    return {
        dispatch(type, data = undefined, useCallback = true) {
            store = {
                ...store,
                ...data
            };

            if (!useCallback) {
                return;
            }

            try {
                actions[type](store);

                const customEvent = new CustomEvent(type, {
                    detail: {
                        store: store
                    }
                });

                window.dispatchEvent(customEvent);
            } catch (err) {
                throw Error(`"${type}" is not a valid action type. Use zoohq.register({ type: '${type}', callback: () => {} ) to register the action first.\n`, err);
            }
        },
        listen(type, callback) {
            window.addEventListener(type, callback);
        },
        register(action) {
            const { type, callback } = action;

            actions[type] = callback;
        },
        setStore(initialStore) {
            store = {
                ...initialStore
            };
        },
        get actions() {
            return actions;
        },
        get store() {
            return store;
        }
    };
})();

export default zoohq;
