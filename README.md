# TransacAI Requests Storage Service

This project is the codebase for the Requests Storage Service (RSS) of the TransacAI project.

## TransacAI

TransacAI project is geared towards generation of enriched summaries and insights of transactional data in real-time or batch using Generative AI and Large Language Models (LLMs). It goes beyond visual and analytical processing of transactional data by generating context-aware and enriched insights in natural language using LLMs. It focuses on delivering human-centric analysis that is easier to understand and act upon, eliminating the need for multiple complex data processing steps to derive insights from raw data.

## Requests Storage Service (ISS)

The Requests Storage Service (ISS) is a GraphQL API service that stores and retrieves insights generation **requests** handled by the TransacAI project.

All new insights generation requests are started from the Workload Manager Service (WMS). On getting a new manual request for insights generation or on starting a new scheduled job, the WMS service first stores the request details through the RSS service to get the `request_id`. For manual requests, it also returns this ID to the frontend client. Throughout the rest of the insights generation process cycle, this `request_id` is used for tracking insights generation request status, for tracing requests, for observability, and for performance monitoring and analysis.

Frontend clients can also directly interact with the RSS service to get request details like status of a certain request or all requests for a certain client.

RSS service is secured through an **API key** that is required for all requests. Each frontend client can be assigned a unique API key to also enable usage tracking and monitoring.

## Technical Overview

RSS is a GraphQL API service built using Apollo Server, Prisma, GraphQL Nexus and PostgreSQL.

### Tech Stack

RSS is built using the following technologies:

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**PostgreSQL**](https://www.postgresql.org/): Database for storing insights (hosted on [Supabase](https://supabase.com/))

### Directory Structure

The project is structured as follows:

- `prisma/`: Prisma schema and migrations
- `src/`: Source code
  - `nexus-types/`: GraphQL Nexus object type definitions
  - `schema.ts`: GraphQL schema generation using `makeSchema`
  - `context.ts`: Apollo Server context setup (with code for API key validation)
  - `server.ts`: Apollo Server setup
- `schema.graphql`: Generated GraphQL schema

## Docker

The project includes a `Dockerfile` and `docker-compose.yml` for running the RSS service in a Docker container.

### Running the Docker Container

To run the ISS service in a Docker container, follow these steps:

1. Build the Docker image:

```bash
docker-compose build
```

2. Start the Docker container:

```bash
docker-compose up
```

The ISS service will be running on `http://localhost:4000`.

### Stopping the Docker Container

To stop the Docker container, run:

```bash
docker-compose down
```

## Environment Variables

The project uses environment variables for configuration. The following environment variables are required:

- `DATABASE_URL`: PostgreSQL database URL (from Supabase) for storing insights
- `DIRECT_URL`: Database connection URL from Supabase but for direct non-pooling connections (for migrations)
- `TRANSAC_AI_ISS_API_KEY`: API key for securing the ISS API

## Google Kubernetes Engine

The production RSS service for TransacAI is deployed on Google Kubernetes Engine (GKE). Kubernetes manifests for deploying the RSS service to GKE are included in the `kubernetes/` directory.

The main manifest files are:

- `kubernetes/deployment.yaml`: Deployment configuration.
- `kubernetes/service.yaml`: Service configuration for load balancer.

Deployment is done on `transac-ai-gke` cluster, with a load balancer service to expose the deployment to public access on port 80.

Current policy uses 2 replicas for the deployment, with minimum required resources.

More information and deployment instructions can be found in the `kubernetes/README.md` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Issues

If you encounter any issues or bugs while using this project, please report them by following these steps:

1. Check if the issue has already been reported by searching our [issue tracker](https://github.com/pranav-kural/transacai-requests-storage-service/issues).
2. If the issue hasn't been reported, create a new issue and provide a detailed description of the problem.
3. Include steps to reproduce the issue and any relevant error messages or screenshots.

[Open Issue](https://github.com/pranav-kural/transacai-requests-storage-service/issues/new)
