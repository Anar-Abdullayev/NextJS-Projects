export async function getStaticProps() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    console.log("SSG called");

    return { props: { products } };
}

export default function Products({ products }) {
    console.log("SSG");
    return (
        <div style={{ padding: 20 }}>
            <h1>Static Products</h1>
            {
                products.map(p => (
                    <div key={p.id}>{p.title}</div>
                ))
            }
        </div>
    )
}