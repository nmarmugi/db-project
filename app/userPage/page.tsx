import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Carousel from "./components/Carousel";
import { Flex } from "@chakra-ui/react";

export default async function UserPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full overflow-hidden">
      <Flex display={{base: 'none', xl: 'flex'}} className="animate-scroll-x-infinit-1280 w-[1240px]">
        <Carousel />
      </Flex>
      <Flex display={{base: 'none', lg: 'flex', xl: 'none'}} className="animate-scroll-x-infinit-900 w-[900px]">
        <Carousel />
      </Flex>
      <Flex display={{base: 'none', md: 'flex', lg: 'none'}} className="animate-scroll-x-infinit-700 w-[700px]">
        <Carousel />
      </Flex>
      <Flex display={{base: 'flex', md: 'none'}}>
        <Carousel />
      </Flex>
    </div>
  );
}
