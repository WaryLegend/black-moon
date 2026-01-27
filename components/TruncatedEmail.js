"use client";

import { useState } from "react";

export default function TruncatedEmail({ email, maxLength = 20 }) {
  const [copied, setCopied] = useState(false);

  // Smart truncate: show start + end, keep @ visible and meaningful
  const getDisplayEmail = () => {
    if (email.length <= maxLength) return email;

    const [local, domain] = email.split("@");
    const visibleLocalChars = 6; // e.g. "john...
    const visibleDomainChars = 8; // ...example.com

    const truncatedLocal = local.slice(0, visibleLocalChars);
    const truncatedDomain = domain.slice(-visibleDomainChars);

    return `${truncatedLocal}...@${truncatedDomain}`;
  };

  const displayEmail = getDisplayEmail();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="group text-accent-600 hover:text-accent-700 relative inline-block cursor-pointer font-medium"
      onClick={copyToClipboard}
      title="Click to copy"
    >
      <span className="transition-all group-hover:underline">
        {displayEmail}
      </span>

      {/* Beautiful tooltip */}
      <span className="bg-primary-800 text-primary-0 pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded px-3 py-1.5 text-sm whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
        {copied ? "Copied!" : email}
        <svg
          className="text-primary-800 absolute top-full left-1/2 -translate-x-1/2"
          width="16"
          height="8"
          viewBox="0 0 16 8"
          fill="currentColor"
        >
          <path d="M0 0L8 8L16 0" />
        </svg>
      </span>
    </div>
  );
}
