
export enum GenerationMode {
  Mockup = "Mockup",
  Swap = "Swap",
  Analyze = "Analyze",
}

export enum AspectRatio {
  Square = "1:1",
  Landscape = "16:9",
  Classic = "4:3",
  Portrait = "3:4",
  Story = "9:16",
}

export interface PromptTemplate {
  id: string;
  name: string;
  prompt: string;
}
