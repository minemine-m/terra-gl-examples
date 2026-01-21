
export interface DocParameter {
  name: string;
  type: string;
  description: string;
  optional: boolean;
  defaultValue?: string;
}

export interface DocItem {
  name: string;
  signature: string;
  description: string;
  parameters: DocParameter[];
  returns: string;
  source: string;
  flags: string[]; // e.g. 'private', 'readonly'
}

export interface DocPage {
  title: string;
  description: string;
  extends?: string;
  constructors: DocItem[];
  properties: DocItem[];
  methods: DocItem[];
  others: { title: string; content: string }[];
}

export function parseMarkdownDoc(md: string): DocPage {
  const result: DocPage = {
    title: '',
    description: '',
    constructors: [],
    properties: [],
    methods: [],
    others: []
  };

  // Split by top-level headers (## )
  // But first, extract Title (# )
  const titleMatch = md.match(/^# (.*$)/m);
  if (titleMatch) {
    result.title = titleMatch[1].replace('Class: ', '').replace('Interface: ', '');
  }

  // Normalize line endings
  const content = md.replace(/\r\n/g, '\n');
  
  // Split into sections
  const sections = content.split(/\n(?=## )/);
  
  // First section is usually imports + title + description
  const intro = sections.shift() || '';
  // Extract description (text after title)
  const introLines = intro.split('\n');
  const titleIndex = introLines.findIndex(line => line.startsWith('# '));
  if (titleIndex !== -1) {
    result.description = introLines.slice(titleIndex + 1).join('\n').trim();
    // Clean up "Defined in" link from description if it appears immediately
    result.description = result.description.replace(/Defined in:.*(\n|$)/g, '').trim();
  }

  sections.forEach(section => {
    const lines = section.split('\n');
    const headerLine = lines[0];
    const header = headerLine.replace(/^##\s+/, '').trim();
    const body = lines.slice(1).join('\n');

    if (header === 'Constructors') {
      result.constructors = parseItems(body);
    } else if (header === 'Properties') {
      result.properties = parseItems(body);
    } else if (header === 'Methods') {
      result.methods = parseItems(body);
    } else if (header === 'Extends') {
      result.extends = body.trim();
    } else {
      result.others.push({
        title: header,
        content: body
      });
    }
  });

  return result;
}

function parseItems(text: string): DocItem[] {
  // Split by item header (### )
  const items = text.split(/\n(?=### )/).filter(s => s.trim().length > 0);
  
  return items.map(itemText => {
    const lines = itemText.split('\n');
    const nameLine = lines[0];
    const name = nameLine.replace(/^###\s+/, '').trim();
    const content = lines.slice(1).join('\n');

    const docItem: DocItem = {
      name,
      signature: '',
      description: '',
      parameters: [],
      returns: '',
      source: '',
      flags: []
    };

    // Extract Flags (private, readonly, etc) often found in signature or name line
    // But in the example, they are in the > block: > `private` `readonly` **_clock**: `Clock`

    // Extract Signature (> block)
    const signatureMatch = content.match(/>\s*(.*?)(?=\n\n|\n$)/s);
    if (signatureMatch) {
      docItem.signature = signatureMatch[1].replace(/\*\*/g, '').trim();
      
      // Try to extract flags from signature
      if (docItem.signature.includes('`private`')) docItem.flags.push('private');
      if (docItem.signature.includes('`protected`')) docItem.flags.push('protected');
      if (docItem.signature.includes('`readonly`')) docItem.flags.push('readonly');
      if (docItem.signature.includes('`optional`')) docItem.flags.push('optional');
    }

    // Extract Source (Defined in ...) - REMOVED as per user request
    // const sourceMatch = content.match(/Defined in: (\[.*?\]\(.*?\))/);
    // if (sourceMatch) {
    //   docItem.source = sourceMatch[1];
    // }

    // Extract Parameters
    // Pattern: #### Parameters \n ... content ...
    // Inside Parameters: ##### paramName \n description \n type
    const paramSectionMatch = content.match(/\n#### Parameters\n([\s\S]*?)(?=\n####|$)/);
    if (paramSectionMatch) {
      const paramSection = paramSectionMatch[1];
      // Split parameters by #####
      const rawParams = paramSection.split(/\n(?=##### )/).filter(p => p.trim());
      
      docItem.parameters = rawParams.map(p => {
        const pLines = p.split('\n').filter(l => l.trim());
        const pNameRaw = pLines[0].replace(/^#####\s+/, '').trim();
        const optional = pNameRaw.endsWith('?');
        const pName = optional ? pNameRaw.slice(0, -1) : pNameRaw;
        
        // Usually: Name \n Description \n Type
        // Sometimes: Name \n Type (if no desc)
        // Let's look at the example:
        // ##### container?
        // 容器元素或选择器字符串
        // `string` | `HTMLElement`
        
        // Another example:
        // ##### options?
        // [`ViewerOptions`](...) = `{}`
        // 配置选项

        // This is tricky. Let's assume the last line is type if it contains backticks?
        // Or structured approach:
        // 1. Name
        // 2. Type (often code block or link)
        // 3. Description (text)
        
        let type = '';
        let desc = '';
        
        const restLines = pLines.slice(1);
        
        // Find line with type (usually wrapped in backticks or is a link)
        // Heuristic: Type usually contains ` or [ ]
        const typeLineIndex = restLines.findIndex(l => l.includes('`') || l.includes('[') || l.includes(' = '));
        
        if (typeLineIndex !== -1) {
          type = restLines[typeLineIndex].trim();
          // Description is everything else
          desc = restLines.filter((_, i) => i !== typeLineIndex).join(' ').trim();
        } else {
          // Fallback
          desc = restLines.join(' ');
        }

        return {
          name: pName,
          optional,
          type,
          description: desc
        };
      });
    }

    // Extract Returns
    const returnsMatch = content.match(/\n#### Returns\n([\s\S]*?)(?=\n####|$)/);
    if (returnsMatch) {
      docItem.returns = returnsMatch[1].trim();
    }

    // Extract Description (everything else that isn't matched above)
    // Remove Signature
    let cleanDesc = content.replace(/>\s*.*?(?=\n\n|\n$)/s, '');
    
    // Remove Source (Aggressive removal)
    cleanDesc = cleanDesc.replace(/Defined in:.*(\n|$)/g, '');
    
    // Remove Parameters section
    cleanDesc = cleanDesc.replace(/\n#### Parameters[\s\S]*?(?=\n####|$)/, '');
    // Remove Returns section
    cleanDesc = cleanDesc.replace(/\n#### Returns[\s\S]*?(?=\n####|$)/, '');
    // Remove Overrides/Inherited sections
    cleanDesc = cleanDesc.replace(/\n#### (Overrides|Inherited from)[\s\S]*?(?=\n####|$)/, '');
    // Remove separators
    cleanDesc = cleanDesc.replace(/\*\*\*/g, '');
    
    docItem.description = cleanDesc.trim();

    return docItem;
  });
}
