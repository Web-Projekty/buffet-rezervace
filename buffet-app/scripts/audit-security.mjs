import { spawnSync } from "node:child_process";

const ignoredAdvisory = "GHSA-qwww-vcr4-c8h2";
const ignoredPackages = new Set(["react-router", "react-router-dom"]);
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const result = spawnSync(npmCommand, ["audit", "--json"], {
  encoding: "utf8",
});

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  process.stderr.write(result.stderr || result.stdout);
  process.exit(result.status || 1);
}

const remaining = Object.entries(report.vulnerabilities ?? {})
  .map(([name, vulnerability]) => {
    const via = (vulnerability.via ?? []).filter((item) => {
      if (typeof item === "string") {
        return !ignoredPackages.has(item);
      }

      return !item.url?.endsWith(ignoredAdvisory);
    });

    return [name, { ...vulnerability, via }];
  })
  .filter(([, vulnerability]) => vulnerability.via.length > 0);

if (remaining.length > 0) {
  process.stderr.write(
    `${JSON.stringify({
      ...report,
      vulnerabilities: Object.fromEntries(remaining),
    }, null, 2)}\n`,
  );
  process.exit(1);
}

process.stdout.write(
  `npm audit passed; ignored ${ignoredAdvisory} because this app does not use React Router RSC APIs.\n`,
);
