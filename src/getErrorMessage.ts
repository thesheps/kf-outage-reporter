// Yes, TypeScript is *really* this dumb.
export default function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
