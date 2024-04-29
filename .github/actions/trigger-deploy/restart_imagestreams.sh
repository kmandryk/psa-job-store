#!/bin/bash

OPENSHIFT_SERVER=$1
TOKEN=$2

#Log in to OpenShift
echo "Restarting imagestreams"

NAMESPACE="f3c07a-tools"

oc login $OPENSHIFT_SERVER --token=$TOKEN --insecure-skip-tls-verify=true
oc project $NAMESPACE

oc delete -k deployments/openshift/kustomize/images/image-streams/

oc apply -k deployments/openshift/kustomize/images/image-streams/