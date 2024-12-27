export type CustomNode = {  
  x: number;  
  y: number;  
  color?: string;  
};  

export type CustomLink = {  
  source: CustomNode;  
  target: CustomNode;  
  dashed?: boolean;  
  directed?: boolean;
};  

export type NetworkProps = {  
  nodes?: CustomNode[];  
  links?: CustomLink[];  
  width: number;  
  height: number;  
  theme?: Theme;  
  onNodeClick?: (node: CustomNode) => void;  
  onLinkClick?: (link: CustomLink) => void;  
};  