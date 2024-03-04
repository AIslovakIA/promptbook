# ✨ Sample: Parsing data to JSON

-   PTBK URL https://ptbk.example.com/samples/postprocessing-2.ptbk.md@v1
-   PTBK VERSION 1.0.0
-   INPUT  PARAMETER {sentence} Sentence to be processed

<!--Graph-->
<!-- ⚠️ WARNING: This section was auto-generated -->
```mermaid
%% 🔮 Tip: Open this on GitHub or in the VSCode website to see the Mermaid graph visually

flowchart LR
  subgraph "✨ Sample: Parsing data to JSON"

      direction TB

      input[Input]:::hidden
      templateQuestion[💬 Question]
      input--"{sentence}"-->templateQuestion

      classDef hidden display: none;

  end;
```
<!--/Graph-->

## 💬 Question

-   MODEL VARIANT COMPLETION
-   MODEL NAME `gpt-3.5-turbo-instruct`
-   POSTPROCESSING `trimEndOfCodeBlock`
-   Expect JSON

```
Dark horse hopping over the fence.

\`\`\`json
{
  "subject": "horse",
  "action": "hopping",
  "object": "fence"
}
\`\`\`

---

{sentence}

\`\`\`json
```

-> {parsedSentence}
