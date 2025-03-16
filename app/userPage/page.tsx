import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Carousel from "./components/Carousel";

export default async function UserPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
      <div className="w-full">
        <Carousel />
      </div>
  );
}
