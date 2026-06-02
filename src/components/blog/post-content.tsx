'use client';

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  // Split content into paragraphs and render with proper formatting
  const paragraphs = content.trim().split('\n\n').filter(p => p.trim());

  return (
    <div className="max-w-none">
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();

        // Bold section headers like "**Writing and Content Creation**"
        if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
          const text = trimmed.replace(/^\*\*|\*\*$/g, '');
          return (
            <h2 key={i} className="mt-10 mb-4 text-xl font-bold text-neutral-900 dark:text-white">
              {text}
            </h2>
          );
        }

        // Bold intro lines like "**Claude** is..."
        if (trimmed.startsWith('**')) {
          return (
            <p key={i} className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {renderInlineFormatting(trimmed)}
            </p>
          );
        }

        // Bullet points
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="mt-4 space-y-2 pl-1">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  <span>{renderInlineFormatting(item.replace(/^- /, '').trim())}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered sections like "**1. Email Triage**"
        if (/^\*\*\d+\./.test(trimmed)) {
          return (
            <div key={i} className="mt-6 rounded-xl border border-neutral-100 bg-neutral-50/50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="text-base font-semibold text-neutral-900 dark:text-white">
                {renderInlineFormatting(trimmed)}
              </div>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="mt-4 text-base leading-[1.8] text-neutral-600 dark:text-neutral-400">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Handle **bold** text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-neutral-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
