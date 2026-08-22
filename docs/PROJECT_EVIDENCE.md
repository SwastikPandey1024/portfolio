# PROJECT EVIDENCE REGISTRY

**Purpose:** Verified source of truth for portfolio case studies.

**Rule:** Every public claim, metric, technology, architecture statement, screenshot caption, and outcome used on the portfolio must be supported here or by an explicitly linked primary source.

---

# 01 — SALESPULSE AI

## Identity

**Name:** SalesPulse AI
**Domain:** Business / Retail Intelligence
**Narrative:** AI → Decisions

**Repository:**
https://github.com/SwastikPandey1024/SalesPulse_AI

**Live Application:**
https://salespulseai.streamlit.app

## Verified Positioning

> Intelligent enterprise sales analytics, multi-horizon forecasting and business simulation engine.

## Verified Capabilities

* XGBoost Regressor
* RandomForest Regressor
* Ensemble blending
* 7-day forecasting
* 14-day forecasting
* 30-day forecasting
* 95% confidence prediction bands
* business “what-if” scenario simulation
* Superstore EDA Explorer
* smart batch processing
* KPI dashboard
* feature importance visualization
* strict input validation
* Streamlit deployment

## Verified Data

* Superstore dataset
* 9,994 records
* 21 columns
* 13 engineered forecasting features

## Verified Engineering Story

```text
Raw Sales Data
      ↓
Feature Engineering
      ↓
Model Selection
      ↓
Forecasting
      ↓
Scenario Simulation
      ↓
Business Decision Support
```

## Verified Metrics

* MAE: approximately $55–65 in the documented project baseline
* Baseline MAE: approximately $72–80 in the documented project material

NOTE:
Use the latest repository documentation as the authoritative source for version-specific metrics.

## Visual Assets Needed

* hero_overview
* single prediction
* multi-day forecast
* scenario simulator
* EDA analytics
* model benchmark
* batch processing

## Case Study Questions

* What business problem was being solved?
* Why forecasting rather than descriptive analytics alone?
* Why XGBoost / RandomForest / ensemble?
* How were temporal features engineered?
* How does the scenario simulator change decision-making?
* What were the validation constraints?
* What did the implementation teach me?

---

# 02 — DOCUCHAT

## Identity

**Name:** DocuChat
**Domain:** Knowledge / Document Intelligence
**Narrative:** AI → Knowledge

**Repository:**
https://github.com/SwastikPandey1024/DocMind

## Naming Rule

DocMind and DocuChat refer to the same document-intelligence work.

Public portfolio name:

> **DocuChat**

Never use “DocMind” in the portfolio.

## Verified Positioning

AI-powered document interaction system enabling natural-language querying of uploaded documents.

## Verified Capabilities

* document upload
* document preprocessing
* content processing
* natural-language querying
* LLM integration
* embeddings
* semantic search
* vector databases
* RAG
* prompt engineering

## Verified Pipeline

```text
Document Upload
      ↓
Preprocessing
      ↓
Embeddings
      ↓
Semantic Retrieval
      ↓
Context Injection
      ↓
LLM Response
```

## Verified Internship Context

Developed during:

**Software Intern — AI/ML, CBSL Group**

Relevant documented exposure:

* document processing
* RAG
* text embeddings
* semantic search
* vector databases
* prompt engineering
* AI model integration

## Claims We MUST NOT Invent

Do not state:

* 75% reduction in review time
* production user count
* enterprise ROI
* sub-second retrieval
* specific latency
* specific vector database
* specific OCR benchmark

unless independently verified by project evidence.

## Visual Assets Needed

* main application screenshot
* document upload state
* retrieval / answer state
* architecture diagram
* optional embedding/retrieval visual

---

# 03 — MELI AI COMPANION

## Identity

**Name:** Meli — Ambient AI Desktop Companion
**Domain:** Human-AI Interaction / Ambient Computing
**Narrative:** AI → Interaction

**Repository:**
https://github.com/SwastikPandey1024/meli-ambient-ai-companion

## Verified Positioning

> Intelligent, responsive and aesthetically refined desktop companion powered by LLM reasoning, retrieval, voice intelligence and native desktop interaction.

## Verified Capabilities

* LLM reasoning
* local/vector RAG
* voice intelligence
* push-to-talk
* Whisper transcription
* text-to-speech
* tool execution
* auditable permissions
* PostgreSQL conversation storage
* Elasticsearch BM25 retrieval
* native Tauri desktop shell
* React frontend
* FastAPI backend
* Rust / Tauri layer
* visual state engine
* interactive physics

## Verified Visual State System

16 documented visual states exist.

Examples include:

* idle
* curious
* happy
* thinking
* working
* focused
* sleepy
* confused
* surprised
* error
* complete
* greeting
* click_pet
* sink_pop
* proximity
* celebration

## Verified Testing

* Frontend Vitest: 80/80
* Backend Pytest: 52/52
* Phase 0 sprite QA: 13/13
* Motion/sizing QA: 7/7

## Core Meli Flow

```text
UNDERSTAND
   ↓
REMEMBER
   ↓
RETRIEVE
   ↓
REASON
   ↓
ACT
   ↓
REPORT RESULT
```

## Portfolio Guide Role

Meli may also act as an optional guide for the personal portfolio.

Requirements:

* optional
* non-blocking
* mute
* disable
* skip
* keyboard accessible
* no autoplay audio

## Visual Assets Needed

* main desktop UI
* character states
* chat drawer
* voice interface
* memory / retrieval view
* tool execution state
* optional architecture diagram

---

# 04 — MEDVISION AI

## Identity

**Name:** MedVision-AI
**Domain:** Healthcare / Computer Vision
**Narrative:** AI → Visual Intelligence

**Repository:**
https://github.com/SwastikPandey1024/MedVision-AI

## Verified Positioning

> Explainable chest X-ray pneumonia detection research application.

## Important Disclaimer

This is an:

**educational / AI research demonstration**

It is NOT a certified medical device and must NOT be presented as a clinical diagnostic system.

## Verified Dataset

RSNA Pneumonia Detection Challenge dataset.

Documented values:

* 26,684 unique patients/images
* 20,672 normal / no lung opacity
* 6,012 pneumonia / lung opacity
* 0 duplicate patient records
* 0 missing image files
* 0 malformed bounding boxes
* 100% target label consistency

## Verified Split Strategy

Patient-level group-aware splitting.

* Train: 70%
* Validation: 15%
* Test: 15%
* patient overlap: 0.0%

## Verified Technical Work

* preprocessing engine
* tf.data pipeline
* custom CNN baseline
* DenseNet121 transfer learning
* controlled fine-tuning
* BatchNorm protection
* hyperparameter/data experiments
* evaluation
* threshold selection

## Current Roadmap

Future / not-yet-complete areas include:

* Grad-CAM explainability
* Flask API
* Streamlit UI
* Docker
* cloud deployment
* full end-to-end testing/release

Do not present these unfinished phases as completed.

## Visual Assets Needed

* X-ray example
* dataset / EDA view
* model architecture
* training / evaluation visual
* prediction interface if available
* future explainability concept only if clearly labelled as planned

---

# 05 — SECONDARY ENGINEERING LAB

## GRIDCAST AI

Domain:
Time-series / Production ML

Verified themes:

* electricity demand forecasting
* PJME benchmark data
* DST-aware data engineering
* temporal features
* chronological validation
* leakage audit
* XGBoost
* Flask REST API
* Streamlit
* Docker
* 60/60 tests
* live deployment

Verified production XGBoost test results:

* MAE: 307.10 MW
* RMSE: 408.07 MW
* MAPE: 0.98%
* R²: 0.9960

Live:

https://gridcastai.streamlit.app

Repository:

https://github.com/SwastikPandey1024/-GridCast-AI

---

## AI CYBERSHIELD

Domain:
Cybersecurity / ML / API Engineering

Verified themes:

* CICIDS2017
* 2.57M clean rows
* 75 features
* Decision Tree baseline
* class-balanced RandomForest
* XGBoost
* FastAPI inference
* threat dashboard
* Docker
* automated testing
* Render deployment

Verified model figures:

* 99.88% accuracy
* 0.9637 macro F1
* 0.9988 weighted F1

Live:

https://ai-cybershield-zkw3.onrender.com

Repository:

https://github.com/SwastikPandey1024/AI-CyberShield

---

## TRIVIAPAY

Domain:
FinTech / Blockchain

Themes:

* campus finance
* digital wallet
* peer-to-peer payments
* AI insights
* blockchain
* Algorand
* React
* Node.js

Use verified repository information before publishing numerical claims.

Repository

https://github.com/SwastikPandey1024/TriviaPay_Project

---

## F1 RACE REPLAY

Domain:
Open Source / Motorsport Analytics

Themes:

* telemetry
* data processing
* visualization
* open source

Only publish contribution claims supported by repository/project evidence.

---

## AGENTICOS

Domain:
Agentic AI / Open Source

Themes:

* AI agents
* agentic workflows
* intelligent software systems

Only publish verified repository details.

---

# 06 — CROSS-PROJECT IMPACT DATA

Potential verified evidence for homepage metrics:

* 108K+ tweets analysed
* 9,994 retail sales records
* 2.57M cybersecurity rows
* 26,684 MedVision images/patients
* 60/60 GridCast tests
* 80/80 Meli frontend tests
* 52/52 Meli backend tests

Before rendering a metric publicly:

1. verify source
2. verify current version
3. identify exact context
4. label correctly

---

# 07 — PORTFOLIO NARRATIVE

The four flagship projects represent four domain applications of AI:

```text
SalesPulse
Business → Prediction → Decision

DocuChat
Documents → Retrieval → Knowledge

Meli
Human → Memory → Reasoning → Action

MedVision
Images → Deep Learning → Evaluation
```

The portfolio's core thesis:

> **AI becomes valuable when engineered around a real problem, real constraints and a real user.**
