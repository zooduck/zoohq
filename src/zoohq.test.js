import zoohq from './zoohq';

let store;
describe('zoohq', () => {
    beforeAll(() => {
        store = {
            user: 'zooduck',
            lang: 'jp',
            settings: {
                geolocation: false
            }
        };
    })
    describe('store', () => {
        describe('setStore', () => {
            it('should set the store', () => {
                zoohq.setStore(store);

                const copyStore = store;

                expect(copyStore).toBe(store);
                expect(zoohq.store).not.toBe(store);
            });
        });
        describe('get store', () => {
            it('should return the modified store', () => {
                zoohq.setStore(store);

                expect(zoohq.store.user).toEqual('zooduck');
                expect(zoohq.store.lang).toEqual('jp');
                expect(zoohq.store.settings.geolocation).toEqual(false);
            });
        });
    });
    describe('actions', () => {
        describe('register', () => {
            it('should register an action', () => {
                const action = {
                    type: 'SET_READY',
                    callback: (_store) => { }
                };
                zoohq.register(action);

                expect(zoohq.actions.SET_READY).toBeTruthy();
            });
        });

        describe('dispatch', () => {
            it('should call the action callback with the updated store', () => {
                let storeUser;
                const action = {
                    type: 'SET_USER',
                    callback: (store) => {
                        storeUser = store.user;
                    }
                };
                zoohq.register(action);

                const updatedStoreData = {
                    user: 'koningVanEend'
                };
                zoohq.dispatch('SET_USER', updatedStoreData);

                expect(zoohq.actions.SET_USER).toBeTruthy();
                expect(zoohq.store.user).toEqual(storeUser);
                expect(zoohq.store.user).toEqual('koningVanEend');
            });

            it('should throw an error if the action type does not exist', () => {
                expect(() => {
                    zoohq.dispatch('BANANAS', {});
                }).toThrow('\"BANANAS\" is not a valid action type. Use zoohq.register({ type: \'BANANAS\', callback: () => {} ) to register the action first.');
            });
        });
    });

    describe('events', () => {
        describe('listen', () => {
            it('should add an eventListener for an action type', () => {
                const action = {
                    type: 'SAVE_SETTINGS',
                    callback: (_store) => { }
                };

                zoohq.register(action);

                const cb = jest.fn();

                zoohq.listen('SAVE_SETTINGS', cb);

                expect(cb).toHaveBeenCalledTimes(0);

                zoohq.dispatch('SAVE_SETTINGS');
                zoohq.dispatch('SAVE_SETTINGS');

                expect(cb).toHaveBeenCalledTimes(2);
            });
        });
    });
});
