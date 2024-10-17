function MyHeading() {
  return (
      <div className="nav_container">
        <nav className="nav_heading">
          <h1>This is a heading</h1>
          <div className="nav_items">
            <ul>item1</ul>
            <ul>item2</ul>
            <ul>item3</ul>
            <ul>item4</ul>
          </div>
        </nav>
      </div>
  );
}
function button() {
  
}

function MyBody() {
  return (
    <main>
      <div className="body_class">
        <button className="button_class">This is a button</button>
        <p>this ia a sentence</p>
        <h2>{user.name}</h2>
        <img
        className="avatar"
        src={user.imageUrl}
        alt={'photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
      </div>
    </main>
  );
}
const user = {
  name: 'ammar',
  imageUrl: 'https://avatars.githubusercontent.com/u/71677758?v=4',
  imageSize: 90,
};

export default function MyApp() {
  return (
    <>
      <MyHeading />
      <MyBody />
    </>
  );
}