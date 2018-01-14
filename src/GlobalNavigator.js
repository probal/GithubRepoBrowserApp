import { NavigationActions } from 'react-navigation';

let navigator;

export function setNavigator(nav) {
   navigator = nav;
}

export function navigateTo(routeName, params) {
   if (navigator) { 
      navigator.dispatch(NavigationActions.navigate({routeName, params}));
   }
}

export function navigationResetTo(routeName, params) {
    if(navigator) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: routeName, params })],
          });
          navigator.dispatch(resetAction);
    }
}