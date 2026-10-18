import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default async function HomePage(){
  
  return(
    <main className="">
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
    </main>
  )
}
