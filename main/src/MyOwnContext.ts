export const createContext = (initialValue: any) => {
  const context = {
    value: initialValue,
  }
  // useProvider continously writes the latest received value to the context
  const useProvider = createProviderHook(context);
  // useSelector continuously reads the latest value from it.
  const useSelector = createSelectorHook(context);
  return [useProvider, useSelector];
}

const createProviderHook = (context: { value: any }) => {
  return function(value: any) {
    context.value = value;
  }
}

const createSelectorHook = (context: { value: any }) => {
  return function(select: any) {
    return select(context.value)
  }
}