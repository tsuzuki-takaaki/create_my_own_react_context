export const createContext = () => {
  const useProvider = createProviderHook();
  const useSelector = createSelectorHook();
  return [useProvider, useSelector];
}

const createProviderHook = () => {
  return function(value) {
    //
  }
}

const createSelectorHook = () => {
  return function(value) {
    //
  }
}