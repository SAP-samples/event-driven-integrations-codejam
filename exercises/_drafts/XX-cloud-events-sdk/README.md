# Exercise XX - Create a CloudEvent programmatically

Now that we are familiar with what a CloudEvent is, what a CloudEvent message looks like, and the different Event Formats available, let's see how we can create one programmatically.

## CloudEvents SDK

There are language-specific SDKs that can be used to create a message that complies with the CloudEvents standard. Below a list of the different languages that an SDK is available for:

- [C#](https://github.com/cloudevents/sdk-csharp)
- [Go](https://github.com/cloudevents/sdk-go)
- [Java](https://github.com/cloudevents/sdk-java)
- [Javascript](https://github.com/cloudevents/sdk-javascript)
- [PHP](https://github.com/cloudevents/sdk-php)
- [PowerShell](https://github.com/cloudevents/sdk-powershell)
- [Python](https://github.com/cloudevents/sdk-python)
- [Ruby](https://github.com/cloudevents/sdk-ruby)
- [Rust](https://github.com/cloudevents/sdk-rust)

Using an SDK allows us to easily create a CloudEvent message and ensure that it follows the guidelines defined in the standard. As an example, I will use the Python SDK to create the CloudEvent message for the Ticket Management System that I used as an example previously.

```python
from cloudevents.http import CloudEvent
from cloudevents.conversion import to_binary
import requests

ticket_id = "IT00010232"

# Create a CloudEvent
attributes = {
    "type": "com.ajmaradiaga.tms.Ticket.Created.v1",
    "source": "https://tms-prod.ajmaradiaga.com/tickets",
    "subject": ticket_id,
}
data = { 
    "ID": ticket_id,
    "Description": "Install ColdTurkey to block distracting websites.",
    "Urgency": {
      "ID": 1,
      "Description": "High"
    }
  }
event = CloudEvent(attributes, data)

# Creates the HTTP request representation of the CloudEvent in binary content mode
headers, body = to_binary(event)

print(body)
```

TBA - Step by step on how to create a CloudEvent in Node.js

## Further Study

* [CloudEvents specification](https://github.com/CloudEvents/spec)
* [JSON Event Format](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/json-format.md)

---

If you finish earlier than your fellow participants, you might like to ponder these questions. There isn't always a single correct answer and there are no prizes - they're just to give you something else to think about.

1. Is it possible to batch CloudEvents in a single JSON document?
  <details>
    <summary>Hint 🔦</summary>
   Check out the CloudEvents primer - [https://github.com/cloudevents/spec/blob/main/cloudevents/primer.md](https://github.com/cloudevents/spec/blob/main/cloudevents/primer.md)
   <i>Batching of multiple events into a single API call is natively supported by some protocols. To aid interoperability, it is left up to the protocols if and how batching is implemented. Details may be found in the protocol binding or in the protocol specification.</i>
   </details>
2. 
3. 

## Next

Continue to 👉 [Exercise 03 - ....](../03-/README.md)
