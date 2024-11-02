# Deploying RSS to Google Kubernetes Engine (GKE)

This guide provides instructions for deploying the RSS service to Google Kubernetes Engine (GKE).

## Steps

1. Setup [gcloud](https://cloud.google.com/sdk/docs/install) CLI.

```bash
gcloud init
```

2. Confirm project name.

```bash
gcloud config get-value project
```

3. Create repository in Google Cloud Artifact Registry.

```bash
gcloud artifacts repositories create rss-repo \
    --project=transac-ai \
    --repository-format=docker \
    --location=us-east1 \
    --description="Transac AI RSS Repository"
```

4. Build and push the image to the repository.

```bash
gcloud builds submit --tag us-east1-docker.pkg.dev/transac-ai/rss-repo/transac-ai-rss-gke:1.0.1 .
```

5. Create a GKE cluster.

```bash
gcloud container clusters create-auto transac-ai-gke --location us-east1
```

Output may look something like this:

```bash
NAME                LOCATION  MASTER_VERSION      MASTER_IP      MACHINE_TYPE  NODE_VERSION        NUM_NODES  STATUS
transac-ai-gke      us-east1  1.30.5-gke.1014001  34.73.***.***  e2-small      1.30.5-gke.1014001  3          RUNNING
```

6. Verify cluster creation.

```bash
gcloud container clusters list

or

kubectl get nodes
```

7. Set secrets for environment variables to be available throughout the cluster.

```bash
kubectl create secret generic transac-ai-rss-secrets \
--from-literal=transac-ai-rss-database-url='' \
--from-literal=transac-ai-rss-direct-url='' \
--from-literal=transac-ai-rss-api-key=''
```

8. Deploy deployment to GKE.

```bash
kubectl apply -f kubernetes/deployment.yaml
```

9. Check the status of the deployment.

```bash
kubectl get deployments
```

Output:

```bash
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
transac-ai-rss-gke   2/2     2            2           4h11m
```

10. Create and deploy load balancer service to access the deployment.

```bash
kubectl apply -f kubernetes/service.yaml
```

11. Check the status of the service, and get the external IP.

```bash
kubectl get services
```

Output:

```bash
NAME                     TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)        AGE
transac-ai-rss-service   LoadBalancer   **.***.***.***   **.***.***.***   80:31664/TCP   3h41m
```

12. Test the service.

```
curl --request POST \
    --header 'content-type: application/json' \
    --header 'Authorization: Bearer <API KEY>' \
    --url '<EXTERNAL_IP>' \
    --data '{"query":"query getInsightById($requestByIdId: String!, $clientId: String!) {\n  requestById(id: $requestByIdId, clientId: $clientId) {\n    status\n  }\n}","variables":{"requestByIdId":"418b1dd7-8545-4408-998f-539ee2b285e7","clientId":"test_client"}}'
```

To restart the deployment after updating the image, run the following command:

```bash
kubectl rollout restart deployment transac-ai-rss-gke
```
