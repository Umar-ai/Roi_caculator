import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "@/lib/gemini";
import { marked } from "marked";
export async function POST(req:Request){
    const data=await req.json()
    const prompt = ChatPromptTemplate.fromTemplate(
`You are a smart business agent.

A user needs help deciding whether to sell a product as **used** or **refurbished**.

They provide:
- Cost price: {cost_price}
- Refurbished price: {refurbished_price}
- Parts cost: {parts_cost}
- Used price: {used_price}

### Task:
1. Calculate the net profit in each case.
2. Present a simple **Profit & Loss (P&L) summary** like this:

\`\`\`markdown
### P&L Projection

| Option        | Revenue | Cost      | Net Profit |
|---------------|---------|-----------|------------|
| Refurbished     | $___    | $___      | $___       |
| Used            | $___    | $___      | $___       |
\`\`\`

3. Recommend the more profitable option with a brief explanation.`
);
const rawResult = prompt.pipe(model)
const result = await rawResult.invoke({cost_price:data.cost_price,refurbished_price:data.refurbished_price,parts_cost:data.parts_cost,used_price:data.used_price});
const formatPrompt = ChatPromptTemplate.fromTemplate(
  `Reformat the following analysis into a beautiful, markdown-style report with a clear P&L table and bullet-pointed recommendation do not include content like Here's the reformatting of your analysis into a beautiful, markdown-style report::\n\n"{raw_summary}"`
);
const chain2 = formatPrompt.pipe(model);
const formattedResult = await chain2.invoke({
    raw_summary: result.content
  });
  const markdown =
  typeof formattedResult.content === "string"
    ? formattedResult.content
    : ""
const html=marked.parse(markdown)

    if(!formattedResult){
      return Response.json({success:false,message:"something went wrong while generating the summary"},{status:500})
      
    }
    return Response.json({success:true,message:"result generated",summary:html},{status:200})
}


