export interface Message {
  id: string
  username: string
  timestamp: string
  text: string
  avatar: string
  codeSnippet?: {
    filename: string
    language: string
    code: string
  }
  reactions?: { emoji: string; count: number }[]
  pipelineCard?: {
    title: string
    status: string
    progress: number
  }
}

export const messages: Message[] = [
  {
    id: "1",
    username: "sarah_dev",
    timestamp: "10:42 AM",
    text: "Hey team, I've just pushed the new refactor for the auth middleware. It uses the new session strategy we discussed in the sync. Here is a snippet of the core logic:",
    avatar: "",
    codeSnippet: {
      filename: "auth_middleware.rs",
      language: "rust",
      code: `pub async fn validate_token(req: Request) -> Result<User, Error> {
    // Extract Bearer token from headers
    let auth_header = req.headers().get("Authorization")?;
    let claims = decode_jwt(auth_header.to_str()?)?;
    match claims.status {
        ClaimStatus::Active => Ok(claims.user),
        _ => Err(Error::Unauthorized),
    }
}`,
    },
    reactions: [
      { emoji: "⚡", count: 4 },
      { emoji: "♡", count: 2 },
    ],
  },
  {
    id: "2",
    username: "alex_ops",
    timestamp: "10:45 AM",
    text: "Looks solid Sarah! Running the CI/CD pipeline now to check for any regression on the staging environment.",
    avatar: "",
    pipelineCard: {
      title: "CI Pipeline #2401",
      status: "In Progress (92%)",
      progress: 92,
    },
  },
]
