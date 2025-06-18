
//SSR example

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    console.log("SSR called");

    return { props: {posts} };
}

export default function News({ posts }) {
    console.log("SSR");
    return (
        <div style={{ padding: 20 }}>
            <h1>News</h1>
            <ul>
                {
                    posts.map((p) => (
                        <li key={p.id}>{p.title}</li>
                    ))
                }
            </ul>
        </div>
    );
}