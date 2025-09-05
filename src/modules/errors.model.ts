export class UserError extends Error {}

// Only lets safe errors through //
export const sanitizeError = (err: unknown): string => {
  if (err instanceof UserError) return err.message;
  if (err instanceof Error) return 'Internal server error';
  return 'Something went wrong';
};
