---
publish: true
created: 2026-10-25T19:00:52.323Z
modified: 2026-11-22T10:08:49.031Z
---

> [!Cite]
> Ren, Q., Li, H., Liu, D., Xie, Z., Lu, X., Qiao, Y., Sha, L., Yan, J., Ma, L., & Shao, J. (2024). _LLMs know their vulnerabilities: Uncover Safety Gaps through Natural Distribution Shifts_ (Version 3). arXiv. <https://doi.org/10.48550/ARXIV.2410.10700>

> [!Synth]
> **Contribution**::
>
> **Related**::

> [!md]
> **FirstAuthor**:: Ren, Qibing\
> **Author**:: Li, Hao\
> **Author**:: Liu, Dongrui\
> **Author**:: Xie, Zhanxu\
> **Author**:: Lu, Xiaoya\
> **Author**:: Qiao, Yu\
> **Author**:: Sha, Lei\
> **Author**:: Yan, Junchi\
> **Author**:: Ma, Lizhuang\
> **Author**:: Shao, Jing\
> \~\
> **Title**:: LLMs know their vulnerabilities: Uncover Safety Gaps through Natural Distribution Shifts\
> **Year**:: 2024\
> **Citekey**:: renLLMsKnowTheir2024\
> **itemType**:: preprint\
> **DOI**:: 10.48550/ARXIV.2410.10700

> [!LINK]
> .

> [!Abstract]
>
> Safety concerns in large language models (LLMs) have gained significant attention due to their exposure to potentially harmful data during pre-training. In this paper, we identify a new safety vulnerability in LLMs: their susceptibility to \textit{natural distribution shifts} between attack prompts and original toxic prompts, where seemingly benign prompts, semantically related to harmful content, can bypass safety mechanisms. To explore this issue, we introduce a novel attack method, \textit{ActorBreaker}, which identifies actors related to toxic prompts within pre-training distribution to craft multi-turn prompts that gradually lead LLMs to reveal unsafe content. ActorBreaker is grounded in Latour's actor-network theory, encompassing both human and non-human actors to capture a broader range of vulnerabilities. Our experimental results demonstrate that ActorBreaker outperforms existing attack methods in terms of diversity, effectiveness, and efficiency across aligned LLMs. To address this vulnerability, we propose expanding safety training to cover a broader semantic space of toxic content. We thus construct a multi-turn safety dataset using ActorBreaker. Fine-tuning models on our dataset shows significant improvements in robustness, though with some trade-offs in utility. Code is available at https://github.com/AI45Lab/ActorAttack.
> .

# Notes

> ## Other

ACL 2025 main conference. Code is available at https://github.com/AI45Lab/ActorAttack.

# Annotations
