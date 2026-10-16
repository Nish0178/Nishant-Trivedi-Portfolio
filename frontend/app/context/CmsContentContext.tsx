"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  PublicContentPayload,
  FALLBACK_PUBLIC_CONTENT,
  fetchPublicCmsContent,
} from "@/lib/api/content";

interface CmsContentContextType {
  content: PublicContentPayload;
  loading: boolean;
  refresh: () => Promise<void>;
}

const CmsContentContext = createContext<CmsContentContextType>({
  content: FALLBACK_PUBLIC_CONTENT,
  loading: true,
  refresh: async () => {},
});

export function CmsContentProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [content, setContent] = useState<PublicContentPayload>(FALLBACK_PUBLIC_CONTENT);
  const [loading, setLoading] = useState(true);

  const loadContent = useCallback(async () => {
    try {
      const data = await fetchPublicCmsContent();
      if (data) {
        setContent(data);
      }
    } catch (err) {
      console.warn("Could not load fresh CMS content, using fallbacks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const contextValue = useMemo(
    () => ({ content, loading, refresh: loadContent }),
    [content, loading, loadContent]
  );

  return (
    <CmsContentContext.Provider value={contextValue}>
      {children}
    </CmsContentContext.Provider>
  );
}

export function useCmsContent(): CmsContentContextType {
  const ctx = useContext(CmsContentContext);
  if (!ctx) {
    return {
      content: FALLBACK_PUBLIC_CONTENT,
      loading: false,
      refresh: async () => {},
    };
  }
  return ctx;
}
