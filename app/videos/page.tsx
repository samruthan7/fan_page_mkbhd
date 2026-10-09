export default function VideosPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Latest Videos</h1>
      <div className="aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/videoseries?list=UUBJycsmduvYEL83R_U4JriQ"
          allowFullScreen
        />
      </div>
    </main>
  );
}
