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


## Redux vs Context API
