"use client";

import React, { useState, useEffect } from "react";
import {
  ContactMessageRecord,
  fetchAdminMessages,
  markAdminMessageRead,
  deleteAdminMessage,
} from "@/lib/api/admin";

export default function MessagesTab() {
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageRecord | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminMessages();
      setMessages(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to fetch contact messages." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (m: ContactMessageRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newStatus = !m.read;
    const ok = await markAdminMessageRead(m.id, newStatus);
    if (ok) {
      setMessages((prev) =>
        prev.map((item) => (item.id === m.id ? { ...item, read: newStatus } : item))
      );
      if (selectedMessage && selectedMessage.id === m.id) {
        setSelectedMessage({ ...selectedMessage, read: newStatus });
      }
    }
  };

  const handleDelete = async (id: number, sender: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete transmission from "${sender}"?`)) return;

    const ok = await deleteAdminMessage(id);
    if (ok) {
      setFeedback({ type: "success", message: `Transmission #${id} deleted.` });
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      loadMessages();
    } else {
      setFeedback({ type: "error", message: "Failed to delete transmission." });
    }
  };

  const handleOpenDetails = async (m: ContactMessageRecord) => {
    setSelectedMessage(m);
    if (!m.read) {
      // Automatically mark as read when inspected
      await markAdminMessageRead(m.id, true);
      setMessages((prev) =>
        prev.map((item) => (item.id === m.id ? { ...item, read: true } : item))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            SECURE COMMUNICATIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Contact Messages & Transmissions
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Persisted visitor transmissions from the public contact terminal.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadMessages}
            disabled={loading}
            className="px-3.5 py-2 rounded-lg bg-[#141824] hover:bg-[#1c2233] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <span className={loading ? "animate-spin" : ""}>↻</span>
            <span>REFRESH INBOX</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs font-mono flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          <span>{feedback.message}</span>
          <button
            onClick={() => setFeedback(null)}
            className="text-zinc-400 hover:text-white ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages Feed */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
          FETCHING INBOX FROM POSTGRESQL...
        </div>
      ) : messages.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0e111a] border border-white/10 text-zinc-400 text-xs font-mono">
          No transmissions received yet. The contact inbox is clear.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              onClick={() => handleOpenDetails(m)}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !m.read
                  ? "bg-[#141824]/90 border-amber-500/40 shadow-lg shadow-amber-500/5"
                  : "bg-[#0e111a] border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {!m.read && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  )}
                  <span className="text-sm font-semibold text-white">
                    {m.name}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    &lt;{m.email}&gt;
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {new Date(m.createdAt).toLocaleString()}
                  </span>
                  {m.emailStatus && (
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                        m.emailStatus === "SENT"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : m.emailStatus === "FAILED"
                          ? "bg-red-500/10 border-red-500/30 text-red-400"
                          : "bg-zinc-800 border-zinc-700 text-zinc-400"
                      }`}
                    >
                      Email: {m.emailStatus}
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-amber-300 font-medium">
                  {m.subject || "General Inquiry"}
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2">
                  {m.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={(e) => handleToggleRead(m, e)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono uppercase cursor-pointer transition-all ${
                    m.read
                      ? "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                  }`}
                >
                  {m.read ? "MARK UNREAD" : "MARK READ"}
                </button>
                <button
                  onClick={(e) => handleDelete(m.id, m.name, e)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 cursor-pointer transition-all"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
                  TRANSMISSION DETAILS #{selectedMessage.id}
                </div>
                <h3 className="text-xl font-normal text-white">
                  {selectedMessage.subject || "Contact Submission"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-zinc-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#141824] border border-white/5">
                <div>
                  <span className="text-zinc-400">SENDER:</span>{" "}
                  <span className="text-white font-sans font-semibold">
                    {selectedMessage.name}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400">EMAIL:</span>{" "}
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-amber-400 underline hover:text-amber-300"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-400">TIMESTAMP:</span>{" "}
                  <span className="text-zinc-200">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400">STATUS:</span>{" "}
                  <span className="text-emerald-400">
                    PERSISTED IN POSTGRESQL
                  </span>
                </div>
              </div>

              <div>
                <div className="text-zinc-400 uppercase mb-2">
                  TRANSMISSION BODY:
                </div>
                <div className="p-4 rounded-xl bg-[#141824] border border-white/5 text-zinc-200 text-sm font-sans whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              {selectedMessage.emailError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                  <span className="font-bold">EMAIL NOTICE:</span> {selectedMessage.emailError}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                  `Re: ${selectedMessage.subject || "Your message to Nishant Trivedi"}`
                )}`}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs font-mono transition-all"
              >
                REPLY VIA EMAIL →
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRead(selectedMessage)}
                  className="px-3 py-2 rounded-lg bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono uppercase cursor-pointer"
                >
                  {selectedMessage.read ? "MARK UNREAD" : "MARK READ"}
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                  className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono uppercase cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
