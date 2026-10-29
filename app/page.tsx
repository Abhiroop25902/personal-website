import Creations from "@/app/components/Creations";
import ProfileHeader from "@/app/components/ProfileHeader";

export default function Home() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-5xl flex-1 px-6 py-12 font-sans sm:px-8 sm:py-16">
      <ProfileHeader />
      <Creations />
    </main>
  );
}
