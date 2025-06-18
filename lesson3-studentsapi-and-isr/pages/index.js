import Link from "next/link";

export default function Home(){
    return (
        <>
            <h1>Next.js Render Types examples</h1>
            <ul>
                <li>
                    <Link href="/students">Open Students API task</Link>
                </li>
                <li>
                    <Link href="/randomuser">Open Random User task</Link>
                </li>
                <li>
                    <Link href="/news"><del>SSR : Server Side Rendering</del></Link>
                </li>
                <li>
                    <Link href="/products"><del>SSG : Server Side Generation</del></Link>
                </li>
    
                <li>
                    <Link href="/posts"><del>ISR Revalidate</del></Link>
                </li>
    
            </ul>
        </>
    )
}
