# PORTFOLIO ASSET MANIFEST

## Status

PRE-IMPLEMENTATION

This document tracks all visual assets required for the portfolio.

---

# BRAND

## Profile

`assets/brand/swastik-profile.png`

Purpose:
Hero portrait / About section

Status:
NEEDS FINAL ASSET

Requirements:

* high resolution
* clean crop
* editorial composition
* transparent or compatible background preferred
* optimized WebP/AVIF derivative for production

---

## Social Preview

`assets/brand/swastik-og.png`

Purpose:
Open Graph / social sharing image

Status:
TO CREATE

Target:

1200 × 630

---

# SALESPULSE

Directory:

`assets/projects/salespulse/`

Required:

```text
hero-overview
single-prediction
multi-day-forecast
scenario-simulator
eda-analytics
model-benchmarks
batch-processing
```

Preferred formats:

* WebP
* AVIF

Optional:

* short demo video
* architecture diagram
* forecast chart crop

---

# DOCUCHAT

Directory:

`assets/projects/docuchat/`

Required:

```text
hero-ui
document-upload
retrieval-answer
architecture
```

Optional:

```text
embedding-flow
semantic-search
vector-retrieval
```

Important:

Do not expose secrets, API keys, private documents or personally identifiable information.

---

# MELI

Directory:

`assets/projects/meli/`

Required:

```text
main-desktop
chat-interface
character-states
voice-interface
memory-retrieval
tool-execution
```

Optional:

```text
architecture
permission-system
state-machine
```

Preferred:

Short visual clips where useful.

Never autoplay audio.

---

# MEDVISION

Directory:

`assets/projects/medvision/`

Required:

```text
xray-sample
dataset-analysis
model-architecture
evaluation
```

Optional:

```text
training
prediction
explainability-concept
```

Medical data must be handled carefully.

Do not publish identifiable patient information.

---

# SOCIAL / SEO

Directory:

`assets/social/`

Potential assets:

```text
og-home.webp
og-salespulse.webp
og-docuchat.webp
og-meli.webp
og-medvision.webp
```

---

# IMAGE PROCESSING RULES

Original assets may be retained locally.

Production assets should preferably be:

* AVIF
* WebP

Provide responsive sizes where useful.

Do not ship massive source PNG/JPEG files unnecessarily.

---

# ASSET NAMING

Use:

```text
lowercase-kebab-case.ext
```

Example:

`scenario-simulator.webp`

Avoid:

```text
Screenshot 2026-08-22 123456.png
final-final-v2.png
image123.png
```

---

# ASSET QUALITY STANDARD

Every asset should answer at least one question:

* What does this system look like?
* What does this system do?
* How does this system work?
* What result did it produce?

Do not add images merely to fill whitespace.

---

# REQUIRED METADATA

Every visual used in a case study should have:

* alt text
* project association
* purpose
* source
* optimization status
