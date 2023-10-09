const core = require("@actions/core");
const github = require("@actions/github");
const scanner = require("sonarqube-scanner");
try {
  scanner(
    {
      serverUrl: core.getInput("serverUrl"),
      token: core.getInput("token"),
      options: {
        "sonar.version": core.getInput("projectVersion"),
        "sonar.projectName": core.getInput("projectName"),
        "sonar.projectKey": core.getInput("projectKey"),
        "sonar.sources": core.getInput("sources"),
        "sonar.tests": core.getInput("tests"),
      },
    },
    () => {
      console.log("SonarQube analysis completed");
      core.setOutput("sonarqube-status", "success");
    }
  );
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (err) {
  core.setFailed(err.message);
}
