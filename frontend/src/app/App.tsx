interface User {
  name: string;
  age?: number;
}

const App = () => {
  const user: User = {
    name: 'Vlad',
    age: 18,
  };
  if (user.age) {
    console.log(user);
  }
  return <div>Hello, world!</div>;
};

export default App;
