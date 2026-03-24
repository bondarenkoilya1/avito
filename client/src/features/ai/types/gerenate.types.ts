export type GenerateResponseType = {
  model: string;
  created_at: string;
  response: string;
  thinking: string;
  done: boolean;
  done_reason: string;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
  logprobs: {
    token: string;
    logprob: number;
    bytes: number[];
    top_logprobs: {
      token: string;
      logprob: number;
      bytes: number[];
    }[];
  };
};

export type SimplifiedGenerateResponseType = string;

export type GenerateRequestType = {
  model: string;
  prompt: string;
};
