# GUID Utilities

Utilities for generating GUIDs.

## Functions

### generateGuid

Generates a hex-GUID.

```typescript
import { generateGuid } from "@bodynarf/utils";

const guid = generateGuid();
console.log(guid); // "a1b2c3d4-e5f6-7890-abcd-ef1234567890" (format may vary)
