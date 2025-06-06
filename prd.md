# Product requirements document for Promptosaurus
## Terminology definitions
- **Prompt**: A Prompt is a set of instructions that are used as input for LLM models.
- **Prompt element**: A Prompt element is a distinct component or section of a Prompt that serves a specific purpose.
- **Custom Prompt element**: A custom Prompt element is a Prompt element that is created by the user.
- **Prompt output**: The output of a Prompt is the result of the LLM model's processing of the Prompt.
- **Prompt template**: A Prompt template includes the Prompt with the possibility to extend it with Prompt elements and Custom Prompt elements. Also, it includes the Prompt output.
- **Prompt element template**: A Prompt element template includes one Prompt element with the possibility to extend it, e.g. with a Custom Prompt element. 

# Features
- Convert prPromptompt elements to different formats (xml, yaml, json, markdown)
- Save Prompts
- Load saved Prompts
- Add custom Prompt elements
- Create Prompt element content templates
- Load Prompt element content templates
- Estimate Prompt token count
