'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ChannelIO?: (...args: unknown[]) => void;
    ChannelIOInitialized?: boolean;
  }
}

const CHANNEL_PLUGIN_KEY = '1c493ad6-7c00-4c2e-bc58-2e0419446c55';

export default function ChatBot() {
  useEffect(() => {
    if (window.ChannelIOInitialized) return;

    const ch = function (...args: unknown[]) {
      ch.c(args);
    } as typeof window.ChannelIO & { c: (args: unknown[]) => void; q: unknown[][] };

    ch.q = [];
    ch.c = function (args: unknown[]) {
      ch.q.push(args as unknown[]);
    };
    window.ChannelIO = ch;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);

    script.onload = () => {
      window.ChannelIOInitialized = true;
      if (window.ChannelIO) {
        (window.ChannelIO as (...args: unknown[]) => void)('boot', {
          pluginKey: CHANNEL_PLUGIN_KEY,
        });
      }
    };
  }, []);

  return null;
}
