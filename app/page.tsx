import Image from "next/image";
import { NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export default function Home() {
  async function createInvoice(formData: FormData) {
    "use server";

    const rawFormData = {
      API_KEY: formData.get("APIKey"),
      API_SECRET: formData.get("APISecret"),
    };
    let jsonStr = JSON.stringify(rawFormData);
    cookies().set("data", jsonStr);
  }

  return (
    <form action={createInvoice}>
      <div>
        <label>API Key</label>
        <input type="text" name="APIKey" />
      </div>
      <div>
        <label>API Secret </label>
        <input type="text" name="APISecret" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
