#!/usr/bin/env bash

export TAG="${TRAVIS_TAG}"
export COMMIT="${TRAVIS_COMMIT}"
export BRANCH="${TRAVIS_BRANCH}"
export PR="${TRAVIS_PULL_REQUEST}"
export NODE_ENV="production"
DOMAIN="https://hfr-sl-api-dev.ehealthafrica.org"
export API_URL="${DOMAIN}/api/v1/"
export AUTH_API_URL="${DOMAIN}/api-auth/v1/"

if [ -n "${PR}" ]; then
    if [[ "${PR}" != 'false' ]]; then
        echo "pull request, not deploying"
        exit 0
    fi
fi


if [[ "${BRANCH}" == "develop" ]] || [[ "${BRANCH}" == "master" ]] || [ -n "${TAG}" ]; then
    npm run dhis2
    cd dhis2
    curl -X POST -u ${DHIS2_USER}:${DHIS2_PASS} -F file=@dhis2.zip ${DHIS2_HOST}/api/26/apps
fi
