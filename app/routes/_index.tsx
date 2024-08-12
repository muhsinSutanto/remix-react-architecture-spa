import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, json } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix tutorial" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type MenuItem = {
  name: string;
  description: string;
};

type LoaderData = {
  data: {
    Data: MenuItem[];
  };
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = await fetch(`https://api.mudoapi.tech/menus?perPage=10&page=1`);
  return json(await url.json());
}

export default function Index() {
  const data = useLoaderData<LoaderData>();
  const { Data } = data?.data;

  console.log(data);
  return (
    <div className="font-sans p-4">
      <h1>hello</h1>
      {Data?.map((item: any) => (
        <div className="p-4">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <Link to={`/menu/${item.id}`}>see detail</Link>
        </div>
      ))}

      <button>Next</button>
    </div>
  );
}
