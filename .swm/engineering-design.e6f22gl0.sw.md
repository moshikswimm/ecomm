---
id: e6f22gl0
title: Engineering design
file_version: 1.1.3
app_version: 1.16.0
---

## References
* Other relevant documents
* Link to PRD

## Goals

Main KPIs of this feature

## High level design
* {{Flow chart, like this one}}

<br/>

<!--MERMAID {width:100}-->
```mermaid
sequenceDiagram
Service A->>+Service B: GET /objects/{id}

Service B\-\-\>>Service A: 200 OK (object)
Service A->>+Service C: GET /data/{object\_internal\_id}
<br/>Service C\-\-\>>Service A: 200 OK
```
<!--MCONTENT {content: "sequenceDiagram<br/>\nService A->>+Service B: GET /objects/{id}\n\nService B\\-\\-\\>>Service A: 200 OK (object)<br/>\nService A->>+Service C: GET /data/{object\\_internal\\_id}<br/>\n<br/>Service C\\-\\-\\>>Service A: 200 OK<br/>"} --->

<br/>


* DB changes
* UI components
* What is stored (e.g., in the state, local storage...)

## Third party integrations
* Logs
* Analytics

## Tests to be added


## Migrations

## Security implications

## Roll-out plan


<br/>

This file was generated by Swimm. [Click here to view it in the app](https://swimm-web-app.web.app/repos/Z2l0aHViJTNBJTNBZWNvbW0lM0ElM0Ftb3NoaWtzd2ltbQ==/docs/e6f22gl0).