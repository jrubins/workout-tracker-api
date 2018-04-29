#!/bin/bash

echo "********** DEPLOYING ASSETS **********"
DEPLOY_BRANCH=$(git symbolic-ref --short -q HEAD)
DEPLOY_GIT="https://git.heroku.com/workouts-tracker.git"
echo "Deploy branch: $DEPLOY_BRANCH"
echo "Deploy git: $DEPLOY_GIT"
# Deploy to Heroku.
git push $DEPLOY_GIT $DEPLOY_BRANCH:master
echo -e "\n"
