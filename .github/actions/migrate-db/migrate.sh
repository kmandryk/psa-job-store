#!/bin/bash

ENVIRONMENT=$1
OPENSHIFT_SERVER=$2
DEV_TOKEN=$3
export DATABASE_URL=$4

#Log in to OpenShift
echo "Deploying to $ENVIRONMENT"
case "$ENVIRONMENT" in
    "dev")
    token=$DEV_TOKEN
    ;;
    "test")
    token=$TEST_TOKEN
    ;;
    "prod")
    token=$PROD_TOKEN
    ;;
    *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

NAMESPACE="f3c07a-$ENVIRONMENT"

oc login $OPENSHIFT_SERVER --token=$token --insecure-skip-tls-verify=true
oc project $NAMESPACE

#set up port forwarding to access the database
DATABASE_POD_NAME=$(oc get pods -n $NAMESPACE -l name=api-postgres -o jsonpath='{.items[0].metadata.name}')
oc port-forward $DATABASE_POD_NAME 5432 &

#run the db migration
npx -w api prisma migrate status
