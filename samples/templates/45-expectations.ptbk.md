# ✨ Sample: Expectations

-   PTBK URL https://ptbk.example.com/samples/postprocessing-2.ptbk.md@v1
-   PTBK VERSION 1.0.0
-   INPUT  PARAMETER {yourName} Name of the hero

<!--Graph-->
<!-- ⚠️ WARNING: This section was auto-generated -->
```mermaid
%% 🔮 Tip: Open this on GitHub or in the VSCode website to see the Mermaid graph visually

flowchart LR
    subgraph "✨ Sample: Expectations"

        direction TB

        input[Input]


        templateQuestion[💬 Question]
        input--"{yourName}"-->templateQuestion





    end
```
<!--/Graph-->

## 💬 Question

-   MODEL VARIANT CHAT
-   MODEL NAME `gpt-3.5-turbo`
-   EXPECT MAX 30 CHARACTERS
-   EXPECT MIN 2 CHARACTERS
-   EXPECT MAX 3 WORDS
-   EXPECT EXACTLY 1 SENTENCE
-   EXPECT EXACTLY 1 LINE

```markdown
Hello {yourName}!
```

-> {greeting}
