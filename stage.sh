#!/usr/bin/env bash

LOGIN_APP_PATH=../xdcc-login
DEPLOY_BRANCH=staging

if ! git diff-index --quiet HEAD --; then
    echo "Commit changes before running the script"
    exit
fi

git co -b ${DEPLOY_BRANCH}

(cd ${LOGIN_APP_PATH}; bash deploy.sh)

git add .
git commit -m "deploy xdcc-webapp to heroku"
git push -f origin ${DEPLOY_BRANCH}

git co develop
git branch -D ${DEPLOY_BRANCH}

(cd ${LOGIN_APP_PATH}; grunt build)
