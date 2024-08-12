import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type loaderData = {
  data: {
    name: string;
  };
};

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(`https://api.mudoapi.tech/menu/${params.id}`);
  return json(await url.json());
}

export default function MenuDetail() {
  const res = useLoaderData<loaderData>();
  const { data } = res;

  return (
    <div>
      <h1>{data?.name}</h1>
    </div>
  );
}
