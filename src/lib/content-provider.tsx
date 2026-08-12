'use client';

import React, { createContext, useContext } from 'react';

const ContentContext = createContext<Record<string, string>>({});

export function ContentProvider({ content, children }: { content: Record<string, string>; children: React.ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): Record<string, string> {
  return useContext(ContentContext);
}
