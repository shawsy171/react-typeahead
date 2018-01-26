import { Subject } from 'rxjs/Subject';

export const country$ = new Subject();

export const activeItem$ = new Subject();

export const checkKeyInput = (key, state) => {

  const { 
    activeItem, 
    countries,
    showList
  } = state;

  const keyPressAction = {
    ArrowUp: (prevState) => ({
      activeItem: prevState.activeItem - 1,
    }),
    ArrowDown: (prevState) => ({
      activeItem: prevState.activeItem + 1,
    }),
    Enter: () => ({
      search: countries[activeItem],
      selected: true,
      activeItem: -1,
      showList: false,
    })
  }

  if (key === 'ArrowUp' && activeItem >= 1) {
    return keyPressAction[key];
  } else if (key === 'ArrowDown' && activeItem <=countries.length - 2) {
    return keyPressAction[key]
  } else if (key === 'Enter' && showList && activeItem > -1) {
    return keyPressAction[key];
  }

  return state;
}
export default country$; 