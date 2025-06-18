export async function getStaticProps() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  return {
    props: {
      user: data.results[0],
    },
    revalidate: 15,
  };
}

export default function RandomUserPage({ user }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Random User</h1>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <img
          src={user.picture.large}
          alt={fullName}
          style={{ borderRadius: '50%', width: 120, height: 120 }}
        />
        <h2>{fullName}</h2>
        <p>Email: {user.email}</p>
        <p>Location: {location}</p>
      </div>
    </div>
  );
}
