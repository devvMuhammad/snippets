type SnippetOverviewProps = {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  lanugage: string;
  views: number;
  likes: number;
};

export default function SnippetOverview({
  title = "Omit and Partial in TypeScript",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, illo! Repellendus nesciunt fugit nostrum ducimus laboriosam voluptatibus, ipsam delectus, sed praesentium hic quo facere ab commodi fuga non repellat illo quod esse tempore totam? Aspernatur atque non quibusdam corrupti molestias quis enim. Deleniti mollitia corporis hic vel quidem incidunt illo?",
  createdAt = new Date(),
  // updatedAt=,
  lanugage = "typescript",
  views = 123,
  likes = 9,
}: Partial<SnippetOverviewProps>) {
  return <div className="w-[250px] p-2 bg-red-400">heyy</div>;
}
