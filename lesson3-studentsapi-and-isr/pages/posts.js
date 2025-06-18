
//SSR example

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    console.log("ISR called");
    return { props: {posts},revalidate:10 };
}

export default function Posts({ posts }) {
    console.log("ISR");
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