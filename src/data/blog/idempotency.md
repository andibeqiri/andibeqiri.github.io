---
title: Idempotency
author: Andi Beqiri
pubDatetime: 2026-09-09T21:21:30Z
featured: false
draft: false
tags:
  - Software Development
description: Intuitive payment behavior does not happen magically. Idempotency has to be implemented.
---

What surprises you the most when you build custom software is that “magic” does not exist. It has to be written.

Intuitiveness always comes at an extra cost.

To someone just getting into software development, a basic request seems simple.

Let’s say you are building a payment feature.

The mental model seems simple:

1. Create an API endpoint that accepts a payment request.
2. Charge the credit card through a payment gateway.
3. Record the transaction in the database.
4. Return a success response.

But what happens if the user taps twice? Or what if a mobile network drops for a split second, causing the client app to automatically retry the request?

In a naive system, they get charged twice.

The server does not “know” that two identical network requests represent the same user intent. HTTP is stateless, so this behavior must be implemented explicitly.

Here is what a naive server implementation may look like:

```swift
// Server Request Handler (Non-Idempotent)

func handlePayment(request: HTTPRequest) async -> HTTPResponse {
    // Every request blindly executes the side effect
    let paymentResponse = await BankAPI.chargeCard(request.body.amount)

    return paymentResponse
}
```

Every request triggers blind execution. But this does not feel intuitive. From your perspective, you might think that there is something on the server that “magically” prevents this from happening. There is not. Remember, everything has to be written.

Making the system behave intuitively comes at an extra cost, and in code, that means more lines of code.

To achieve idempotency, the client and the server have to agree on a unique value to be sent from the client to the server. In this example, we add an `Idempotency-Key` to the request headers:

```swift
func handlePayment(request: HTTPRequest) async -> HTTPResponse {
    guard let key = request.headers["Idempotency-Key"] else {
        return .badRequest
    }

    // Atomically create or retrieve the payment associated with this key.
    let payment = await database.findOrCreatePayment(
        forKey: key,
        amount: request.body.amount
    )

    if let response = payment.response {
        // Return the saved result. Do not charge the card again.
        return response
    }

    // Pass the same key to the payment gateway so concurrent requests
    // and retries after a server failure do not create another charge.
    let paymentResponse = await BankAPI.chargeCard(
        request.body.amount,
        idempotencyKey: key
    )

    await database.save(key: key, response: paymentResponse)

    return paymentResponse
}
```

That extra coordination is what makes the difference between a system that works as intended and a system that feels broken.

Next time you use a framework that handles this for you, think about all the details that go into those few lines of code.
