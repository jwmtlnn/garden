---
publish: true
created: 2026-11-01T18:05:59.254Z
modified: 2026-11-22T10:08:46.619Z
---

> [!Cite]
> Chavan, A. (2026). _Constrained Decoding Eliminates Structural Failures in Small LLMs but Reveals a Scale-Dependent Semantic Gap_ (Version 1). arXiv. <https://doi.org/10.48550/ARXIV.2609.23742>

> [!Synth]
> **Contribution**::
>
> **Related**::

> [!md]
> **FirstAuthor**:: Chavan, Akash\
> \~\
> **Title**:: Constrained Decoding Eliminates Structural Failures in Small LLMs but Reveals a Scale-Dependent Semantic Gap\
> **Year**:: 2026\
> **Citekey**:: chavanConstrainedDecodingEliminates2026\
> **itemType**:: preprint\
> **DOI**:: 10.48550/ARXIV.2609.23742

> [!LINK]
> .

> [!Abstract]
>
> Small open-source large language models (LLMs) in the 0.6B-4B parameter range are increasingly deployed for structured output generation (JSON, function calling, data extraction), yet little is known about how constrained decoding (CD) interacts with model scale in this regime. We benchmark five models from three families across 14 structured-output tasks under three decoding conditions (native, Outlines, XGrammar). We introduce a two-axis evaluation that separates structural correctness (schema validity) from semantic correctness (content accuracy). We find that CD eliminates all structural failures across all models (schema validity: 78.6-92.9% to 100%), but content accuracy reveals a persistent semantic gap that is scale-dependent: type coercion failures are fully CD-rescuable, while instruction-semantic failures (e.g., multi-step function calling) remain CD-resistant. Schema conformance is necessary but not sufficient for semantic correctness; CD's reach ends exactly where schema conformance ends.
> .

# Notes

> ## Other

6 pages, ACL format Code and task suite: https://github.com/CruiseDevice/small-llm-structured-benchmark (tag v1.0).

# Annotations
