/**
 * Unwraps CommonJS modules that Vite exposes as a nested default export.
 */
export function unwrapDefault<T>(module: T): T {
  if (
    typeof module === "object" &&
    module !== null &&
    "default" in module
  ) {
    return (module as { default: T }).default;
  }

  return module;
}
