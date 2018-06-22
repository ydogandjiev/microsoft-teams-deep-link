# microsoft-teams-deep-link

A module to help generate deep links for Microsoft Teams

[![npm version](https://badge.fury.io/js/microsoft-teams-deep-link.svg)](https://badge.fury.io/js/microsoft-teams-deep-link)
[![Build Status](https://travis-ci.org/ydogandjiev/microsoft-teams-deep-link.svg?branch=master)](https://travis-ci.org/ydogandjiev/microsoft-teams-deep-link)
[![Coverage Status](https://coveralls.io/repos/github/ydogandjiev/microsoft-teams-deep-link/badge.svg?branch=master)](https://coveralls.io/github/ydogandjiev/microsoft-teams-deep-link?branch=master)

## Installation

```sh
npm install microsoft-teams-deep-link --save
yarn add microsoft-teams-deep-link
```

## Usage

### JavaScript

```javascript
var teamsDeepLink = require('microsoft-teams-deep-link');
var deepLink = teamsDeepLink.getEntityDeepLink(
  {
    entityId: "someEntityId",
    entityWebUrl: "someEntityWebUrl",
    entityLabel: "someEntityLabel"
  },
  "someAppId"
);
console.log(deepLink);
```

```sh
Output should be "https://teams.microsoft.com/l/entity/someAppId/_djb2_msteams_prefix_3116810623?webUrl=someEntityWebUrl&label=someEntityLabel"
```

### TypeScript

```typescript
import { getEntityDeepLink } from 'microsoft-teams-deep-link';
let deepLink = getEntityDeepLink(
  {
    entityId: "someEntityId",
    entityWebUrl: "someEntityWebUrl",
    entityLabel: "someEntityLabel"
  },
  "someAppId"
);
console.log(deepLink);
```

```sh
Output should be "https://teams.microsoft.com/l/entity/someAppId/_djb2_msteams_prefix_3116810623?webUrl=someEntityWebUrl&label=someEntityLabel"
```

## Build & Test

```sh
npm install
npm run build
npm run cover
```
