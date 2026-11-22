---
publish: true
created: 2026-10-25T19:04:50.370Z
modified: 2026-11-22T10:08:46.977Z
---

> [!Cite]
> Edge, D., Trinh, H., Cheng, N., Bradley, J., Chao, A., Mody, A., Truitt, S., Metropolitansky, D., Ness, R. O., & Larson, J. (2024). _From Local to Global: A Graph RAG Approach to Query-Focused Summarization_ (Version 2). arXiv. <https://doi.org/10.48550/ARXIV.2404.16130>

> [!Synth]
> **Contribution**::
>
> **Related**::

> [!md]
> **FirstAuthor**:: Edge, Darren\
> **Author**:: Trinh, Ha\
> **Author**:: Cheng, Newman\
> **Author**:: Bradley, Joshua\
> **Author**:: Chao, Alex\
> **Author**:: Mody, Apurva\
> **Author**:: Truitt, Steven\
> **Author**:: Metropolitansky, Dasha\
> **Author**:: Ness, Robert Osazuwa\
> **Author**:: Larson, Jonathan\
> \~\
> **Title**:: From Local to Global: A Graph RAG Approach to Query-Focused Summarization\
> **Year**:: 2024\
> **Citekey**:: edgeLocalGlobalGraph2024\
> **itemType**:: preprint\
> **DOI**:: 10.48550/ARXIV.2404.16130

> [!LINK]
> .

> [!Abstract]
>
> The use of retrieval-augmented generation (RAG) to retrieve relevant information from an external knowledge source enables large language models (LLMs) to answer questions over private and/or previously unseen document collections. However, RAG fails on global questions directed at an entire text corpus, such as "What are the main themes in the dataset?", since this is inherently a query-focused summarization (QFS) task, rather than an explicit retrieval task. Prior QFS methods, meanwhile, do not scale to the quantities of text indexed by typical RAG systems. To combine the strengths of these contrasting methods, we propose GraphRAG, a graph-based approach to question answering over private text corpora that scales with both the generality of user questions and the quantity of source text. Our approach uses an LLM to build a graph index in two stages: first, to derive an entity knowledge graph from the source documents, then to pregenerate community summaries for all groups of closely related entities. Given a question, each community summary is used to generate a partial response, before all partial responses are again summarized in a final response to the user. For a class of global sensemaking questions over datasets in the 1 million token range, we show that GraphRAG leads to substantial improvements over a conventional RAG baseline for both the comprehensiveness and diversity of generated answers.
> .

# Notes

> .

# Annotations
