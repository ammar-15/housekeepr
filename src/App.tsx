import LoginContainer from './Login.tsx'

function MyBody() {
  return (
    <main>
      <LoginContainer />
    </main>
  );
}

export default function MyApp() {
  return (
    <>
      <MyBody />
    </>
  );
}