## About React Context
- https://react.dev/learn/passing-data-deeply-with-context
- https://qiita.com/ryokkkke/items/dc25111fcf52ea579d58
- https://www.freecodecamp.org/news/context-api-in-react/

> Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

バケツリレーをやめさせてくれる嬉しいやつ

```tsx
  <Section>
    <Heading level={3}>About</Heading>
    <Heading level={3}>Photos</Heading>
    <Heading level={3}>Videos</Heading>
  </Section>
```
↓
```tsx
  <Section level={3}>
    <Heading>About</Heading>
    <Heading>Photos</Heading>
    <Heading>Videos</Heading>
  </Section>
```
こうした時に`Section`からどうやって`level`の値を知るのか？

> But how can the `<Heading>` component know the level of its closest `<Section>`? That would require some way for a child to “ask” for data from somewhere above in the tree.
>
> You can’t do it with props alone. This is where context comes into play. You will do it in three steps:
>
> 1. Create a context. (You can call it LevelContext, since it’s for the heading level.)
> 2. Use that context from the component that needs the data. (Heading will use LevelContext.)
> 3. Provide that context from the component that specifies the data. (Section will provide LevelContext.)

必ずしも遠いchildrenでなくてもいい
特定の閉じたコンポーネント間でだけ使うこともできる(namespace的な？)

> even though you’re using the context, you have not provided it yet. React doesn’t know where to get it!
>
> If you don’t provide the context, React will use the default value you’ve specified in the previous step. In this example, you specified 1 as the argument to createContext, so useContext(LevelContext) returns 1, setting all those headings to `<h1>`. Let’s fix this problem by having each Section provide its own context.

```tsx
  import { LevelContext } from './LevelContext.js';

  export default function Section({ level, children }) {
    return (
      <section className="section">
        <LevelContext.Provider value={level}>
          {children}
        </LevelContext.Provider>
      </section>
    );
  }
```
↑ こんな感じでそれより下のcompoenentでuseContextを使った場合、namespace的な状態を作ることができる(componentによって値が変わる)

> This example uses heading levels because they show visually how nested components can override context. But context is useful for many other use cases too. You can pass down any information needed by the entire subtree: the current color theme, the currently logged in user, and so on.

colorテーマとかloginとかのグローバルで持つようなものにも全然使える

> How context works might remind you of CSS property inheritance. In CSS, you can specify color: blue for a `<div>`, and any DOM node inside of it, no matter how deep, will inherit that color unless some other DOM node in the middle overrides it with color: green. Similarly, in React, the only way to override some context coming from above is to wrap children into a context provider with a different value.

contextは下のコンポーネントで継承される(CSSと同じような感じ)
もし、overrideしたかったら異なる値でdataProviderを使うしかない

> In CSS, different properties like color and background-color don’t override each other. You can set all  `<div>`’s color to red without impacting background-color. Similarly, different React contexts don’t override each other. Each context that you make with createContext() is completely separate from other ones, and ties together components using and providing that particular context. One component may use or provide many different contexts without a problem.

contextが複数あっても、同じcontextでない限りは共存できる(color theme用のcontextとlogin用のcontextを共存させることももちろんできる)

- `Before you use context`
  - Start by passing props. If your components are not trivial, it’s not unusual to pass a dozen props down through a dozen components. It may feel like a slog, but it makes it very clear which components use which data! The person maintaining your code will be glad you’ve made the data flow explicit with props
  - Extract components and pass JSX as children to them. If you pass some data through many layers of intermediate components that don’t use that data (and only pass it further down), this often means that you forgot to extract some components along the way. For example, maybe you pass data props like posts to visual components that don’t use them directly, like <Layout posts={posts} />. Instead, make Layout take children as a prop, and render <Layout><Posts posts={posts} /></Layout>. This reduces the number of layers between the component specifying the data and the one that needs it.
  - **If neither of these approaches works well for you, consider context.**
- `Use cases for context`
  - Theming: If your app lets the user change its appearance (e.g. dark mode), you can put a context provider at the top of your app, and use that context in components that need to adjust their visual look.
  - Current account: Many components might need to know the currently logged in user. Putting it in context makes it convenient to read it anywhere in the tree. Some apps also let you operate multiple accounts at the same time (e.g. to leave a comment as a different user). In those cases, it can be convenient to wrap a part of the UI into a nested provider with a different current account value.
  - Routing: Most routing solutions use context internally to hold the current route. This is how every link “knows” whether it’s active or not. If you build your own router, you might want to do it too.
  - Managing state: As your app grows, you might end up with a lot of state closer to the top of your app. Many distant components below may want to change it. It is common to use a reducer together with context to manage complex state and pass it down to distant components without too much hassle.

> Context is not limited to static values. **If you pass a different value on the next render, React will update all the components reading it below!** This is why context is often used in combination with state.

↑ contextの値が変われば、それ以下のcomponentは再レンダリングする(ここでいうレンダリングはペインティングではなく、再計算の意味)

## Redux vs Context API (and Other state management library)
https://dev.to/ruppysuppy/redux-vs-context-api-when-to-use-them-4k3p
https://zenn.dev/luvmini511/articles/61e8e54853bc13


- Reduxは外部ストア的なのを1つしか持てない一方で、ContextAPIは複数持つことができる

- Jotai
  - https://jotai.org/docs/basics/comparison

> To tackle this issue with React context (useContext + useState), one would require many contexts and face some issues.

=> useContextとuseStateによるre-renderingを抑制するために生まれてるくさい

> Jotai takes a **bottom-up** approach with the atomic model, inspired by Recoil. One can build state combining atoms, and optimize renders based on atom dependency. This avoids the need for memoization.
