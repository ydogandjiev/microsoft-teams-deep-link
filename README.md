# microsoft-teams-deep-link

A module to help generate deep links for Microsoft Teams

## Installation

```sh
npm install microsoft-teams-deep-link --save
yarn add microsoft-teams-deep-link
bower install microsoft-teams-deep-link --save
```

## Usage

### Javascript

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

## Test

```sh
npm run test
```