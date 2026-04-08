import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Small reusable primitives ────────────────────────────────────────────────

const C = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[0.88em] font-mono text-gray-800 break-all">
    {children}
  </code>
);

const Pre = ({ children }: { children: string }) => (
  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed my-4 whitespace-pre">
    {children}
  </pre>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md my-5 text-sm text-gray-700">
    {children}
  </div>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md my-5 text-sm text-gray-700">
    {children}
  </div>
);

const Divider = () => <hr className="my-12 border-gray-200" />;

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="text-2xl font-bold text-[#0a2540] border-b-2 border-gray-100 pb-3 mb-5 mt-2"
  >
    {children}
  </h2>
);

const H3 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg font-bold text-[#0a2540] mt-8 mb-3">
    {children}
  </h3>
);

const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-semibold text-[#0a2540] mt-6 mb-2">{children}</h4>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto my-5">
    <table className="w-full border-collapse text-sm">{children}</table>
  </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="border border-gray-200 bg-gray-50 font-semibold text-left px-3 py-2.5 text-gray-700">
    {children}
  </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="border border-gray-200 px-3 py-2.5 text-gray-700">
    {children}
  </td>
);

// ─── TOC items ────────────────────────────────────────────────────────────────

const sections = [
  { id: "bkes-token", label: "bKES Token" },
  { id: "authentication", label: "Authentication" },
  { id: "idempotency", label: "Idempotency" },
  { id: "rate-limits", label: "Rate Limits" },
  { id: "endpoints", label: "Endpoints" },
  { id: "webhooks", label: "Incoming Webhooks" },
  { id: "errors", label: "Error Responses" },
  { id: "security", label: "Security Guidelines" },
  { id: "fees", label: "Fee Architecture" },
  { id: "reconciliation", label: "Reconciliation" },
  { id: "changelog", label: "Changelog" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const PartnerApi = () => (
  <div className="min-h-screen bg-white">
    <Header />

    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 flex gap-10">
      {/* Sticky sidebar TOC */}
      <aside className="hidden lg:block w-52 shrink-0">
        <div className="sticky top-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            On this page
          </p>
          <nav className="flex flex-col gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-gray-500 hover:text-[#0a2540] py-0.5 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 text-gray-800 leading-relaxed">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-8 flex items-center gap-1.5">
          <Link to="/docs" className="hover:text-gray-600 transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-gray-600">Partner API</span>
        </div>

        <h1 className="text-4xl font-bold text-[#0a2540] mb-4">
          Bpesa Partner API
        </h1>

        <p className="mb-3">
          <strong>Base URL:</strong>{" "}
          <C>https://api.bpesa.net/api/v1/partner</C>
        </p>
        <p className="mb-3">
          This API lets your platform load KES into any EVM wallet as{" "}
          <strong>bKES</strong> (on-chain Kenyan Shilling token), and cash out
          bKES back to M-Pesa - without requiring the end-user to have a
          registered Bpesa account. Any valid EVM wallet address can hold bKES.
        </p>
        <p>
          Bpesa handles all underlying payment rails and blockchain operations
          on your behalf. You integrate directly with <strong>Bpesa only</strong>.
        </p>

        <Divider />

        {/* bKES Token */}
        <H2 id="bkes-token">bKES Token</H2>
        <p className="mb-4">
          bKES is the on-chain Kenyan Shilling token that backs all transactions
          on the Bpesa protocol.
        </p>
        <Table>
          <thead>
            <tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>
                <strong>Network</strong>
              </Td>
              <Td>Base Mainnet (Chain ID 8453)</Td>
            </tr>
            <tr>
              <Td>
                <strong>Contract</strong>
              </Td>
              <Td>
                <a
                  href="https://basescan.org/address/0x4847Dd2cD3323Af3bb0d5572c17064E5aDd2c5de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  0x4847Dd2cD3323Af3bb0d5572c17064E5aDd2c5de
                </a>
              </Td>
            </tr>
            <tr>
              <Td>
                <strong>Standard</strong>
              </Td>
              <Td>ERC-20</Td>
            </tr>
            <tr>
              <Td>
                <strong>Decimals</strong>
              </Td>
              <Td>18</Td>
            </tr>
            <tr>
              <Td>
                <strong>Symbol</strong>
              </Td>
              <Td>bKES</Td>
            </tr>
          </tbody>
        </Table>
        <Tip>
          All <C>amount</C> values in API responses are in{" "}
          <strong>wei (18 decimals)</strong>. For example,{" "}
          <C>1000000000000000000000</C> = 1,000 bKES.
        </Tip>

        <Divider />

        {/* Authentication */}
        <H2 id="authentication">Authentication</H2>
        <p className="mb-3">
          Every request must include your API key in the <C>X-API-Key</C>{" "}
          header.
        </p>
        <Pre>{`X-API-Key: bpk_live_xxxxxxxxxxxxxxxx`}</Pre>
        <p>
          Keys are issued per partner by the Bpesa ops team. Keep them secret -
          treat them like passwords. Rotate via the admin dashboard if
          compromised. All calls must originate from your{" "}
          <strong>server</strong> - never expose keys client-side.
        </p>

        <Divider />

        {/* Idempotency */}
        <H2 id="idempotency">Idempotency</H2>
        <p className="mb-3">
          <strong>
            All POST requests require an <C>Idempotency-Key</C> header.
          </strong>
        </p>
        <Pre>{`Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000`}</Pre>
        <ul className="list-disc pl-5 space-y-1.5 mb-4 text-sm">
          <li>Use a UUID v4 per unique operation.</li>
          <li>
            The same key returns the same response for 24 hours - safe to retry
            on network drops, timeouts, or 5xx errors.
          </li>
          <li>
            Concurrent requests with the same key return{" "}
            <C>409 CONCURRENT_REQUEST</C> - retry in 2–5 seconds.
          </li>
          <li>
            <strong>Never reuse a key for a different operation.</strong>
          </li>
        </ul>
        <Pre>{`HTTP/1.1 200 OK\nIdempotency-Replayed: true`}</Pre>

        <Divider />

        {/* Rate Limits */}
        <H2 id="rate-limits">Rate Limits</H2>
        <Table>
          <thead>
            <tr>
              <Th>Window</Th>
              <Th>Limit</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>1 minute</Td>
              <Td>60 requests per IP</Td>
            </tr>
          </tbody>
        </Table>
        <p>
          On breach, you receive <C>429 RATE_LIMITED</C>. Implement exponential
          backoff starting at 1 second.
        </p>

        <Divider />

        {/* Endpoints */}
        <H2 id="endpoints">Endpoints</H2>

        <H3>GET /fees — Fee Preview</H3>
        <p className="mb-3">
          Returns the full cumulative fee breakdown.{" "}
          <strong>
            Always call this before presenting a transaction to the user.
          </strong>{" "}
          Pass <br></br><C>type=onramp</C> or <C>type=offramp</C> - the fee model
          differs between directions.
        </p>

        <H4>Onramp</H4>
        <Pre>{`GET /api/v1/partner/fees?amount=1000&partnerId=your-partner-id&type=onramp`}</Pre>
        <Pre>{`{
  "ok": true,
  "data": {
    "type":              "onramp",
    "grossAmount":       1000,
    "currency":          "KES",
    "totalFeeAmount":    34.7,
    "netAmount":         965.3,
    "note": "User pays KES 1000.00. After processing fee, they receive 965.30 bKES."
  }
}`}</Pre>

        <H4>Offramp</H4>
        <Pre>{`GET /api/v1/partner/fees?amount=1000&partnerId=your-partner-id&type=offramp`}</Pre>
        <Pre>{`{
  "ok": true,
  "data": {
    "type":              "offramp",
    "grossAmount":       1000,
    "currency":          "KES",
    "totalFeeAmount":    26.82,
    "netAmount":         973.18,
    "note": "User receives KES 973.18 on their phone. Total bKES burned: KES 1000.00 equivalent."
  }
}`}</Pre>

        <Note>
          <strong>Onramp vs offramp fee model:</strong>
          <br />
          <strong>Onramp:</strong> Provider fee is a flat percentage of the
          gross payment amount.
          <br />
          <strong>Offramp:</strong> Provider fee is a fixed band-based amount
          (M-Pesa/Airtel MNO tariff) charged on disbursement - not a
          percentage.
        </Note>

        <Table>
          <thead>
            <tr>
              <Th>Field</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>grossAmount</Td>
              <Td>
                What the user pays (onramp) or total bKES equivalent burned
                (offramp)
              </Td>
            </tr>
            <tr>
              <Td>totalFeeAmount</Td>
              <Td>
                Network fee - deducted from payment (onramp) or charged on
                disbursement (offramp)
              </Td>
            </tr>
            <tr>
              <Td>netAmount</Td>
              <Td>
                bKES received (onramp) or KES received on phone (offramp)
              </Td>
            </tr>
          </tbody>
        </Table>

        {/* POST /onramp */}
        <H3 id="onramp">POST /onramp — KES → bKES</H3>
        <p className="mb-3">
          The user pays KES via their mobile money number. Bpesa processes the
          payment and mints the equivalent bKES to the supplied wallet address.
        </p>
        <Pre>{`POST /api/v1/partner/onramp
X-API-Key: bpk_live_xxx
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "walletAddress": "0xAbCd...1234",
  "phoneNumber":   "0712345678",
  "amount":        1000,
  "currency":      "KES",
  "mobileNetwork": "Safaricom"
}`}</Pre>

        <Table>
          <thead>
            <tr>
              <Th>Field</Th>
              <Th>Type</Th>
              <Th>Required</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>walletAddress</Td>
              <Td>string</Td>
              <Td>yes</Td>
              <Td>
                EVM address to receive bKES. Does not need to be registered on
                Bpesa.
              </Td>
            </tr>
            <tr>
              <Td>phoneNumber</Td>
              <Td>string</Td>
              <Td>yes</Td>
              <Td>
                E.164 format. The payer's mobile money number - a payment
                prompt is sent here.
              </Td>
            </tr>
            <tr>
              <Td>amount</Td>
              <Td>number</Td>
              <Td>yes</Td>
              <Td>KES amount (positive, max 500,000).</Td>
            </tr>
            <tr>
              <Td>currency</Td>
              <Td>string</Td>
              <Td>no</Td>
              <Td>
                Always <C>"KES"</C> for now.
              </Td>
            </tr>
            <tr>
              <Td>mobileNetwork</Td>
              <Td>string</Td>
              <Td>no</Td>
              <Td>
                Safaricom | Airtel | Telkom | MTN. Auto-detected from phone
                prefix if omitted.
              </Td>
            </tr>
          </tbody>
        </Table>

        <H4>Response — 202 Accepted</H4>
        <Pre>{`{
  "ok": true,
  "data": {
    "reference": "BP-20240401-XXXX",
    "status":    "PENDING",
    "message":   "Payment prompt sent. Poll GET /api/v1/partner/tx/:ref for status or await webhook."
  }
}`}</Pre>
        <p className="mb-4">
          Save the <C>reference</C> — use it to poll <C>/tx/:ref</C> or match
          against incoming webhook notifications.
        </p>

        <H4>Flow</H4>
        <Pre>{`Your server  →  POST /onramp  →  Bpesa API
                                   ↓
                           Payment prompt → User's phone
                                   ↓ (user approves)
                           Bpesa confirms payment
                                   ↓
                           bKES minted to walletAddress
                                   ↓
                           POST to your webhookUrl  ←── you receive this`}</Pre>

        {/* POST /offramp */}
        <H3 id="offramp">POST /offramp — bKES → KES</H3>
        <p className="mb-3">
          Burns bKES from the wallet and sends KES to the user's mobile money
          number.
        </p>
        <Note>
          <strong>Important:</strong> Bpesa performs an on-chain balance check
          before accepting this request. If the wallet holds insufficient bKES
          the request is rejected immediately with{" "}
          <C>400 INSUFFICIENT_BALANCE</C> - no payment is initiated.
        </Note>

        <Pre>{`POST /api/v1/partner/offramp
X-API-Key: bpk_live_xxx
Idempotency-Key: 7c9e6679-7425-40de-944b-e07fc1f90ae7
Content-Type: application/json

{
  "walletAddress": "0xAbCd...1234",
  "phoneNumber":   "0712345678",
  "amount":        500,
  "currency":      "KES",
  "mobileNetwork": "Safaricom"
}`}</Pre>

        <H4>Response — 202 Accepted</H4>
        <Pre>{`{
  "ok": true,
  "data": {
    "reference": "BP-20240401-YYYY",
    "status":    "PENDING",
    "message":   "Withdrawal initiated. Funds will arrive in 1–3 minutes."
  }
}`}</Pre>

        <H4>Flow</H4>
        <Pre>{`Your server  →  POST /offramp  →  Bpesa API
                                    ↓ balance check passes
                           KES disbursed to phone
                                    ↓ (disburse confirmed)
                           bKES burned from walletAddress
                                    ↓
                           POST to your webhookUrl  ←── you receive this`}</Pre>

        {/* GET /tx/:ref */}
        <H3 id="tx-status">GET /tx/:ref — Transaction Status</H3>
        <p className="mb-3">
          Poll this after initiating onramp/offramp to check the outcome.
        </p>
        <Pre>{`GET /api/v1/partner/tx/BP-20240401-XXXX
X-API-Key: bpk_live_xxx`}</Pre>
        <Pre>{`{
  "ok": true,
  "data": {
    "id":          "clx...",
    "type":        "LOAD",
    "status":      "CONFIRMED",
    "amount":      "1000000000000000000000",
    "toAddress":   "0xabcd...1234",
    "reference":   "BP-20240401-XXXX",
    "confirmedAt": "2024-04-01T12:03:22Z",
    "createdAt":   "2024-04-01T12:01:00Z",
    "errorMsg":    null
  }
}`}</Pre>

        <Table>
          <thead>
            <tr>
              <Th>Status</Th>
              <Th>Meaning</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>PENDING</Td>
              <Td>Waiting for the user to complete the payment prompt.</Td>
            </tr>
            <tr>
              <Td>CONFIRMED</Td>
              <Td>Payment confirmed and bKES minted/burned.</Td>
            </tr>
            <tr>
              <Td>FAILED</Td>
              <Td>
                Payment failed or timed out. Retry with a new{" "}
                <C>Idempotency-Key</C>.
              </Td>
            </tr>
          </tbody>
        </Table>

        <p className="mb-2">
          <strong>Recommended polling strategy:</strong> 0s → 5s → 10s → 20s →
          40s → 80s, then surface an error to the user (~3 min total).
        </p>
        <Tip>
          For real-time updates, register a <C>webhookUrl</C> on your partner
          record instead of polling.
        </Tip>

        <Divider />

        {/* Webhooks */}
        <H2 id="webhooks">Incoming Webhooks</H2>
        <p className="mb-4">
          When Bpesa completes or fails a transaction, it{" "}
          <strong>
            POSTs the outcome to your <C>webhookUrl</C>
          </strong>{" "}
          (configured on your partner record in the admin dashboard). This is
          the recommended alternative to polling <C>/tx/:ref</C>.
        </p>

        <H3>Payload</H3>
        <Pre>{`{
  "event":         "transaction.confirmed",
  "reference":     "BP-20240401-XXXX",
  "type":          "LOAD",
  "walletAddress": "0xAbCd...1234",
  "grossAmount":   "1000000000000000000000",
  "netAmount":     "985000000000000000000",
  "feeAmount":     "15000000000000000000",
  "currency":      "KES",
  "confirmedAt":   "2024-04-01T12:03:22Z",
  "onchainTxHash": "0xabc123..."
}`}</Pre>

        <Table>
          <thead>
            <tr>
              <Th>Field</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>event</Td>
              <Td>
                <C>transaction.confirmed</C> or <C>transaction.failed</C>
              </Td>
            </tr>
            <tr>
              <Td>reference</Td>
              <Td>
                The reference returned in the 202 response from{" "}
                <C>/onramp</C> or <C>/offramp</C>
              </Td>
            </tr>
            <tr>
              <Td>type</Td>
              <Td>
                <C>LOAD</C> (onramp) or <C>WITHDRAW</C> (offramp)
              </Td>
            </tr>
            <tr>
              <Td>walletAddress</Td>
              <Td>The EVM address involved</Td>
            </tr>
            <tr>
              <Td>grossAmount</Td>
              <Td>Total KES equivalent in wei (18 decimals)</Td>
            </tr>
            <tr>
              <Td>netAmount</Td>
              <Td>Amount after partner fee deduction in wei</Td>
            </tr>
            <tr>
              <Td>feeAmount</Td>
              <Td>Partner fee in wei</Td>
            </tr>
            <tr>
              <Td>currency</Td>
              <Td>
                Always <C>"KES"</C>
              </Td>
            </tr>
            <tr>
              <Td>confirmedAt</Td>
              <Td>ISO 8601 timestamp</Td>
            </tr>
            <tr>
              <Td>onchainTxHash</Td>
              <Td>
                On-chain transaction hash (only present on{" "}
                <C>transaction.confirmed</C>)
              </Td>
            </tr>
          </tbody>
        </Table>

        <H3>Verifying the Signature</H3>
        <p className="mb-3">
          Every webhook request includes two headers:
        </p>
        <Pre>{`X-Bpesa-Signature: <hex>
X-Bpesa-Timestamp: <unix ms>`}</Pre>
        <p className="mb-3">To verify:</p>
        <ol className="list-decimal pl-5 space-y-1.5 mb-4 text-sm">
          <li>
            Concatenate timestamp and raw request body:{" "}
            <C>{"`${timestamp}.${rawBody}`"}</C>
          </li>
          <li>
            Compute HMAC-SHA256 using your <C>webhookSecret</C>
          </li>
          <li>
            Compare hex result to <C>X-Bpesa-Signature</C>
          </li>
        </ol>
        <Pre>{`const crypto = require("crypto");

function verifyWebhook(req) {
  const timestamp = req.headers["x-bpesa-timestamp"];
  const signature = req.headers["x-bpesa-signature"];
  const rawBody   = req.body; // raw string, not parsed JSON

  const expected = crypto
    .createHmac("sha256", process.env.BPESA_WEBHOOK_SECRET)
    .update(\`\${timestamp}.\${rawBody}\`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(signature, "hex"),
  );
}`}</Pre>
        <p>
          <strong>
            Your <C>webhookSecret</C> is shown once at partner creation and
            once per key rotation. Store it securely.
          </strong>
        </p>

        <H3>Replay Protection</H3>
        <ul className="list-disc pl-5 space-y-1.5 mb-4 text-sm">
          <li>
            Reject requests where{" "}
            <C>{"Math.abs(Date.now() - Number(timestamp)) > 300_000"}</C> (5
            minutes).
          </li>
          <li>
            On <C>transaction.confirmed</C>, check your own DB for duplicate{" "}
            <C>reference</C> values before crediting the user.
          </li>
        </ul>

        <H3>Response</H3>
        <p>
          Respond with any <C>2xx</C> status within <strong>10 seconds</strong>
          . Bpesa does <strong>not</strong> retry failed webhook deliveries -
          use <C>GET /tx/:ref</C> to reconcile any missed events.
        </p>

        <Divider />

        {/* Errors */}
        <H2 id="errors">Error Responses</H2>
        <Pre>{`{
  "ok":      false,
  "code":    "ERROR_CODE",
  "message": "Human-readable description"
}`}</Pre>

        <Table>
          <thead>
            <tr>
              <Th>HTTP</Th>
              <Th>Code</Th>
              <Th>Meaning</Th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "400",
                "VALIDATION_ERROR",
                <>
                  Invalid request body - check <C>errors</C> array for
                  field-level details.
                </>,
              ],
              [
                "400",
                "MISSING_IDEMPOTENCY_KEY",
                <>
                  <C>Idempotency-Key</C> header is missing.
                </>,
              ],
              [
                "400",
                "INSUFFICIENT_BALANCE",
                "Wallet does not hold enough bKES to cover the offramp amount (including fee).",
              ],
              [
                "401",
                "MISSING_API_KEY",
                <>
                  <C>X-API-Key</C> header is missing.
                </>,
              ],
              [
                "401",
                "INVALID_API_KEY",
                "Key not recognised or revoked.",
              ],
              [
                "409",
                "PENDING_TRANSACTION",
                "A transaction for this wallet is already in progress - wait for it to complete.",
              ],
              [
                "409",
                "CONCURRENT_REQUEST",
                "Same Idempotency-Key is currently being processed - retry in 2–5 seconds.",
              ],
              [
                "429",
                "RATE_LIMITED",
                "Too many requests - back off and retry.",
              ],
              [
                "500",
                "INTERNAL_ERROR",
                "Server-side failure - safe to retry with the same Idempotency-Key.",
              ],
            ].map(([http, code, meaning], i) => (
              <tr key={i}>
                <Td>{http}</Td>
                <Td>
                  <C>{code as string}</C>
                </Td>
                <Td>{meaning}</Td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Divider />

        {/* Security */}
        <H2 id="security">Security Guidelines</H2>
        <ol className="list-decimal pl-5 space-y-3 text-sm">
          <li>
            <strong>Never expose your API key client-side.</strong> All calls
            must originate from your backend server.
          </li>
          <li>
            <strong>Always use HTTPS.</strong> Plaintext requests will be
            rejected.
          </li>
          <li>
            <strong>Validate phone numbers server-side</strong> before calling{" "}
            <C>/onramp</C> or <C>/offramp</C>. Bpesa does not verify that the
            phone number belongs to the wallet holder.
          </li>
          <li>
            <strong>
              Store the <C>reference</C>
            </strong>{" "}
            from every successful <C>202</C> response in your own database
            before returning to your user.
          </li>
          <li>
            <strong>Verify all incoming webhooks</strong> using HMAC-SHA256 as
            described above. Reject requests with an invalid signature or
            timestamp older than 5 minutes.
          </li>
          <li>
            <strong>Rotate API keys</strong> periodically (recommended every 90
            days) and immediately upon any suspected compromise.
          </li>
        </ol>

        <Divider />

        {/* Fee Architecture */}
        <H2 id="fees">Fee Architecture</H2>
        <p className="mb-3">
          Processing fees apply on every onramp/offramp. Both are shown in{" "}
          <C>GET /fees</C> before you initiate a transaction.
        </p>
        <Note>
          <C>GET /fees</C> handles this correctly — always use it rather than
          computing manually.
        </Note>

        <Divider />

        {/* Reconciliation */}
        <H2 id="reconciliation">Reconciliation</H2>
        <p className="mb-3">
          If your system and Bpesa fall out of sync, contact{" "}
          <a
            href="mailto:ops@bpesa.net"
            className="text-blue-600 hover:underline"
          >
            ops@bpesa.net
          </a>{" "}
          with the transaction <C>reference</C> if a discrepancy cannot be
          resolved via the API.
        </p>

        <Divider />

        {/* Changelog */}
        <H2 id="changelog">Changelog</H2>
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Change</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>2026-04-01</Td>
              <Td>
                Added incoming webhook spec, signature verification, fee
                architecture. Removed internal processing references.
              </Td>
            </tr>
            <tr>
              <Td>2026-04-01</Td>
              <Td>
                Initial partner API release —{" "}
                <C>/onramp</C>, <C>/offramp</C>, <C>/tx/:ref</C>
              </Td>
            </tr>
          </tbody>
        </Table>
      </main>
    </div>

    <Footer />
  </div>
);

export default PartnerApi;
