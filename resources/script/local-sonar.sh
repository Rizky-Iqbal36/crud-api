#!/bin/bash
# Run Local Sonar Scanner
. .env
LOCAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo $LOCAL_BRANCH
if [[ -z "${LOCAL_SONAR_TOKEN}" ]]; then
    echo "env variable LOCAL_SONAR_TOKEN not defined"
else
    sonar-scanner \
    -Dsonar.projectName=$(node -e "console.log(require('./package.json').name)") \
    -Dsonar.projectVersion=$(node -e "console.log(require('./package.json').version)") \
    -Dsonar.host.url=http://localhost:9000 \
    -Dsonar.login=$LOCAL_SONAR_TOKEN \
    # -Dsonar.branch.name=$LOCAL_BRANCH
fi