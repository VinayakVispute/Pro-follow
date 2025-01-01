"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeftIcon } from 'lucide-react';
import { useRef, useState, useEffect, useId } from "react";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

interface PopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialNote: string | undefined;
  onSubmit: (note: string) => void;
  children?: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
}

export default function Popover({
  isOpen,
  setIsOpen,
  initialNote,
  onSubmit,
  children,
  triggerRef,
}: PopoverProps) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState<string>(initialNote || "");
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const isRightAligned = rect.right + 320 > window.innerWidth;
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: isRightAligned ? rect.left + window.scrollX - 320 + rect.width : rect.left + window.scrollX,
      });
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = () => {
    onSubmit(note);
    closeMenu();
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  return (
    <MotionConfig transition={TRANSITION}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={formContainerRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed h-auto max-h-[80vh] w-[320px] overflow-hidden border border-gray-200 bg-white shadow-lg outline-none"
            style={{
              borderRadius: 8,
              top: position.top,
              left: position.left,
              zIndex: 50,
            }}
          >
            {children ? (
              <div className="p-4 overflow-y-auto">
                <h4 className="text-base font-medium mb-3">All Contacts</h4>
                {children}
              </div>
            ) : (
              <form
                className="flex h-full flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <textarea
                  className="h-[150px] w-full resize-none bg-transparent px-4 py-3 text-sm outline-none"
                  placeholder={initialNote ? "Edit Note" : "Add Note"}
                  autoFocus
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex justify-between border-t border-gray-200 px-4 py-3">
                  <button
                    type="button"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                    onClick={closeMenu}
                    aria-label="Close popover"
                  >
                    <ArrowLeftIcon size={16} />
                  </button>
                  <button
                    className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                    type="submit"
                  >
                    Submit Note
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

