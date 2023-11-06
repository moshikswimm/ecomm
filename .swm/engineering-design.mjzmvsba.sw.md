---
title: Engineering design
---
## References

- Other relevant documents
- Link to PRD

## Goals

Main KPIs of this feature

## High level design

- {{Flow chart, like this one}}

```mermaid
sequenceDiagram
Service A->>+Service B: GET /objects/{id}

Service B-->>Service A: 200 OK (object)
Service A->>+Service C: GET /data/{object_internal_id}
<br/>Service C-->>Service A: 200 OK
```

- DB changes
- UI components
- What is stored (e.g., in the state, local storage...)

## Third party integrations

- Logs
- Analytics

## Tests to be added

## Migrations

## Security implications

## Roll-out plan

<SwmMeta repo-id="Z2l0aHViJTNBJTNBZWNvbW0lM0ElM0Ftb3NoaWtzd2ltbQ==" repo-name="ecomm"><sup>Powered by [Swimm](https://swimm-web-app--swmdv3-develop-staging-a696gm5o.web.app/)</sup></SwmMeta>
