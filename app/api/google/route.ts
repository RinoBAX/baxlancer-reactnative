import { GET_OAUTH_URL } from "@/app/utils/oAuthGoogle";

export async function POST(req: Request) {
  try {
    const { roles } = await req.json();
    console.log("roles", roles);
    if (!roles) {
      return Response.json(
        { error: "Roles parameter is missing" },
        { status: 400 }
      );
    }

    const backendOauthUrl = await GET_OAUTH_URL(roles);
    console.log("backendOauthUrl", backendOauthUrl);

    return Response.json({ redirectUrl: backendOauthUrl });
  } catch (error) {
    return Response.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
