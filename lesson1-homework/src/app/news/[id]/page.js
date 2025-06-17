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

export default async function NewsDetail({ params }) {
  const { id } = await params;
  const news = newsData.find((article) => article.id == id);
  if (!news) {
    return <div>News article not found.</div>;
  }

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.content}</p>
      <small>{new Date(news.date).toLocaleDateString()}</small>
    </div>
  );
}
