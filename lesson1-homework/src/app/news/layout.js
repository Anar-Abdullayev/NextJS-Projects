import Link from "next/link";

const newsData = [
  {
    id: 1,
    title: "Next.js 13 Released!",
    content:
      "Next.js 13 introduces new features and improvements for developers.",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "React 18 Features Explained",
    content:
      "Learn about the new features in React 18 and how they can benefit your applications.",
    date: "2023-10-02",
  },
  {
    id: 3,
    title: "Understanding Server Components",
    content:
      "A deep dive into server components and their role in modern web development.",
    date: "2023-10-03",
  },
];

export default function NewsLayout({ children }) {
  return (
    <div>
      <h1>News Articles</h1>
      <div className="flex">
        <div className="w-1/4 p-4">
          <ul>
            {newsData.map((article) => (
              <li key={article.id}>
                <Link href={`/news/${article.id}`}>
                  <h2>{article.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
