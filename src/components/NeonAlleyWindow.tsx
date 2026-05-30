'use client';

import { motion } from 'framer-motion';

const CodeLine = ({ line }: { line: string }) => {
  if (!line.trim()) return <div className="h-4" />;

  const keywords = /\b(export|default|function|return|const|import|from|as|await|useLife|useExperience)\b/g;
  const components = /\b(Portfolio|Memory|Future|React|Component)\b/g;
  const methods = /\b(map|push|filter|use)\b/g;
  const strings = /(".*?"|'.*?')/g;
  const comments = /(\/\/.*)/g;

  // Combine all patterns into one to split the string into tokens
  const pattern = new RegExp(
    `(${keywords.source})|(${components.source})|(${methods.source})|(${strings.source})|(${comments.source})`,
    'g'
  );

  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(line)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      tokens.push({ text: line.substring(lastIndex, match.index) });
    }

    // Identify which group matched
    if (match[1]) tokens.push({ text: match[1], color: '#569cd6' }); // Keywords
    else if (match[2]) tokens.push({ text: match[2], color: '#4ec9b0' }); // Components
    else if (match[3]) tokens.push({ text: match[3], color: '#dcdcaa' }); // Methods
    else if (match[4]) tokens.push({ text: match[4], color: '#ce9178' }); // Strings
    else if (match[5]) tokens.push({ text: match[5], color: '#6a9955' }); // Comments

    lastIndex = pattern.lastIndex;
  }

  // Add remaining text
  if (lastIndex < line.length) {
    tokens.push({ text: line.substring(lastIndex) });
  }

  return (
    <div className="whitespace-pre">
      {tokens.map((token, i) => (
        <span key={i} style={token.color ? { color: token.color } : {}}>
          {token.text}
        </span>
      ))}
    </div>
  );
};

const codeLines = [
  "import React from 'react';",
  "import { Component } from '@/components';",
  "",
  "export default function Portfolio() {",
  "  const lifeCycle = useLife();",
  "  const experience = useExperience();",
  "  ",
  "  // Compiling memories of a journey...",
  "  const milestones = experience.filter(exp => exp.impact > 90);",
  "  ",
  "  return (",
  "    <div className=\"existence\">",
  "      {milestones.map(exp => (",
  "        <Memory key={exp.id} data={exp} />",
  "      ))}",
  "      <Future status=\"loading\" priority=\"high\" />",
  "    </div>",
  "  );",
  "}",
  "",
  "// System online. Experience recorded.",
  "// Awaiting the next sequence..."
];

export default function NeonAlleyWindow() {
  const repeatedCode = Array(20).fill(codeLines).flat();

  return (
    <div className="w-full h-full overflow-hidden bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[16px] leading-relaxed p-8 select-none pointer-events-none">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-50%' }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {repeatedCode.map((line, i) => (
          <CodeLine key={i} line={line} />
        ))}
      </motion.div>
    </div>
  );
}
