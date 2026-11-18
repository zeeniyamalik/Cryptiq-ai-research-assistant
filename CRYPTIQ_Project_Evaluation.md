# CRYPTIQ --- Project Evaluation Document

> **Project:** CRYPTIQ\
> **Project type:** AI-assisted cryptocurrency research and intelligence
> web application\
> **Team Members:** Abisha Faisal, Ayesha Farooq, Zeeniya Malik - BSCS 5I

------------------------------------------------------------------------

## 1. Executive Summary

CRYPTIQ is a web-based cryptocurrency research platform designed to
bring together market information, project fundamentals, recent news,
developer activity, available security indicators, and AI-generated
research analysis.

A user selects a cryptocurrency and initiates a research workflow. The
backend retrieves information from external providers, organises
available source material into an evidence registry, and sends
structured inputs to Google Gemini for synthesis. The application
presents the results through an overview dashboard, market and
tokenomics analysis, fundamentals, intelligence, and an executive
research brief.

The project addresses the fragmentation of cryptocurrency research:
users otherwise need to consult several independent services and
interpret their information separately. CRYPTIQ provides a consolidated
research interface. It is a research and information tool; it is not an
exchange, wallet, portfolio manager, or trade-execution system.

**Overall evaluation:** The submitted code demonstrates a broad,
coherent product concept with a multi-source backend, structured AI
output, evidence-reference validation, interactive research views,
comparison functionality, and locally stored research history. Its main
evaluation risks are dependence on third-party API availability and
quotas, uneven data coverage across assets, and the need for documented,
repeatable testing. This document evaluates the implementation visible
in the submitted source; it does not claim that live production
behaviour or every external integration has been independently tested.

------------------------------------------------------------------------

## 2. Problem Statement

Cryptocurrency research information is distributed across multiple
services. Market data, price history, news, project documentation,
blockchain activity, developer repositories, and contract-security
information may each require a separate source.

This creates several difficulties:

-   Research takes time because information must be gathered from
    different websites and APIs.
-   Metrics can be difficult to interpret without context.
-   News and project developments may be disconnected from market and
    fundamentals data.
-   Users may not know which information is unavailable or which source
    supports a finding.
-   Comparing multiple assets requires manually collecting equivalent
    metrics.

CRYPTIQ aims to reduce this fragmentation by presenting available
information in a single research workspace and using AI to summarise and
organise it.

------------------------------------------------------------------------

## 3. Project Aim and Objectives

### 3.1 Aim

To develop an evidence-oriented cryptocurrency research application that
consolidates information from external data providers and uses AI to
produce structured, source-referenced research summaries.

### 3.2 Objectives

1.  Allow users to search for and select supported cryptocurrencies.
2.  Retrieve market snapshots and historical price information.
3.  Present token-supply and valuation metrics.
4.  Gather available project, on-chain, developer, holder, and
    contract-security information.
5.  Retrieve, filter, and classify relevant cryptocurrency news.
6.  Create an evidence registry containing source metadata and evidence
    identifiers.
7.  Use Gemini to generate structured research analysis from the
    retrieved information.
8.  Present research through dedicated sections and an executive brief.
9.  Support comparison of two or three cryptocurrencies.
10. Allow users to revisit saved research and view research-change
    summaries where available.

------------------------------------------------------------------------

## 4. Scope of the System

### 4.1 Included functionality

-   Cryptocurrency search and curated asset suggestions.
-   Global market pulse.
-   Current market metrics and historical price charts.
-   Bitcoin/Ethereum benchmark comparison in the market-history
    workflow.
-   Tokenomics and token identity information.
-   Project fundamentals and available on-chain data.
-   GitHub repository activity.
-   Available GoPlus smart-contract security checks.
-   News retrieval, filtering, event classification, and source
    references.
-   AI-generated research reports and comparison summaries.
-   Thesis monitoring, catalysts, positive factors, and negative
    factors.
-   Executive research brief.
-   Comparison of two or three assets.
-   Browser-local research history and research-difference summary
    support.

### 4.2 Outside the stated product scope

The submitted application is not presented as a cryptocurrency exchange
or brokerage. It does not execute trades, custody assets, connect to a
user's wallet for transaction signing, or provide guaranteed price
forecasts. The research conclusions should not be treated as
personalised financial advice.

------------------------------------------------------------------------

## 5. Main Features and Evaluation

### 5.1 Home and cryptocurrency search

The Home page is the entry point. It provides cryptocurrency search and
suggested assets. The backend searches CoinGecko and can fall back to a
curated catalogue when live search is unavailable.

**Evaluation:** This provides a practical entry workflow and a fallback
path. Search quality and asset coverage still depend on the provider and
the curated catalogue.

### 5.2 Overview dashboard

The Overview page presents a summary of the selected asset and provides
navigation into deeper research sections. The server exposes a global
market-pulse endpoint, while the market data service retrieves
asset-level information.

**Evaluation:** A summary-first page helps users understand the asset
before exploring detailed metrics. The usefulness of the dashboard
depends on data freshness and clear display of missing values.

### 5.3 Market and Tokenomics

The Market & Tokenomics page includes:

-   Current price, market capitalisation, 24-hour volume, 24-hour
    change, and market rank.
-   24-hour high/low range information.
-   Historical price charts with selectable periods.
-   Relative performance context against Bitcoin and Ethereum.
-   Circulating supply, total supply, maximum supply, and fully diluted
    valuation.
-   Supply-circulation and market-cap-to-FDV ratios.
-   Token identity details such as CoinGecko ID, network/platform,
    contract address, official website, and explorer references.
-   Token unlock information when available.

**Evaluation:** This section combines price performance with token
supply context. The interpretation must distinguish market
capitalisation from fully diluted valuation and must clearly mark
unavailable supply or unlock data.

### 5.4 Fundamentals

The Fundamentals page presents the available information about the
underlying project, including:

-   Project summary, problem solved, technology, and use cases.
-   On-chain and ecosystem adoption data, including TVL and protocol
    fees where a suitable DeFiLlama match exists.
-   GitHub repository statistics such as stars, forks, recent commits,
    and latest release.
-   Holder distribution where returned by the security/data provider.
-   Smart-contract security indicators from GoPlus for supported
    contract networks.

**Evaluation:** This is a meaningful differentiator from a price-only
tracker. However, coverage varies by asset. Native assets may not have
an EVM token contract to inspect; not every project has a matching
DeFiLlama protocol or identifiable GitHub repository. An unavailable
check must not be interpreted as a safe result.

### 5.5 Intelligence

The Intelligence page includes:

-   A classified news and event timeline.
-   Event categories such as technical development, network upgrade,
    ecosystem adoption, security incident, regulation, tokenomics,
    exchange listing/delisting, governance, funding, and partnerships.
-   Publisher and publication information.
-   Event implications and corroborating publisher information when
    available.
-   Thesis Monitor sections for strengthening signals, weakening
    signals, and items to monitor next.
-   Catalyst information with verification status.
-   An evidence and data-trust registry.

The interface explicitly describes thesis conditions as
research-monitoring conditions rather than buy/sell triggers.

**Evaluation:** This feature connects news and developments to research
questions. The quality of classification and synthesis depends on the
relevance, accuracy, and coverage of retrieved articles. The application
should continue to distinguish confirmed information, community
discussion, unverified rumours, and AI interpretation.

### 5.6 Executive Research Brief

The report page consolidates research into structured sections:

1.  Executive verdict.
2.  Key takeaways.
3.  Market position.
4.  Recent developments.
5.  Positive factors.
6.  Risks and concerns.
7.  Evidence limitations and supporting references.

The supported conclusion categories in the source include:

-   Worth investigating further.
-   Interesting, but requires caution.
-   Significant risks identified.
-   Insufficient evidence to conclude.

**Evaluation:** The brief provides a clear final output and reduces the
need to navigate every page to understand the overall findings. It
should be judged on evidence traceability, factual accuracy, balanced
treatment of risks, and whether limitations are visible.

### 5.7 Compare Assets

The comparison endpoint accepts two or three selected cryptocurrencies.
It retrieves available market, historical, and fundamentals information
and generates an AI comparison summary.

**Evaluation:** Side-by-side comparison is useful for evaluating assets
using a common set of metrics. A fair comparison requires consistent
time periods, comparable metric definitions, and visible handling of
missing data.

### 5.8 Research History and Change Summary

The project includes a history modal and a browser-local history store.
The backend also exposes a research-difference endpoint for comparing
previous and current research briefs.

**Evaluation:** Local history supports continuity on the same browser.
It is not equivalent to a cloud account or cross-device synchronised
library. The change-summary workflow should be tested with actual
previous and current briefs.

------------------------------------------------------------------------

## 6. Technical Architecture

### 6.1 Frontend

The frontend is implemented using:

-   React 19
-   TypeScript
-   Vite
-   Tailwind CSS
-   Lucide React icons
-   Motion

The UI is organised into reusable components and dedicated research
pages, including Home, Overview, Market & Tokenomics, Fundamentals,
Intelligence, Executive Brief, comparison, and history components.

### 6.2 Backend

The backend uses Node.js with Express. The Express server exposes
application API routes and integrates with the external services. In
development, Vite middleware is mounted by the server; in production,
the server serves the built frontend from the distribution directory.

### 6.3 External services visible in the source

  -----------------------------------------------------------------------
  Provider / Service                  Role in CRYPTIQ
  ----------------------------------- -----------------------------------
  CoinGecko                           Cryptocurrency search, market data,
                                      global market information, and
                                      historical prices

  Google Gemini                       Research synthesis and comparison
                                      summaries

  DeFiLlama                           Available chain/protocol TVL and
                                      fee information

  GitHub API                          Repository details and developer
                                      activity

  GoPlus Security                     Supported token contract-security
                                      information

  News sources / RSS feeds            Recent cryptocurrency news
                                      retrieval
  -----------------------------------------------------------------------

The exact availability of each provider depends on the selected asset,
provider response, rate limits, and configured credentials.

### 6.4 Main API routes

  ------------------------------------------------------------------------------
  Route                          Method                  Purpose
  ------------------------------ ----------------------- -----------------------
  `/api/coins/search`            GET                     Search cryptocurrency
                                                         assets

  `/api/market/pulse`            GET                     Retrieve global market
                                                         pulse

  `/api/market/history`          GET                     Retrieve historical
                                                         price data and optional
                                                         benchmarks

  `/api/research/market`         GET                     Retrieve asset market
                                                         information

  `/api/research/news`           GET                     Retrieve relevant news

  `/api/research/fundamentals`   POST                    Retrieve fundamentals
                                                         bundle

  `/api/research/analyze`        POST                    Generate the AI
                                                         research report

  `/api/research/compare`        POST                    Compare two or three
                                                         assets

  `/api/research/diff`           POST                    Summarise changes
                                                         between two research
                                                         briefs
  ------------------------------------------------------------------------------

### 6.5 Research-generation workflow

1.  The user searches for and selects an asset.
2.  The frontend requests market information and news.
3.  The frontend requests a fundamentals bundle.
4.  The backend gathers available data from its provider adapters.
5.  The evidence service builds an evidence registry with source
    metadata and identifiers.
6.  The Gemini service receives the selected asset and available
    research inputs.
7.  The AI returns structured research content.
8.  The backend validates evidence identifiers in relevant generated
    fields and returns the report, evidence records, and generation
    timestamp.
9.  The frontend displays the research across the relevant pages.

The server code starts market and news retrieval concurrently in the
research flow. The system also handles some provider failures and
rate-limit conditions with warnings or fallback behaviour.

------------------------------------------------------------------------

## 7. Evidence Handling and AI Controls

A central design principle is that the AI report should be based on
retrieved information rather than an unsupported, free-form opinion.

The source includes an evidence-building service and server-side
validation of evidence identifiers in generated report fields. The
Gemini service validates references used in recent developments,
classified events, catalysts, factors, and thesis-monitor content.

The system also defines structured categories for event classification
and research conclusions.

### Evaluation strengths

-   Evidence records are represented separately from generated prose.
-   The report can retain source references.
-   Some generated evidence identifiers are validated server-side.
-   The application has explicit evidence-limitation fields.
-   Missing provider data can be surfaced rather than silently treated
    as positive evidence.

### Remaining concerns

-   Evidence references do not guarantee that the underlying source is
    correct or that an AI interpretation is valid.
-   Source quality and relevance need human review.
-   A source can be genuine but outdated, incomplete, or unrelated to
    the exact claim.
-   AI-generated summaries should be checked against the original
    article or provider response.
-   The application should clearly label AI interpretation separately
    from source-reported facts.

------------------------------------------------------------------------

## 8. Data Availability and Known Limitations

The source code itself indicates that some metrics are conditional or
not connected.

  -----------------------------------------------------------------------
  Area                                Limitation visible in the
                                      implementation
  ----------------------------------- -----------------------------------
  Active addresses / transaction      The Fundamentals UI indicates that
  count                               these require a chain-explorer API
                                      and are not connected in the
                                      displayed implementation.

  Token unlocks                       The Market & Tokenomics UI can show
                                      that unlock schedules are
                                      unavailable.

  Social/community telemetry          The Intelligence UI can show that
                                      community social telemetry is not
                                      connected.

  DeFiLlama                           A chain or protocol match is
                                      required; otherwise the metric is
                                      unavailable.

  GitHub                              An identifiable repository and
                                      successful GitHub API response are
                                      required.

  GoPlus                              Contract checks depend on supported
                                      contract/network information and
                                      provider availability.

  News                                Relevant news coverage varies by
                                      asset and feed availability.

  External APIs                       Rate limits, timeouts, outages, and
                                      credential configuration can affect
                                      results.

  AI generation                       Gemini authentication, quota, or
                                      temporary service errors can
                                      prevent report generation.

  Local history                       Browser-local storage does not
                                      provide account-based cloud
                                      synchronisation.
  -----------------------------------------------------------------------

These limitations should be discussed honestly during evaluation. The
absence of data is not evidence that a project is safe, active, or
successful.

------------------------------------------------------------------------

## 9. Quality Attributes

The following is a qualitative assessment based on the submitted
implementation, not a claim of completed formal testing.

  -----------------------------------------------------------------------
  Quality attribute       Assessment              Rationale
  ----------------------- ----------------------- -----------------------
  Functionality           Good feature breadth    Multiple dedicated
                                                  research workflows and
                                                  API integrations are
                                                  implemented.

  Usability               Promising               The interface separates
                                                  research into clear
                                                  sections and provides
                                                  an executive brief.
                                                  User testing is still
                                                  needed.

  Modularity              Good                    Frontend pages and
                                                  backend provider
                                                  services are separated
                                                  into
                                                  components/modules.

  Data reliability        Conditional             The application depends
                                                  on external APIs, asset
                                                  mapping, provider
                                                  quotas, and coverage.

  Transparency            Promising               Evidence registry,
                                                  source references,
                                                  availability states,
                                                  and limitation notes
                                                  are present.

  Error handling          Present                 Several routes handle
                                                  missing parameters,
                                                  provider errors, rate
                                                  limits, and Gemini
                                                  failures.

  Security                Requires further        API credentials are
                          verification            handled through
                                                  environment
                                                  configuration, but a
                                                  full security audit has
                                                  not been performed.

  Performance             Requires measurement    Caching, request
                                                  coordination, and
                                                  concurrent retrieval
                                                  are present in parts of
                                                  the data layer; no
                                                  benchmark results are
                                                  supplied.

  Maintainability         Promising               TypeScript types,
                                                  service modules, and
                                                  component separation
                                                  support maintenance.
                                                  Automated test coverage
                                                  is not established by
                                                  the supplied package
                                                  scripts.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 10. Testing and Evaluation Plan

The submitted `package.json` provides scripts for development,
production start, build, preview, cleaning, and TypeScript checking. It
does not define a dedicated automated test script. Therefore, the
following should be treated as a recommended evaluation plan, not as
tests already passed.

### 10.1 Functional test cases

  -----------------------------------------------------------------------
  ID                      Test                    Expected result
  ----------------------- ----------------------- -----------------------
  F-01                    Open the Home page      Home page renders
                                                  without a blocking
                                                  error

  F-02                    Search for Bitcoin      Matching asset results
                                                  appear

  F-03                    Search with an empty    Curated suggestions are
                          query                   displayed

  F-04                    Select an asset and     Research workflow
                          start research          begins

  F-05                    Generate a report with  Report is returned and
                          valid API configuration displayed

  F-06                    Open Overview           Asset summary and
                                                  available metrics are
                                                  visible

  F-07                    Change historical chart Chart requests and
                          period                  displays the selected
                                                  period when data is
                                                  available

  F-08                    Open Fundamentals       Available project,
                                                  on-chain, GitHub,
                                                  holder, and security
                                                  information is shown

  F-09                    Open Intelligence       News, thesis-monitor,
                                                  catalyst, and evidence
                                                  sections render

  F-10                    Open Executive Brief    Structured report
                                                  sections are displayed

  F-11                    Compare two assets      Comparison result is
                                                  generated

  F-12                    Compare three assets    Three-asset comparison
                                                  is accepted

  F-13                    Submit fewer than two   API returns a
                          assets to comparison    validation error
                          API                     

  F-14                    Reopen a saved research Previously saved local
                          item                    brief can be reopened

  F-15                    Simulate provider       User sees a warning or
                          unavailability          unavailable state
                                                  rather than fabricated
                                                  data
  -----------------------------------------------------------------------

### 10.2 Negative and edge-case testing

-   Missing or invalid cryptocurrency identifiers.
-   Unsupported or unmapped networks.
-   Missing contract addresses.
-   No relevant news articles.
-   CoinGecko rate limit response.
-   GitHub rate limit response.
-   Gemini missing/invalid API key.
-   Gemini quota exhaustion or temporary unavailability.
-   Malformed or incomplete AI response.
-   Missing evidence identifiers in generated content.
-   Empty or incomplete previous/current research briefs.
-   Browser storage unavailable or cleared.

### 10.3 Non-functional testing to perform

1.  **Usability testing:** Ask first-time users to generate a report
    without guidance and record completion time and confusion points.
2.  **Performance testing:** Measure search, data retrieval,
    report-generation, and page-rendering times.
3.  **Reliability testing:** Repeat workflows under provider timeouts
    and rate limits.
4.  **Security testing:** Review secret handling, input validation,
    dependency vulnerabilities, API exposure, and output handling.
5.  **Responsive testing:** Test desktop, tablet, and mobile layouts.
6.  **Accessibility testing:** Check keyboard navigation, contrast,
    labels, focus states, and screen-reader semantics.
7.  **Data validation:** Compare displayed metrics and source dates
    against their original providers.

### 10.4 Test result recording template

Use the following format when conducting actual tests:

  ---------------------------------------------------------------------------
  Test ID           Actual result     Status                Evidence / Notes
                                      (Pass/Fail/Blocked)   
  ----------------- ----------------- --------------------- -----------------
  F-01              To be completed   Not tested            

  F-02              To be completed   Not tested            

  F-05              To be completed   Not tested            

  F-10              To be completed   Not tested            

  F-11              To be completed   Not tested            

  F-14              To be completed   Not tested            
  ---------------------------------------------------------------------------

Do not mark a test as passed until it has been executed and its result
recorded.

------------------------------------------------------------------------

## 11. Strengths of the Project

1.  **Clear problem focus:** The application addresses the fragmentation
    of cryptocurrency research.
2.  **Multi-source integration:** It combines several categories of
    external data rather than relying on one market API.
3.  **Structured AI output:** Gemini is used to produce defined research
    fields and categories.
4.  **Evidence-oriented design:** The evidence registry and reference
    validation support traceability.
5.  **Broad research coverage:** Market, tokenomics, fundamentals, news,
    security, and thesis monitoring are included.
6.  **Comparison capability:** Users can evaluate multiple assets within
    the same application.
7.  **Graceful handling of missing information:** The code includes
    availability states, warnings, and error responses for several
    provider failures.
8.  **Modular structure:** Frontend components and backend services are
    organised by responsibility.

------------------------------------------------------------------------

## 12. Areas for Improvement

### 12.1 Automated testing

Add unit tests for formatting utilities, evidence construction, provider
adapters, validation functions, and history storage. Add integration
tests for API routes and end-to-end tests for the complete research
workflow.

### 12.2 Stronger data provenance

Display source URLs, retrieval timestamps, and source types consistently
beside claims. Consider storing raw provider response metadata or a
reproducible retrieval snapshot for evaluation.

### 12.3 Broader data coverage

Connect appropriate chain-explorer, token-unlock, and social-data
providers if those metrics remain product priorities. Add clear
provider-mapping rules and avoid implying coverage where none exists.

### 12.4 Authentication and user accounts

If the product is intended for multi-user use, introduce secure
authentication and server-side user-specific research storage. This
would enable cross-device history and saved research libraries.

### 12.5 Caching and API efficiency

Define cache expiry policies per provider and data type. Monitor rate
limits, retries, concurrent requests, and provider failures. Ensure that
stale cached information is clearly labelled.

### 12.6 AI quality evaluation

Create a fixed evaluation dataset of assets and known source material.
Review AI summaries for factual accuracy, citation correctness,
unsupported claims, balanced risk coverage, and consistency across
repeated runs.

### 12.7 Security hardening

Keep provider keys server-side, validate and limit incoming request
data, apply suitable request throttling, review CORS and security
headers, and audit dependencies before public deployment.

### 12.8 Accessibility and responsive behaviour

Conduct keyboard, contrast, screen-reader, and small-screen testing.
Improve any controls or charts that are difficult to use without a
mouse.

------------------------------------------------------------------------

## 13. Future Enhancements

Potential future work includes:

-   User accounts and cloud-synchronised research history.
-   More chain-explorer integrations for active addresses and
    transaction counts.
-   Verified token unlock and vesting schedules.
-   Social and community sentiment integrations with clear source
    labelling.
-   More detailed holder concentration and wallet-distribution analysis.
-   Configurable alerts for selected research signals.
-   Exportable PDF research briefs.
-   Saved watchlists and scheduled re-analysis.
-   Historical comparison of research conclusions over time.
-   A formal AI evaluation framework and confidence/uncertainty
    presentation.
-   More comprehensive automated and end-to-end testing.

These are recommendations for future development, not claims that the
current submitted application already provides them.

------------------------------------------------------------------------

## 14. Setup and Execution

The repository README specifies Node.js as a prerequisite and provides
the following local setup flow.

1.  Install dependencies:

    ``` bash
    npm install
    ```

2.  Configure the Gemini API key in `.env.local`:

    ``` env
    GEMINI_API_KEY=your_gemini_api_key
    ```

3.  Start the application:

    ``` bash
    npm run dev
    ```

Other available scripts from `package.json`:

``` bash
npm run build
npm run preview
npm run lint
npm start
```

`npm run lint` runs the TypeScript compiler in no-emit mode
(`tsc --noEmit`); it is not a dedicated test suite.

Additional provider credentials may be needed for enhanced data
coverage. Refer to the relevant service configuration in the source
before assuming a provider is fully enabled. Never commit real API keys
to source control.

------------------------------------------------------------------------

## 15. Final Evaluation

CRYPTIQ demonstrates a substantial implementation of an AI-assisted
cryptocurrency research application. Its strongest aspects are the
combination of market and fundamentals data, structured AI-generated
research, evidence references, dedicated research sections, and asset
comparison.

The project is more than a static dashboard: it includes a backend
retrieval and synthesis workflow, provider adapters, structured data
types, evidence handling, and browser-local research history.

The most important areas requiring further work are formal testing,
measurable reliability and performance results, stronger provenance and
AI-quality evaluation, security review, and improved coverage for data
sources that are currently unavailable or not connected.

**Final assessment:** Based on source-code review, CRYPTIQ is a
promising and feature-rich research application with a clear use case
and a sound overall workflow. Its evaluation should recognise the
breadth of the implemented functionality while distinguishing
implemented features from provider-dependent data, unconnected
integrations, and future enhancements. A final operational grade should
only be assigned after the application has been run and the functional
and non-functional tests have been completed.

------------------------------------------------------------------------

## Appendix A --- Source files reviewed

The evaluation is based on the submitted project archive, including:

-   `package.json`
-   `server.ts`
-   `src/types/research.ts`
-   `src/components/AppShell.tsx`
-   `src/components/HomePage.tsx`
-   `src/components/OverviewPage.tsx`
-   `src/components/MarketTokenomicsPage.tsx`
-   `src/components/FundamentalsPage.tsx`
-   `src/components/IntelligencePage.tsx`
-   `src/components/ReportPage.tsx`
-   `src/components/CompareModal.tsx`
-   `src/components/HistoryModal.tsx`
-   `src/utils/historyStore.ts`
-   `server/services/coingecko.ts`
-   `server/services/news.ts`
-   `server/services/fundamentals.ts`
-   `server/services/evidence.ts`
-   `server/services/gemini.ts`

## Appendix B --- Evaluation note

This document is a source-code-based project evaluation draft. It is not
a certification, security audit, penetration-test report, or proof that
live third-party integrations are currently operational. Complete the
test-result table with actual observations before submitting it as a
final tested evaluation.
