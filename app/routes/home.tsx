import type { Route } from "./+types/home";
import { loader, default as Welcome } from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "World Countries Explorer" },
    {
      name: "description",
      content: "Explore countries with search, filter, and sort features!",
    },
  ];
}

export { loader };

export default function home() {
  return (
    <>
      <Welcome />
    </>
  );
}
