# Conversation Insights

**Company:** RozieAI  
**Client:** Air Canada  
**Timeline:** Q3 2024 - Q3 2025  
**Role:** Product Designer

## Overview

Conversation Insights is a self-serve analytics platform built for Air Canada's contact centre teams. Every day, hundreds of thousands of customers call Air Canada's contact centre to resolve their issues. RozieAI's AI models process these calls to identify emerging trends and operational signals. Before the platform existed, these insights were delivered through weekly reports, making it difficult for teams to independently investigate issues, understand their operational impact, and take timely action.

### My Contributions

- Led the end-to-end design of the Conversation Insights dashboard as the sole Product Designer, from early discovery and research through final designs and implementation.
- Conducted customer interviews and collaborated closely with stakeholders to understand user needs, validate concepts, and shape the overall product direction.
- Designed the dashboard interface and core user experience, including the filtering system, reusable components, and key workflows for exploring AI-generated insights.
- Created and maintained the project's style guide, with reusable components and patterns that contributed to the team's broader design system.

## Problem

Customer issue investigation was fragmented across reports, systems, and people, which slowed operational decisions.

Before Conversation Insights platform existed, AI-generated insights were delivered through weekly reports prepared by RozieAI product owners. These reports helped Air Canada contact centre teams identify emerging issues, but understanding where and why those issues were occurring required investigation across multiple sources.

Air Canada contact centre teams often moved between reports, AWS Connect portal, and follow-up discussions with RozieAI stakeholders to connect insights with operational data. This fragmented workflow slowed their operational decision-making.

![Examples of different tools involved in manual analysis](/assets/conversation-insights/A5%20-%203.svg)

---

> The opportunity was to transform customer issue investigation into a self-serve workflow, enabling contact centre teams to independently understand and act on customer issues.

---

## Discovery & Insights

Understanding the system - users, data, & how teams analyzed customer issues.

Before diving into design, I initiated conversations with RozieAI product owners, data scientists, and Air Canada stakeholders to understand how insights were generated, delivered, and operationalized.

I started here because designing a self-serve workflow without first understanding the existing investigation behavior risked solving the wrong problem — building a faster way to deliver the same static reports, rather than addressing the actual workflow underneath them.

### Who are the users?

The contact centre operations team we were serving mainly consisted of the following two personas:

1. Contact centre managers who were mainly interested in knowing the emerging issues and determining where attention was needed.
2. Operation analysts who focused on understanding issues and tracing them back to specific calls in order to deliver operation insights.

### What type of data was shared?

By surfacing with the data scientist, I learned the taxonomy of data that was shared with the teams:

1. AI-derived signals such as primary topics, root causes, and sentiment helped summarize what customers were experiencing.
2. Operational metadata from the AWS Connect call system, including routing profiles, queues, and agent-level attributes, provided context on who & how those conversations were handled.

![Types of data shared](/assets/conversation-insights/A5%20-%205.svg)

### How did teams analyze customer issues?

In order to understand how Air Canada contact centre teams approached analyzing customer issues, I conducted 6 interviews with team members. I found that insights were rarely consumed in isolation. Instead, they served as starting points for a broader analysis into their operational metadata.

The teams consistently followed this investigation workflow:

![Typical workflow followed](/assets/conversation-insights/workflow.svg)

This workflow enabled teams to take targeted operational actions such as identifying coaching opportunities for agents and refining IVR routing based on emerging customer issues. Ultimately, this workflow model set the foundation for how the product should be designed.

### Key Insights

1. The investigation workflow revealed that insights were not endpoints, but starting points for understanding and resolving customer issues.

2. Teams used call insights to identify issues, then combined it with operational metadata to understand causes, trace impact, and take action.

## Constraints

Business wanted to ship fast and engineering wasn't ready to build new components or patterns.

Two constraints shaped the initial phase. RozieAI needed to demonstrate value to Air Canada ahead of a contract renewal, and a working release (not a wireframe) was what would reinforce that trust. At the same time, engineering had only days, not weeks, to build. There wasn't room to design something new from ground-up for this product, so the product owner made the call: reuse the patterns and components already built for another RozieAI product, rather than design something new here.

I didn't have room to design the ideal solution; the decision was made for the sake of shipping. What I could still control was how we'd know if that decision was wrong. Instead of just shipping and moving on, we set up weekly calls with Air Canada teams, where they'd share their screen and walk through how they were actually using the product to analyze issues. That gave us a plan: ship fast now, and use direct observation, not just what users said but what they actually did, to find out where the reused patterns broke.

## Early Designs

### Initial Product Hypothesis

The investigation workflow I uncovered during discovery gave me a clear structure to design against. Teams consistently moved through four stages — Scope, Identify, Understand, Trace — and the product needed to support that sequence, not just surface data. This shaped three decisions in the initial layout.

#### Visualization Charts for Insights

Charts anchored the middle because identifying patterns (spikes in topic frequency, shifts in sentiment) was how teams moved from "something might be wrong" to "here's what needs attention." I prioritized the visualizations that mapped to the highest-ranked metrics from stakeholder conversations, since those were the signals teams already knew to look for.

#### Data Table for Operational Metadata

The data table followed because tracing operational impact always came last. Once teams identified an issue, they needed to connect it to specific queues, routing profiles, or agents. Placing the table below the charts preserved that natural hand-off from insight to investigation.

#### Column and Date Filters

Filters came first because scoping a time window was always the entry point to any investigation. Without it, teams couldn't frame what they were looking at. I also made date and column filters apply to both the charts and the data table simultaneously, so teams could scope their analysis once and have both information layers update together. Splitting filter state across the two would have forced teams to re-scope twice, partially recreating the fragmentation the product was designed to eliminate.

The deeper constraint I was designing against: AI-derived signals and operational metadata had previously lived in separate places, forcing teams to piece together a picture across reports and systems. Combining both layers in a single scrollable view was the core structural decision, not a layout preference, but a direct response to where the workflow broke down.

## Learnings from User Test Sessions

Evolving designs based on user feedback and constraints.

After releasing the first version of the product, we conducted weekly feedback calls with our users to identify points of friction and additional requirements. Here's a list of all the problems from multiple user test sessions.

### Users preferred direct answers

Over a few weeks of feedback calls, I noticed teams consistently bypassed the interactive charts and went straight to conversation records. When I looked closer at what they actually wanted, it wasn't complex: for a topic like "Bookings," they just wanted to see the label and its call count, like 1,345 calls. That was the insight. They didn't need to hover across a trend line or compare it against other topics to get there.

The chart I designed assumed users wanted to explore how an issue moved over time: is this topic trending up, how does it compare to others this week. But for a lot of what teams needed first, the question wasn't "how is this trending," it was "what are the biggest issues right now, and how many calls does each represent." I'd designed for exploration when what was needed, at least as a starting point, was a direct, scannable summary.

### Filtering didn't scale with complex investigations.

The filter pattern we reused to hit the initial launch, built originally for a product with simpler filtering needs, started breaking down as investigations grew more complex. During the bi-weekly calls, I watched users apply several filters, then struggle to relocate a specific one they'd already set among the chips stacked across the toolbar. Each chip showed only a count ("Primary Topics: 12 selected"), so once five or six were applied, users had to open chips one by one to find the one they actually wanted to check or adjust.

The deeper issue wasn't just the pattern itself; it was what the pattern was doing to the page. Filters had grown to occupy as much visual space as the data they were meant to scope. That inverted the priority of the dashboard: filters are an affordance to control what data is visible, not the content users came to see. Once filtering started competing with the charts and table for attention, the product was asking users to work through the tool before they could get to the information.

### A gap in discovery, not a cut made under pressure.

Another gap that surfaced during feedback calls was that teams relied on operational metrics, like call volume and resolution rate, to decide whether an issue needed attention in the first place. This wasn't something I'd cut for time; it was something my discovery interviews hadn't surfaced. My original interviews focused on how teams moved through an investigation once they'd identified an issue worth digging into. What I hadn't fully asked was: how do you decide something is worth investigating at all? That earlier decision point turned out to depend heavily on these operational numbers, and it was a blind spot in my initial research scope rather than a deliberate tradeoff.

## Solution

### Introducing a Dashboard with Complementary Modes

Over a couple of development sprints, I iteratively refined the product experience based on the observations made in the user test sessions.

The workflow I'd mapped in discovery, Scope, Identify, Understand, Trace, had a natural seam in the middle. Scope and Identify were about noticing something worth attention. Understand and Trace were about digging into why. Keeping both halves on one continuously scrolling page, as the first version did, meant teams were always scrolling past one half to get to the other. I considered keeping a single view and instead reordering sections based on usage frequency, but that only shifted where the scrolling happened, it didn't remove it. Splitting the page into two modes was the only change that matched the seam I'd actually found in the workflow.

### Overview

I introduced Overview as the signal detection layer, surfacing key metrics and insights in a highly scannable format so teams could identify where attention was needed before moving into deeper investigation.

This is also where I addressed the operational metrics gap surfaced during testing. Total Calls, Repeat Call Rate, Issue Resolution Rate, and Average Handle Time now sit at the top of Overview, answering the question my original discovery interviews hadn't asked: how do teams decide something is worth investigating in the first place, before they've identified a specific issue to trace.

#### Design Decisions

| Element | Problem it solves | Why this way |
| --- | --- | --- |
| Overview / Table View tabs | The single scrolling page forced teams to scroll past one half of their workflow to reach the other. | Splits the page along the seam in the investigation workflow itself — Scope/Identify live in Overview, Understand/Trace live in Table View. |
| KPI cards (Repeat Call Rate, Issue Resolution Rate, Average Handle Time) | Teams had no way to judge whether an issue needed attention — the operational context for that decision was missing from v1. | Surfaced above the fold, so the numbers teams use to gauge urgency are the first thing they see, before any exploration is required. |
| Call Volume chart | Teams needed to catch anomalies at a glance to know where to dig in. | A single trend line, not a multi-series comparison — a spike on a specific date is a signal worth investigating further, so the chart only needs to answer "did something unusual happen," not "how does this compare across ten topics." |
| Insight Breakdown (Primary Topics, Customer Intents, Root Causes) | Interactive charts required hovering and comparing to answer a simple ranking question. | Ranked list, label + count — the direct answer teams were bypassing charts to get to (see Learnings). |
| Filters split into "Filters" (column) and date range | Stacked filter chips ate page space and made it hard to relocate an already-applied filter. | Separated by type and collapsed behind a single control each, so filters take a fixed amount of space regardless of how many are applied. Covered in detail below. |

### Insight Cards

To answer "what are the biggest issues right now," I moved away from the trend-line chart and introduced insight cards. My first instinct was a single reusable card template, ranked by count, since that's the simpler system to design and maintain. But teams weren't comparing issues against each other on a shared scale, they were asking distinct questions of each one: how many calls, is this new, is this getting worse. Forcing those into one template would've meant burying the specific answer each card needed to give under a generic layout. So each card's structure follows the comparison it's meant to answer, rather than a single format applied uniformly.

| Card | What It Compares | Why This Format |
| --- | --- | --- |
| Primary Topics / Customer Intents / Root Causes | Which issue is biggest, relative to the others | order |
| Call Resolution | How the total volume of calls splits across outcomes | share of whole |
| Customer Sentiment | How sentiment shifted over the course of a call | change over the call |
| Journey Moments | Where in the traveler's journey calls are originating | Paired stat blocks by journey stage (Pre-Travel, Pre-Flight, At Airport, etc.), with no ranking or bar. Lets teams see which parts of the journey generate the most contact, so they can think about customer service needs stage by stage rather than issue by issue. |

### Table View

The Table View allows users to understand and trace individual call records, exposing call-level summaries and 60+ operational attributes so teams could trace patterns back to specific calls, queues, and routing paths.

At this density, a new friction point surfaced during testing: attributes users needed were often buried around the 40th column, requiring long horizontal scrolling and waiting for columns to load before they were even visible. With 60+ attributes and no way to prioritize, the table was asking every user to work through the same fixed layout regardless of what they were actually investigating.

#### Manage Columns

I introduced Manage Columns to let users control which columns appeared in their table view. I considered reordering the default column set based on aggregate usage data instead, but that would've optimized for the average investigation, not the one in front of a specific user, and different queues and roles cared about different attributes. Giving users direct control removed the scroll-and-wait friction without assuming one fixed priority order could work for everyone.

#### New Filter Pattern

Teams rarely investigated using a single condition. Most investigations relied on layered filters across topics, sentiment, and operational metadata, and the chip-based pattern reused from the earlier product buckled under that load, each chip only showed a count, so five or six applied filters meant opening each one individually just to find the one you wanted to check.

I considered keeping the chip pattern and just improving its density (smaller chips, more per row), but that treated the symptom, not the cause: the pattern was built for a handful of simple filters, not layered, multi-condition queries. I designed a query-based filtering system instead, which supported complex conditions without the interface competing with the charts and table for visual space. Filters and date ranges remained shared across both views, so teams could continue an investigation without rebuilding context when they switched modes.

## Outcomes

Beyond design.

After shipping all the changes, we noticed significant usage within the product and the product stickiness grew as part of our users everyday workflow. Here's a few outcomes from this project.

### Adoption

Adopted by four contact center teams within Air Canada, and demonstrated to three external clients who expressed interest in rollout.

### Business Outcome

Sustained internal use and external interest supported a renewed client contract and generated new feature requests (under NDA), reinforcing the platform's long-term value beyond the initial engagement.

## Reflection

What I learned throughout the project.
