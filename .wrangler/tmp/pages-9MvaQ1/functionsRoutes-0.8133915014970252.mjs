import { onRequestPost as __api_score_ts_onRequestPost } from "C:\\R_git\\Confoundle\\functions\\api\\score.ts"

export const routes = [
    {
      routePath: "/api/score",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_score_ts_onRequestPost],
    },
  ]